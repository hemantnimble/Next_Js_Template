import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a title"],
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    // discountPercentage: {
    //     type: Number,
    //     required: true,
    // },
    // rating: {
    //     type: Number,
    // },
    // stock: {
    //     type: Number,
    //     required: true,
    // },
    category: {
        type: String,
        required: true,
    },
    // brand: {
    //     type: String,
    //     required: true,
    // },
    thumbnail: {
        type: String,
        required: true,
    },
    images: [String],

})

const Product = mongoose.models.products || mongoose.model("products", productSchema);

export default Product;