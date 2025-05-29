import { User } from "../models/users.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

// register new user
const registerUser = async (req, res) => {
    try {
        // 1. get the details
        const { name, email, password } = req.body;

        // 2. check if all details present or not
        if ([name, email, password].some((field) => field === "")) {
            throw new ApiError(400, "Required fields are missing");
        }

        // 3. check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser)
            throw new ApiError(409, "User with same email already exists");

        // 4. create new user
        const user = await User.create({
            name,
            email,
            password,
        });

        if (!user)
            throw new ApiError(500, "An Error occured while creating user");

        return res
            .status(201)
            .json(
                new ApiResponse(
                    201,
                    user,
                    "User registered successfully"
                )
            );
    } catch (error) {
        console.log(error)
        // if the error is an instance of ApiError then send the error message and status code
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
            });
        }

        // if an unexpected error occurs
        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later.",
        });
    }
};

// method to generate refresh and access tokens
const generateAccessAndRefreshToken = async (userId) => {
    try {
        // get the user instance
        const user = await User.findById(userId);

        // generate tokens
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        // store the refresh token in database
        user.refreshToken = refreshToken;
        // save the state
        // as we are upadating the document, it will again require the attributes that are assigned are "required"
        // so to bypass this we specify validateBeforeSave as false
        await user.save({ validateBeforeSave: false });

        // return the tokens
        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while generating refresh and access token"
        );
    }
};

// login user
const loginUser = async (req, res) => {
    try {
        // 1. get the data
        const { email, password } = req.body;

        // 2. validate the fields
        if ([email, password].some((field) => field === "")) {
            throw new ApiError(400, "Email or password field missing");
        }

        // 3. check user exists or not
        const existingUser = await User.findOne({ email });

        if (!existingUser)
            throw new ApiError(400, "User with given email id does not exists");

        // 4. check if the user is already logged in
        const isAlreadyLoggedin = existingUser.refreshToken ? true : false;

        if (isAlreadyLoggedin)
            throw new ApiError(409, "User is already logged in");

        // 5. check if the password is correct
        const isPasswordCorrect =
            await existingUser.isPasswordCorrect(password);

        if (!isPasswordCorrect)
            throw new ApiError(400, "Incorrect password entered ! login again");

        // 6. generate access token and refresh token
        const { accessToken, refreshToken } =
            await generateAccessAndRefreshToken(existingUser._id);

        const user = await User.findById(existingUser._id).select(
            "-password -refreshToken"
        );

        const options = {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        };

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    {
                        user: user,
                        accessToken,
                        refreshToken,
                    },
                    "User Logged In Successfully"
                )
            );
    } catch (error) {
        console.log(error);
        // if the error is an instance of ApiError then send the error message and status code
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
            });
        }

        // if an unexpected error occurs
        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later.",
        });
    }
};

// logout user
const logoutUser = async (req, res) => {
    try {
        // 1. as the middleware "verifyJWT" is already excecuted we now have access to req.user
        await User.findByIdAndUpdate(req.user._id, {
            $set: {
                refreshToken: null,
            },
        });

        // 2. clear the cookies
        const options = {
            httpOnly: true,
            secure: true,
        };

        // 3. send the response
        return res
            .status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json(new ApiResponse(200, {}, "User logged out"));
    } catch (error) {
        // if an unexpected error occurs
        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later.",
        });
    }
};

// get current logged in user
const getCurrentUser = async (req, res) => {
    // as this is the protected route, verifyJWT will make the current user available in req.user, just send those details
    return res
        .status(200)
        .json(
            new ApiResponse(200, req.user, "User details fetched sucessfully")
        );
};

// refresh access token
const refreshAccessToken = async (req, res) => {
    try {
        // 1. get the refresh token
        const refreshToken =
            req.cookies?.refreshToken || req.headers["x-refresh-token"];

        if (!refreshToken)
            throw new ApiError(401, "Missing or Invalid refresh Token");

        // 2. verify and decode the refresh token
        const decodedRefreshToken = await jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        if (!decodedRefreshToken)
            throw new ApiError(401, "Invalid refresh Token ! login again");

        // 3. get the user from database
        const user = await User.findById(decodedRefreshToken._id);

        if (!user) throw new ApiError(401, "user not found");

        // 4. validate the refresh token in cookie with that in database
        if (refreshToken !== user.refreshToken)
            throw new ApiError(401, "Unauthorized access denied");

        // 5. generate a new access token for the user
        const accessToken = await user.generateAccessToken();

        const options = {
            httpOnly: true,
            secure: true,
        };

        // send the tokens in response and store the updated access token in cookie
        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", user.refreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    {
                        accessToken,
                        refreshToken,
                    },
                    "Access Token is refreshed"
                )
            );
    } catch (error) {
        // if the error is an instance of ApiError then send the error message and status code
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
            });
        }

        // if an unexpected error occurs
        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later.",
        });
    }
};

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    getCurrentUser,
};
