import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/users.model.js"

export const verifyJWT = async (req, res, next) => {
    try {
        // 1. get the accesstoken from cookie
        const token = req.cookies?.accessToken;
        console.log(token)

        if (!token) throw new ApiError(401, "Unauthorized request");

        // 2. verify the access token
        const decodedToken = await jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        );

        // 3. now find the user from database cause we now have the id
        const user = await User.findById(decodedToken?._id).select(
            "-password -refreshToken"
        );

        if (!user) throw new ApiError(401, "Invalid Token");

        // 4. new add the user object in request
        req.user = user;

        // 5. pass control to next middleware
        next();
    } catch (error) {
        console.log(error)
        if (error.name === "TokenExpiredError") {
            return res
                .status(401)
                .json({ message: "Access token has expired. Please refresh your token" });
        }
        return res
            .status(400)
            .json({ message: "Not authorized, invalid token" });
    }
};
