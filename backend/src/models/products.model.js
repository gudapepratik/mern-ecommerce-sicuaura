import mongoose from 'mongoose'
import aggregatePaginate from 'mongoose-aggregate-paginate-v2'

const imageSchema = {
    publicUrl: {
        type: String,
        required: true
    }
}

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    imageUrls: [imageSchema],
}, {timestamps: true})

// aggregate paginate plugin
productSchema.plugin(aggregatePaginate)

export const Product = mongoose.model('Product', productSchema)