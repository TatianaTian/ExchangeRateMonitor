const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  event: {
    type: String,
    required: true
  }
});

module.exports = access = mongoose.model("early_access", UserSchema);


