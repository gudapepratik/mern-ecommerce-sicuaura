import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import store from "./store/store.js";
import { Provider, useDispatch } from "react-redux";
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    createRoutesFromElements,
} from "react-router-dom";
import "./index.css";
// import AuthService  from "./api/services/auth.services.js";

import { login, logout } from "./store/authSlice.js";
import Layout from "./pages/Layout.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import authServices from "./api/services/auth.services.js";
import ErrorHandler from "./utils/ErrorHandler.utils.js";
import ProductDetailsPage from "./pages/ProductDetailsPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

// Router configuration
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="products/:id" element={<ProductDetailsPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="*" element={<ErrorPage />} />
        </Route>
    )
);

// method to check if the user is authenticated
// and update the Redux store accordingly
const CheckAuth = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const checkToken = async () => {
            try {
                const user = await authServices.getCurrentUser(); // Calls backend to check session
                console.log("Current User:", user);
                if (user) {
                    dispatch(login(user));
                } else {
                    dispatch(logout());
                }
            } catch (error) {
                ErrorHandler(error);
            }
        };

        checkToken();
    }, [dispatch]);

    return children;
};

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <CheckAuth>
                <RouterProvider router={router} />
            </CheckAuth>
        </Provider>
    </StrictMode>
);
