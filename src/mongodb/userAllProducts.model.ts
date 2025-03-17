import mongoose from "mongoose";

const UserAllOperationsSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true,
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products"
    }],
    appNotifications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Notifications"
    }]
});

const userAllProducts = mongoose.models.UserAllOperations || mongoose.model("UserAllOperations", UserAllOperationsSchema);

export default userAllProducts;