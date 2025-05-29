import { useEffect, useState } from "react";
import productsServices from "../api/services/products.services";
import Loader from "../components/Loader";
import { NavLink, useParams } from "react-router";
import {
    RiAddLine,
    RiArrowGoBackLine,
    RiShoppingBagLine,
    RiSkipBackLine,
    RiStarFill,
    RiStarHalfFill,
    RiSubtractLine,
} from "@remixicon/react";

function ProductDetailsPage() {
    const { id } = useParams(); // get the product id from the url
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(null);

    const fetchProductDetails = async () => {
        try {
            // 1. Fetch product details from the API
            const response = await productsServices.getProductById(id);

            // 2. set the state
            setProduct(response.data.data);
        } catch (error) {
            // alert("Error fetching product details: " + error.message);
            console.error("Error fetching product details:", error);
        }
    };

    const handleQuantityChange = (change) => {
        setQuantity((prev) => Math.max(1, prev + change));
    };

    useEffect(() => {
        fetchProductDetails();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            {!product && <Loader />}

            {product && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Breadcrumb */}
                    <div className="mb-6">
                        <NavLink
                            to="/products"
                            className="flex items-center text-blue-600 hover:text-blue-700"
                        >
                            <RiArrowGoBackLine
                                size={18}
                                className="mr-2"
                            ></RiArrowGoBackLine>
                            Back to Products
                        </NavLink>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Product Images */}
                        <div className="space-y-4">
                            <div className="aspect-square rounded-lg overflow-hidden bg-white shadow-lg">
                                <img
                                    src={
                                        product.imageUrls[selectedImage]
                                            .publicUrl || "/placeholder.svg"
                                    }
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                                {product.imageUrls.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                                            selectedImage === index
                                                ? "border-rose-500"
                                                : "border-gray-200"
                                        }`}
                                    >
                                        <img
                                            src={
                                                image.publicUrl ||
                                                "/placeholder.svg"
                                            }
                                            alt={`${product.name} ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                    {product.name}
                                </h1>

                                {/* Rating */}
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="flex items-center">
                                        {[...Array(4)].map((_, i) => (
                                            <RiStarFill
                                                key={i}
                                                className={` text-yellow-400 text-lg`}
                                            ></RiStarFill>
                                        ))}
                                        <RiStarHalfFill
                                            className={` text-yellow-400 text-lg`}
                                        ></RiStarHalfFill>
                                    </div>
                                </div>

                                {/* Price */}
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="text-3xl font-bold text-rose-500">
                                        ₹{product.price}
                                    </span>
                                </div>
                            </div>

                            {/* Product Description */}
                            <div className="mt-12">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                    Description
                                </h2>
                                <p className="text-gray-700 leading-relaxed">
                                    {product.description}
                                </p>
                            </div>

                            {/* Quantity and Add to Cart */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <span className="text-sm font-medium text-gray-700">
                                        Quantity:
                                    </span>
                                    <div className="flex items-center border border-gray-300 rounded-lg">
                                        <button
                                            onClick={() =>
                                                handleQuantityChange(-1)
                                            }
                                            disabled={quantity <= 1}
                                            className="px-2 py-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <RiSubtractLine
                                                size={18}
                                                className="ri-subtract-line text-zinc-700 text-lg"
                                            ></RiSubtractLine>
                                        </button>
                                        <span className="px-2 py-2 text-center">
                                            {quantity}
                                        </span>
                                        <button
                                            onClick={() =>
                                                handleQuantityChange(1)
                                            }
                                            className="px-2 py-2 hover:bg-gray-50"
                                        >
                                            <RiAddLine
                                                size={18}
                                                className="ri-add-line text-lg"
                                            ></RiAddLine>
                                        </button>
                                    </div>
                                </div>

                                <div className="flex gap-2 flex-col md:flex-row lg:flex-row">
                                    <button className="font-DMSans text-white font-bold text-md px-12 py-3 bg-rose-600 rounded-full">
                                        Buy Now
                                    </button>
                                    <button className="font-DMSans font-bold text-md px-12 text-rose-600 py-3 border-[1px] hover:shadow-md border-rose-600 rounded-full">
                                        Add to Cart
                                    </button>
                                </div>

                                <p className="text-green-600 text-sm font-medium">
                                    ✓ In Stock - Ready to ship
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductDetailsPage;
