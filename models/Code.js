import mongoose from "mongoose";

const CodeSchema = new mongoose.Schema({
  category: String,
  type: String,
  value: {
    type: String,
    required: true
  },
  korCodeNm: {
    type: String,
    required: true
  },
  engCodeNm: {
    type: String,
    required: true
  },
  codeDesc: String,
  createAt: {
    type: Date,
    default: Date.now
  },
  updateAt: {
    type: Date,
    default: Date.now
  }
});

const model = mongoose.model("Code", CodeSchema);
export default model;
