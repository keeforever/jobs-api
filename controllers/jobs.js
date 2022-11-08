const { StatusCodes } = require("http-status-codes");
const JobsModel = require("../model/Jobs");

const getAllJobs = async (req, res) => {
  const jobs = await JobsModel.find({ createdBy: req.user.userID });
  res.status(StatusCodes.ACCEPTED).json({success:true, jobs : jobs,nhBit: jobs.length});
};

const getJob = async (req, res) => {
  const { id: jobID } = req.params;
  const { userID } = req.user;

  const job = await JobsModel.findOne({ createdBy: userID, _id: jobID }).select(
    "-createdBy"
  );
  res.status(StatusCodes.ACCEPTED).json({success:true, job : job});
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userID;
  const job = await JobsModel.create(req.body);
  res.status(StatusCodes.ACCEPTED).send({success:true, job : job});
};

const updateJob = async (req, res) => {
  const { id: jobID } = req.params;
  const { userID } = req.user;
  const updated = await JobsModel.findOneAndUpdate({ createdBy:userID, _id: jobID }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.ACCEPTED).json({success:true, job : updated});
};

const deleteJob = async(req, res) => {
  const { id: jobID } = req.params;
  const { userID } = req.user;
  const deleted = await JobsModel.findOneAndDelete({ createdBy:userID, _id: jobID });
  res.status(StatusCodes.ACCEPTED).json({success:true, job : deleted});
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
