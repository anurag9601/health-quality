import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    notificationType: {
        type: String,
        enum: ["analysis", "expiry"],
        required: true,
    },
    notificationMessage: {
        type: String,
        required: true
    }
}, { timestamps: true });

const notificationModel = mongoose.models.notifications || mongoose.model("notifications", notificationSchema);

export default notificationModel;