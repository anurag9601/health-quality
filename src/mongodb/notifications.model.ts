import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true,
    },
    notificationType: {
        type: String,
        enum: ["analysis", "expiry", "delete"],
        required: true,
    },
    notificationMessage: {
        type: String,
        required: true
    },
    read: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const notificationModel = mongoose.models.Notifications || mongoose.model("Notifications", NotificationSchema);

export default notificationModel;