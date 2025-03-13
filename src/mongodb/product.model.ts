import mongoose from "mongoose";

const ingredientsInfoSchema = new mongoose.Schema({
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

const userAddProductSchema = new mongoose.Schema({
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
        type: [ingredientsInfoSchema],
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

const userProduct = mongoose.models.userProduct || mongoose.model("userProduct", userAddProductSchema);

export default userProduct;