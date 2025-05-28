import { Router } from "express"
import {getProductById, getProducts } from "../controllers/products.controller.js"

// 1. create a new router instance
const productRouter = Router()

// 2. define the routes

// get product route (not protected, anyone can access this route)
productRouter.route('/').get(getProducts)

productRouter.route('/:id').get(getProductById)

export default productRouter