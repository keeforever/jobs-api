const jwt = require("jsonwebtoken");
const {UnauthorizedRequest,BadRequest} = require('../errors')
const UserModel = require('../model/User')

const authentication = async(req, res, next) => {
  const authHeader = req.headers.authorization

  if(!authHeader || !authHeader.startsWith('Bearer ') ){
    throw new BadRequest('Auth headers must be provided.')
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // const user = await UserModel.findById(userID).
    req.user = decoded
    next()
  } catch (error) {
    throw new UnauthorizedRequest('Unauthorized Request')
  }
};

module.exports = authentication