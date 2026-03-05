import mongoose from "mongoose";

export async function connectDB() {
    if (mongoose.connections[0].readyState) return;

    await mongoose.connect("mongodb://127.0.0.1:27017/courierDB");
}