const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
    {
 msg: {
    type: String,
    required: [true, 'Please provide message'],
  },
  
  name: {
    type: String,
    required: [true, "must provide username"],
    trim: true,
  },

  email: {
    type: String,
    required: [true, "must provide email"],

    trim: true,
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "provide valid email",
    ],
  },
},
  { timestamps: true }

)


module.exports = mongoose.model("Message", MessageSchema);