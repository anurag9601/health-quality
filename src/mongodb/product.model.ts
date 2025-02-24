import { Schema, model, models } from "mongoose";

const ingredientsInfoSchema = new Schema({
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

const userAddProductSchema = new Schema({
    userEmail: {
        type: String,
        required: true
    },
    productInfo: {
        Ingredients_Information: {
            type: [ingredientsInfoSchema],
            default: []
        }
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
});

const userProduct = models.UserEnterProducts || model("UserEnterProducts", userAddProductSchema);

export default userProduct;