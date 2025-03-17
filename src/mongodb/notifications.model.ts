import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
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

const notificationModel = mongoose.models.Notifications || mongoose.model("Notifications", NotificationSchema);

export default notificationModel;