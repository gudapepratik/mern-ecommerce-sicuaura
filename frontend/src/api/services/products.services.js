import axios from "axios";
import {API_ENDPOINTS} from '../apiConstants'
import httpClient from "../httpClient.js";
import ErrorHandler from "../../utils/ErrorHandler.utils.js";

class ProductService{

    // method to get all products
    async getAllProducts({page, limit}) {
        try {
            // 1. check the data
            if(page === 0 || limit <= 0) throw new Error('All fields are required !!')
                
            // 2. call the api
            const productResponse = await httpClient.get(`${API_ENDPOINTS.PRODUCTS}/`,{
                params: {
                    page: page,
                    limit: limit
                }
            })

            // 3. return the response
            return productResponse
        } catch (error) {
            ErrorHandler(error)
        }
    }
    
    // method to get product details by product ID
    async getProductById(productId) {
        try {
            // 1. check the data
            if(!productId) throw new Error('product ID is required !!')
                
            // 2. call the api
            const productResponse = await httpClient.get(`${API_ENDPOINTS.PRODUCTS}/${productId}`)

            // 3. return the response
            return productResponse
        } catch (error) {
            ErrorHandler(error)
        }
    }
};

export default new ProductService();