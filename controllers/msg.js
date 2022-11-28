const Message = require("../models/Message");
// const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");


const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require("../errors");

const create = async (req, res) => {
    // const { userId: user } = req.user;
    
    const {
     msg,email,name
    } = req.body;
   
    const send = {
        msg,email,name
    };
 
  
    const mssg = await Message.create({ ...send });
    //   const token = user.createJWT();
    res.status(StatusCodes.CREATED).json(mssg);
  };

module.exports = { create};