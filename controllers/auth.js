const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require("../errors");

const register = async (req, res) => {

  const { fullname, username,email, password,bitcoinaddy,ethaddy } = req.body;

  if (!fullname || !email || !password,!username,!bitcoinaddy,!ethaddy) {
    throw new BadRequestError("please provide all values");
  }
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("Email already in use");
  }
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      fullname: user.fullname,
      btcaddy:user.bitcoinaddy,
      accountbal:user.accountbal,
      totalWithdraw:user.totalWithdraw,
      totalDep:user.totalDep,
      earns:user.earning
    },
    token,
  });
};


const login = async (req, res) => {
  //using controller validation..
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("please provide email and password");
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new UnauthenticatedError("invalid credentials");
  }
  const validated = await user.verifyPwd(password);
  if (!validated) {
    throw new UnauthenticatedError("invalid credentials");
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user: {
      email: user.email,
      fullname: user.fullname,
      btcaddy:user.bitcoinaddy,
      accountbal:user.accountbal,
      totalWithdraw:user.totalWithdraw,
      totalDep:user.totalDep,
      earns:user.earning
    },
    token,
  });
};

const updateUser = async (req, res) => {
  const { email,password } = req.body;
  const { userId } = req.user;

  if (!email) {
    throw new BadRequestError("Please provide all values");
  }

  let user = await User.findOne({ _id: userId }).select("+password");
  if (user) {
    user.email = req.body.email;
    if (password && password !== "") {
      user.password = password;
    }
    await user.save();

    const token = user.createJWT();
                                      
             
         
       

    res.status(StatusCodes.OK).json({
      user: {
        email: user.email,
        fullname: user.fullname,
        btcaddy: user.bitcoinaddy,
        accountbal: user.accountbal,
        totalWithdraw: user.totalWithdraw,
        totalDep: user.totalDep,
        earns:user.earning
      },
      token,
    });
  } else {
    res.status(StatusCodes.NOT_FOUND);
  }
};
module.exports = { login, register, updateUser };
