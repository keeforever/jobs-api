const UserModel = require("../model/User");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequest,
  CustomAPIError,
  UnauthorizedRequest,
} = require("../errors");

const register = async (req, res) => {
  const user = await UserModel.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ userID:user._id, name:user.name, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequest("Bad request.");
  }
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new CustomAPIError("There is no registered user .", 404);
  }
  


  const isMatch = await user.grantAccess(password);
  
  if (!isMatch) {
    throw new UnauthorizedRequest("Password does not match.");
  }

  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ userID:user._id, name:user.name, token });

};

module.exports = { register, login };
