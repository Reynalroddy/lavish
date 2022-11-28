
const mongoose = require("mongoose");

const WithdrawSchema = new mongoose.Schema(
    {
  amount: { type: Number, required: true },
  withdrawedBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user'],
  },
  status:{
    type: String,
    default:'pending'
  }
},
  { timestamps: true }

  
)


module.exports = mongoose.model("Withdraw", WithdrawSchema);