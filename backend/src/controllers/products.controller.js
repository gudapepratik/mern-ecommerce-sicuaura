import { Product } from "../models/products.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";

const getProducts = async (req, res) => {
    try {
        // 1. get the page number and the limit
        const page = req.query.page;
        const limit = req.query.limit;
    
        // 2. design the aggregation pipeline to get the products
        const aggregate = [
            {
                // sort from most recent to old
                $sort: {
                    createdAt: -1,
                },
            },
        ];
    
        // 3. custom options for pagination
        const options = {
            page: page || 1, // default if page is not provided
            limit: limit || 10, // default if limit is not provided
            customLabels: {
                totalDocs: "totalItems",
                docs: "products",
                limit: "pageSize",
                totalPages: "pageCount",
                page: "currentPage",
                pagingCounter: "itemStart",
                hasPrevPage: "prevExists",
                hasNextPage: "nextExists",
                prevPage: "previousPage",
                nextPage: "nextPage",
            },
        };
    
        // 4. get the products using aggregatePaginate
        const products = await Product.aggregatePaginate(aggregate, options);
    
        if (!products) throw new ApiError(500, "Error while fetching products");
    
        // 5. return the products
        return res
            .status(200)
            .json(new ApiResponse(200, products, "Products fethced successfully"));
    } catch (error) {
        // Handle ApiError specifically
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
            });
        }
        // Handle unexpected errors
        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later.",
        });
    }
}

const getProductById = async (req, res) => {
    try {
        // 1. get the product id from the request params
        const productId = req.params?.id;
    
        // 2. validate
        if (!mongoose.Types.ObjectId.isValid(productId)) 
            throw new ApiError(400, "Product id is not valid");
    
        if (!productId) throw new ApiError(400, "Product id is required");
    
        // 3. get the product details from database
        const product = await Product.findById(productId);
    
        if (!product)
            throw new ApiError(500, "Error while fetching Product details");
    
        return res
            .status(200)
            .json(new ApiResponse(200, product, "Product is fetched successfully"));
    } catch (error) {
        // Handle ApiError specifically
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
            });
        }
        // Handle unexpected errors
        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later.",
        });
    }
}

export {
    getProducts,
    getProductById,
};
