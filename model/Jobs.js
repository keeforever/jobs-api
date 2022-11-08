const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const JobsSchema = new Schema({
  position: {
    type: String,
    required: [true, "Position must be provided !"],
  },
  company: {
    type: String,
    required: [true, "Position must be provided !"],
  },
  location: {
    type: String,
    required: [true, "Position must be provided !"],
  },
  status: {
    type: String,
    default: 'pending',
    enum: ["interview", "pending", "declined"],
  },
  type: {
    type: String,
    enum: ["full-time", "part-time", "remote", "internship"],
  },
  createdBy : {
    type : mongoose.Types.ObjectId,
    ref : 'User',
    required :[true, 'User must be needed.']
  }
});

const JobsModel = model('Jobs',JobsSchema)

module.exports = JobsModel