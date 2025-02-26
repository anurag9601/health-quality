import mongoose from "mongoose";

const userAllProductsSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true,
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "userProduct"
    }]
});

const userAllProducts = mongoose.models.userAllProducts || mongoose.model("userAllProducts", userAllProductsSchema);

export default userAllProducts;