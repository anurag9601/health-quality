import { Schema, model, models } from "mongoose";

const userAllProductsSchema = new Schema({
    user: {
        type: String,
    },
    products: {
        type: Schema.Types.ObjectId,
        ref: "UserEnterProducts",
        default: []
    }
});

const userAllProducts = models.userAllProducts || model("userAllProducts", userAllProductsSchema);

export default userAllProducts;