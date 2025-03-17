import mongoose from "mongoose";

const IngredientsInfoSchema = new mongoose.Schema({
    description: {
        type: String,
    },
    name: {
        type: String
    },
    healthy: {
        type: String
    },
    not_good_for: {
        type: String
    }
}, { _id: false });

const UserAddProductSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    productImgURL: {
        type: String,
        required: true,
        default: ""
    },
    Ingredients_Information: {
        type: [IngredientsInfoSchema],
        required: true,
    },
    Overall_Health_Assessment: {
        healthy: {
            type: Boolean,
        },
        overall_health_assessment: {
            type: String
        }
    },
    Product_Details: {
        expiry_date: {
            type: [String, null]
        },
        manufacture_date: {
            type: [String, null]
        },
        product_name: {
            type: String
        }
    }
}, { timestamps: true });

const userProduct = mongoose.models.Products || mongoose.model("Products", UserAddProductSchema);

export default userProduct;