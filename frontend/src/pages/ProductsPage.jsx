import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import productsServices from "../api/services/products.services";
import {
    RiArrowDropLeftLine,
    RiArrowDropRightLine,
    RiLayoutGrid2Line,
    RiListCheck,
    RiSearchLine,
} from "@remixicon/react";

export default function ProductsPage() {
    const [viewMode, setViewMode] = useState("grid");
    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const limit = 6;

    // method to fetch products from the API
    const fetchProducts = async () => {
        try {
            // 1. Fetch products from the API
            const productsResponse = await productsServices.getAllProducts({
                page,
                limit,
            });

            // 2. store products in state
            if (productsResponse && productsResponse.data) {
                setProducts(productsResponse.data.data);
            } else {
                alert("No products found");
            }
        } catch (error) {
            alert("Error fetching products: " + error.message);
            console.error("Error fetching products:", error);
        }
    };

    // method to handle page change
    const handleonpagechange = (action) => {
        if (action === "next") {
            setPage((prev) => prev + 1);
        } else if (page !== 1) {
            setPage((prev) => prev - 1);
        }
        // use window.scrollTo() method to scroll to top smoothly whenever user clicks on next or prev buttons
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    // method to filter products based on search term
    const filterProducts = () => {
        const filtered = products?.products?.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setProducts((prev) => ({
            ...prev,
            products: filtered,
        }));
    };

    useEffect(() => {
        fetchProducts();
    }, [page]);

    useEffect(() => {
        // Reset page to 1 when search term changes
        setPage(1);

        // If search term is empty, fetch all products
        if (searchTerm === "") {
            fetchProducts();
        } else {
            // Filter products based on search term
            filterProducts();
        }
    }, [searchTerm]);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-rose-500 mb-4">
                        All Products
                    </h1>
                    <p className="text-gray-600">
                        Discover our complete collection of amazing products
                    </p>
                </div>

                {/* Filters and Search */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                        {/* Search */}
                        <div className="relative flex-1 max-w-md">
                            <RiSearchLine className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></RiSearchLine>
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none"
                            />
                        </div>

                        {/* View Mode Toggle */}
                        <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`px-3 py-2 ${
                                    viewMode === "grid"
                                        ? "bg-rose-500 text-white"
                                        : "bg-white text-gray-600 hover:bg-gray-50"
                                } transition-colors`}
                            >
                                <RiLayoutGrid2Line className="ri-grid-line text-lg"></RiLayoutGrid2Line>
                            </button>
                            <button
                                onClick={() => setViewMode("list")}
                                className={`px-3 py-2 ${
                                    viewMode === "list"
                                        ? "bg-rose-500 text-white"
                                        : "bg-white text-gray-600 hover:bg-gray-50"
                                } transition-colors`}
                            >
                                <RiListCheck className="ri-list-check text-lg"></RiListCheck>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-6">
                    <p className="text-gray-600">
                        Showing {products?.products?.length} of{" "}
                        {products?.totalItems} products
                    </p>
                </div>

                {/* Products Grid */}
                <div
                    className={`grid gap-8 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 lg:px-48"}`}
                >
                    {products?.products &&
                        products.products.map((product) => (
                            <ProductCard key={product.id} {...product} />
                        ))}
                </div>

                {/* No Results */}
                {products.products?.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">
                            No products found matching your criteria.
                        </p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            <div className="flex w-full items-center justify-around px-36 my-12 font-DMSans font-normal text-xl">
                {/* previous button  */}
                <button
                    className="px-2 pr-4 rounded-full font-lg hover:text-white py-1 flex items-center border-[1px] border-rose-500 text-rose-500 hover:bg-rose-500"
                    onClick={() => handleonpagechange("prev")}
                >
                    <RiArrowDropLeftLine className="m-0" /> Prev
                </button>

                {/* page number */}
                <p className="text-sm md:text-base">Page {page}</p>

                {/* next button  */}
                <button
                    className="px-2 pl-4 rounded-full font-lg hover:text-white py-1 flex items-center border-[1px] border-rose-500 text-rose-500 hover:bg-rose-500"
                    onClick={() => handleonpagechange("next")}
                >
                    Next <RiArrowDropRightLine className="m-0" />
                </button>
            </div>
        </div>
    );
}
