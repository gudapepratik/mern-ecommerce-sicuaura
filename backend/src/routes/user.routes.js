import { registerUser, loginUser, refreshAccessToken, logoutUser, getCurrentUser } from '../controllers/user.controller.js'
import { Router } from 'express'
import { verifyJWT } from '../middlewares/auth.middleware.js'

// all user related routes are here

// 1. create a new router instance
const userRouter = Router()

// 2. define the routes

userRouter.route("/register").post(registerUser)

userRouter.route("/login").post(loginUser)

userRouter.route('/refresh-token').post(refreshAccessToken)

// protected routes
userRouter.route('/logout').post(verifyJWT,logoutUser)

userRouter.route('/current').get(verifyJWT, getCurrentUser)

export default userRouter
