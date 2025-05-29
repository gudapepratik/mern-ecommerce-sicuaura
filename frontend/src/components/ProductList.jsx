import { useEffect, useState } from "react";
import productsServices from "../api/services/products.services";
import ProductCard from "./ProductCard";

export default function ProductList() {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            // 1. Fetch products from the API
            const productsResponse = await productsServices.getAllProducts({
                page: 1,
                limit: 6,
            });
            console.log(
                "Products fetched successfully:",
                productsResponse.data
            );

            // 2. store products in state
            if (productsResponse && productsResponse.data) {
                setProducts(productsResponse.data.data.products);
            } else {
                alert("No products found");
            }
        } catch (error) {
            alert("Error fetching products: " + error.message);
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Featured Products
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Discover our carefully curated selection of premium products
                    designed to enhance your lifestyle
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products &&
                    products.map((product) => (
                        <ProductCard key={product._id} {...product} />
                    ))}
            </div>
        </div>
    );
}
