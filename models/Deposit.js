
const mongoose = require("mongoose");

const DepositSchema = new mongoose.Schema(
    {
 txid: {
    type: String,
    required: [true, 'Please provide transaction id'],
  },
  amount: { type: Number, required: true },
  depositedBy: {
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


module.exports = mongoose.model("Deposit", DepositSchema);