const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "must provide fullname"],
      trim: true,
    },

    username: {
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

    password: {
      type: String,
      required: [true, "must provide password"],
      select: false,
    },
    bitcoinaddy: {
      type: String,
      required: [true, "must provide bitcoin address"],
      trim: true,
    },
    ethaddy: {
      type: String,
      required: [true, "must provide eth address"],
      trim: true,
    },
    accountbal : {
      type:Number,
default:0,
    }
    ,
    totalWithdraw : {
      type:Number,
default:0,
    },
    totalDep : {
      type:Number,
default:0,
    },
    earning : {
      type:Number,
default:0,
    }
   
  },
  { timestamps: true }
);

//mongoose middleware to add to schema before sending to db
UserSchema.pre("save", async function (next) {
  //the next can be omitted since u are using async await...read from docs
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//mongoose methos to add jwt
UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, fullname: this.fullname },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

UserSchema.methods.verifyPwd = async function (candidatePwd) {
  const validated = await bcrypt.compare(candidatePwd, this.password);
  return validated;
};
module.exports = mongoose.model("User", UserSchema);
