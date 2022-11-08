const { StatusCodes } = require("http-status-codes");
const { CustomAPIError } = require("../errors");
const errorHandler = (err, req, res, next) => {
  const customError = {
    msg: err.message || "Something went to wrong.Please Try again later !!!",
    status: err.status || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  if (err instanceof CustomAPIError) {
    res.status(err.statusCode).json({ msg: err.message });
  }

  // validation error
  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
    customError.status = 400;
  }

  if (err.code === 11000) {
    customError.msg = "Registered Email. Please login !";
    customError.status = StatusCodes.PERMANENT_REDIRECT;
  }

  if (err.name === "CastError") {
    customError.msg = `No such a id of ${err.value} found.`;
  }    customError.status = 400;


  
  // res.status(customError.status).json({ msg: err });
  res.status(customError.status).json({msg: customError.msg})
};

module.exports = errorHandler;
