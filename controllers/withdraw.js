const Withdraw = require("../models/Withdraw");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");


const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require("../errors");

const create = async (req, res) => {
    const { userId: withdrawedBy } = req.user;
    
    const {
      amount
    } = req.body;
   
    const send = {
      amount,
      withdrawedBy,
    };
 
  
    const wit = await Withdraw.create({ ...send });
    //   const token = user.createJWT();
    res.status(StatusCodes.CREATED).json(wit);
  };


const getWiths = async (req, res) => {
  const { userId } = req.user;
//   console.log(req.user);
  const mywits = await Withdraw.find({ withdrawedBy: userId });

  res.status(StatusCodes.OK).json({ success: true, data: mywits });
};

module.exports = { getWiths, create};