import { RiHeartLine, RiShoppingBagLine } from "@remixicon/react";
import React from "react";
import { NavLink } from "react-router";

function ProductCard({ _id, name, price, description, imageUrls }) {
    return (
        <div className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="p-0">
                <div className="w-full md:min-h-72 md:h-72 bg-zinc-300 rounded-t-xl overflow-hidden">
                    <div className="absolute right-0 h-12 w-12 rounded-bl-xl flex items-center rounded-tr-xl justify-center bg-opacity-5 bg-zinc-200">
                        <RiHeartLine className="text-zinc-50 opacity-55" />
                    </div>
                    <NavLink to={`/products/${_id}`}>
                        <img
                            src={imageUrls?.at(0).publicUrl}
                            alt="product image"
                            className=" w-full object-contain"
                        />
                    </NavLink>
                </div>

                <div className="p-6 flex flex-col justify-evenly gap-1">
                    <NavLink to={`/products/${_id}`}>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-rose-500 transition-colors cursor-pointer">
                            {name}
                        </h3>
                    </NavLink>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {description}
                    </p>

                    <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-rose-500">
                            ₹{price}
                        </span>
                        <button className="bg-rose-500 flex items-center p-2 rounded-lg hover:bg-rose-600 text-white">
                            <RiShoppingBagLine className="w-4 h-4 mr-2" />
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
