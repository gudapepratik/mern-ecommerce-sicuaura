import mongoose from 'mongoose'
const DB_NAME = process.env.DB_NAME || 'default_db_name'

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\nMongoDB connected !! DB HOST: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("connectDB FAILED", error);
        process.exit(1)
    }
}

export default connectDB