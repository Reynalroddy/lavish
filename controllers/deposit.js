const Deposit = require("../models/Deposit");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");


const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require("../errors");

const create = async (req, res) => {
    const { userId: depositedBy } = req.user;
    
    const {
      txid,
      amount
    } = req.body;
   
    const send = {
      txid,
      amount,
      depositedBy

    };
 
  
    const dep = await Deposit.create({ ...send });
    //   const token = user.createJWT();
    res.status(StatusCodes.CREATED).json(dep);
  };


const getDeps = async (req, res) => {
  const { userId } = req.user;
//   console.log(req.user);
  const deps = await Deposit.find({ depositedBy: userId });

  res.status(StatusCodes.OK).json({ success: true, data: deps });
};

module.exports = { getDeps, create};