import mongoose from "mongoose";

const courierSchema = new mongoose.Schema({

  date: Date,
  challanNo: Number,

  senderName: String,
  receiverName: String,
  address: String,

  weight: {
    type: String,
    default: "0.100 GM"
  },

  amount: String,

  status: String,

  transportMode: {
    type: String,
    default: "Surface"
  }

});

export default mongoose.models.Courier ||
  mongoose.model("Courier", courierSchema);