import axios from "axios";
import { API_ENDPOINTS } from "../apiConstants";
import httpClient from "../httpClient.js";
import ErrorHandler from "../../utils/ErrorHandler.utils.js";

export class AuthService {
    // all the service functions here

    // method to register a new user
    async registerUser({ name, email, password }) {
        try {
            // 1. check the data
            if ([name, email, password].some((fields) => fields === "")) {
                throw new Error("All fields are required !!");
            }

            // 2. call the api
            const registerResponse = await httpClient.post(
                `${API_ENDPOINTS.AUTH}/register`,
                {
                    name,
                    email,
                    password,
                }
            );
            console.log(registerResponse);

            if (!registerResponse)
                throw new Error("Error while creating new user account !!?");

            // 3. return the response
            return registerResponse;
        } catch (error) {
            ErrorHandler(error);
        }
    }

    // method to login the user
    async loginUser({ email, password }) {
        try {
            // 1. login the current user
            const reponse = await httpClient.post(
                `${API_ENDPOINTS.AUTH}/login`,
                { email, password }
            );
            console.log(reponse);

            // 2. return the response // the tokens will be stored in cookies
            return reponse;
        } catch (error) {
            ErrorHandler(error);
            // return error
        }
    }

    // method to logout the user
    async logoutUser() {
        try {
            // 1. logout the user
            const logoutResponse = await httpClient.post(
                `${API_ENDPOINTS.AUTH}/logout`
            );
            // 2. return the response
            return logoutResponse;
        } catch (error) {
            ErrorHandler(error);
        }
    }

    // method to get the current user details
    async getCurrentUser() {
        try {
            // 1. call the api endpoint
            const userResponse = await httpClient.get(
                `${API_ENDPOINTS.AUTH}/current`
            );

            // 2. return the response
            return userResponse.data.data;
        } catch (error) {
            ErrorHandler(error);
        }
    }
}

export default new AuthService();
