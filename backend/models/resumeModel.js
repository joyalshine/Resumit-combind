const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
  title: String,
  companyName: String,
  city: String,
  state: String,
  startDate: String,
  endDate: String,
  currentlyWorking: Boolean,
  workSummary: String,
});

const educationSchema = new mongoose.Schema({
  universityName: String,
  startDate: String,
  endDate: String,
  degree: String,
  major: String,
  description: String,
});

const skillSchema = new mongoose.Schema({
  frontendLanguages: [String],
  backendLanguages: [String],
  developerTools: [String],
  libraries: [String],
});

const projectSchema = new mongoose.Schema({
  projectName: String,
  technologies: [String],
  githubLink: String,
  description: String,
});

const resumeSchema = new mongoose.Schema({
  title: String,
  userId: String,
  firstName: String,
  lastName: String,
  githubLink: String,
  LinkedinLink: String,
  phone: String,
  email: String,
  experience: [experienceSchema],
  education: [educationSchema],
  skills: skillSchema,
  project: [projectSchema],
});

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;
