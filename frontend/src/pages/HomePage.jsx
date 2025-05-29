import React from "react";
import { NavLink } from "react-router";
import ProductList from "../components/ProductList";

function HomePage() {
    return (
        <>
            <div className="flex flex-col w-full">
                {/* Hero section  */}
                <div className="bg-gradient-to-r from-rose-600 to-red-800 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-6xl font-bold mb-6">
                                Discover Amazing Products
                            </h1>
                            <p className="text-xl md:text-2xl mb-8 text-blue-100">
                                Shop the latest trends with unbeatable prices and
                                quality
                            </p>
                            <div className="w-full flex flex-col sm:flex-row gap-4 justify-center">
                                <NavLink to="/products">
                                    <button
                                        size="lg"
                                        className="bg-white w-full text-rose-500 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
                                    >
                                        Shop Now
                                    </button>
                                </NavLink>
                                <button
                                    size="lg"
                                    className="border-2  border-white text-white bg-transparent hover:bg-white hover:text-rose-500 px-8 py-3 text-lg font-semibold transition-all"
                                >
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products List Section */}
                <ProductList/>
            </div>
        </>
    );
}

export default HomePage;
