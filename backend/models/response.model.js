const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const responses = new Schema(
  {
      id: Schema.ObjectId,
      questions: { type: Array, default: [] },
      responses: { type: Array, default: [] },
  },
  {
    timestamps: false
  }
);

const Response = mongoose.model("Response", responses);

module.exports = Response;
