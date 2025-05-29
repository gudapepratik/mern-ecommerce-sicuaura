import { NavLink } from "react-router";

function Footer() {
    return (
        <footer className="bg-zinc-800 text-white">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <span className="text-xl font-bold text-rose-500">
                                EcomClub
                            </span>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Your trusted online marketplace for quality products
                            at unbeatable prices. Shop with confidence and enjoy
                            fast, reliable delivery.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <NavLink
                                    href="/products"
                                    className="text-gray-300 hover:text-white transition-colors text-sm"
                                >
                                    All Products
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    href="/categories"
                                    className="text-gray-300 hover:text-white transition-colors text-sm"
                                >
                                    Categories
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    href="/deals"
                                    className="text-gray-300 hover:text-white transition-colors text-sm"
                                >
                                    Special Deals
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    href="/new-arrivals"
                                    className="text-gray-300 hover:text-white transition-colors text-sm"
                                >
                                    New Arrivals
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    href="/bestsellers"
                                    className="text-gray-300 hover:text-white transition-colors text-sm"
                                >
                                    Best Sellers
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    href="/brands"
                                    className="text-gray-300 hover:text-white transition-colors text-sm"
                                >
                                    Brands
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Customer Service
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <NavLink
                                    href="/contact"
                                    className="text-gray-300 hover:text-white transition-colors text-sm"
                                >
                                    Contact Us
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    href="/help"
                                    className="text-gray-300 hover:text-white transition-colors text-sm"
                                >
                                    Help Center
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    href="/shipping"
                                    className="text-gray-300 hover:text-white transition-colors text-sm"
                                >
                                    Shipping Info
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    href="/returns"
                                    className="text-gray-300 hover:text-white transition-colors text-sm"
                                >
                                    Returns & Exchanges
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    href="/track-order"
                                    className="text-gray-300 hover:text-white transition-colors text-sm"
                                >
                                    Track Your Order
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    href="/size-guide"
                                    className="text-gray-300 hover:text-white transition-colors text-sm"
                                >
                                    Size Guide
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
                        <div className="text-sm text-gray-400">
                            © 2024 EcoMart. All rights reserved.
                        </div>
                        <div className="flex items-center space-x-6">
                            <NavLink
                                href="/privacy"
                                className="text-sm text-gray-400 hover:text-white transition-colors"
                            >
                                Privacy Policy
                            </NavLink>
                            <NavLink
                                href="/terms"
                                className="text-sm text-gray-400 hover:text-white transition-colors"
                            >
                                Terms of Service
                            </NavLink>
                            <NavLink
                                href="/cookies"
                                className="text-sm text-gray-400 hover:text-white transition-colors"
                            >
                                Cookie Policy
                            </NavLink>
                            <NavLink
                                href="/sitemap"
                                className="text-sm text-gray-400 hover:text-white transition-colors"
                            >
                                Sitemap
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
