const { model, Schema } = require("mongoose");

const secretSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  posted_on: {
    type: Date,
    default: Date.now
  }
});

module.exports = model('Secret', secretSchema)
