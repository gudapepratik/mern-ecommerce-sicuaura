import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

// just temporary
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || origin === 'http://localhost:5173' || origin === "https://mern-ecommerce-sicuaura.onrender.com") {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(cookieParser())

app.use(express.json({
    limit: "16kb"
}))

app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))

app.use(express.static("public"))


// user router
import userRouter from './routes/user.routes.js'
app.use('/api/users',userRouter)

// product router
import productRouter from './routes/product.routes.js'
app.use('/api/products',productRouter)

// app.use((err, req, res, next) => {
//     if (err instanceof ApiError) {
//         const { statusCode, message, errors} = err;

//         res.status(statusCode).json({
//             success: false,
//             message,
//             errors,
//             stack: undefined,
//         });
//     } else {
//         const { statusCode, message, errors} = err;
//         console.log(err, "asfasagaga")
//         res.status(500).json({
//             success: false,
//             errors,
//             message
//         });
//     }
// });

export {app}