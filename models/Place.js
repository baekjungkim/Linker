import mongoose from "mongoose";

const PlaceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: "Uploader is required"
  },
  title: {
    type: String,
    required: "Title is required"
  },
  description: String,
  fileUrl: [
    {
      type: String,
      required: "File URL is required"
    }
  ],
  type: {
    type: String,
    required: "Type is required"
  },
  category: {
    type: String,
    required: "Category is required"
  },
  roadAddr: {
    type: String,
    required: "Road Address is required"
  },
  jibunAddr: {
    type: String,
    required: "Address is required"
  },
  detailAddr: {
    type: String,
    required: "Detail Address is required"
  },
  zipNo: {
    type: Number,
    required: "Zip Code is required"
  },
  lat: {
    type: Number,
    required: "Latitude is required"
  },
  lng: {
    type: Number,
    required: "Longitude is required"
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ],
  views: {
    type: Number,
    default: 0
  },
  createAt: {
    type: Date,
    default: Date.now
  },
  updateAt: {
    type: Date,
    default: Date.now
  }
});

const model = mongoose.model("Place", PlaceSchema);
export default model;
