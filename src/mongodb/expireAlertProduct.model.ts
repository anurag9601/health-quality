import mongoose from "mongoose";

const ExpiryAlertProductSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true,
    },
    expiryDate: {
        type: String,
        required: true,
    },
    manufactureDate: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const expiryAlertModel = mongoose.models.ExpiryAlertProducts || mongoose.model("ExpiryAlertProducts", ExpiryAlertProductSchema);

export default expiryAlertModel;