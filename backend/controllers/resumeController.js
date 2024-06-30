const Resume = require("./../models/resumeModel");

exports.getAllResume = async (req, res) => {
  try {
    const resumes = await Resume.find();
    res.status(200).json({
      status: "success",
      length: resumes.length,
      data: resumes,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.getResumebyUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const resume = await Resume.find({ userId });
    res.status(200).json({
      status: "success",
      resume,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.getResumebyId = async (req, res) => {
  try {
    const { id } = req.params;
    const resume = await Resume.findById(id);
    res.status(200).json({
      status: "success",
      resume,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};
exports.createResume = async (req, res) => {
  try {
    const resume = await Resume.create(req.body);
    res.status(201).json({
      status: "success",
      data: resume,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.updateDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedDetails = await Resume.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedDetails) {
      return res.status(404).json({
        status: "fail",
        message: "Resume not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: updatedDetails,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
