const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "../.env" });

const DB = process.env.DATABASE_URL.replace("<PASSWORD>", process.env.PASSWORD);

mongoose.connect(DB).then((con) => {
  console.log("Connections done ...");
});

const { Resume } = require("../models/resumeModel");

let profileData = {
  firstName: "James",
  lastName: "Carter",
  jobTitle: "full stack developer",
  githubLink: "525 N tryon Street, NC 28117",
  LinkedinLink: "525 N tryon Street, NC 28117",
  phone: "(123)-456-7890",
  email: "exmaple@gmail.com",
  themeColor: "#ff6666",
  summery:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  experience: [
    {
      id: 1,
      title: "Full Stack Developer",
      companyName: "Amazon",
      city: "New York",
      state: "NY",
      startDate: "Jan 2021",
      endDate: "",
      currentlyWorking: true,
      workSummery:
        "Designed, developed, and maintained full-stack applications using React and Node.js. Implemented responsive user interfaces with React, ensuring seamless user experiences across various devices and browsers. Maintaining the React Native in-house organization application. Created RESTful APIs with Node.js and Express, facilitating data communication between the front-end and back-end systems.",
    },
    {
      id: 2,
      title: "Frontend Developer",
      companyName: "Google",
      city: "Charlotte",
      state: "NC",
      startDate: "May 2019",
      endDate: "Jan 2021",
      currentlyWorking: false,
      workSummery:
        "Designed, developed, and maintained full-stack applications using React and Node.js. Implemented responsive user interfaces with React, ensuring seamless user experiences across various devices and browsers. Maintaining the React Native in-house organization application. Created RESTful APIs with Node.js and Express, facilitating data communication between the front-end and back-end systems.",
    },
  ],
  education: [
    {
      id: 1,
      universityName: "Western Illinois University",
      startDate: "Aug 2018",
      endDate: "Dec:2019",
      degree: "Master",
      major: "Computer Science",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud",
    },
    {
      id: 2,
      universityName: "Western Illinois University",
      startDate: "Aug 2018",
      endDate: "Dec:2019",
      degree: "Master",
      major: "Computer Science",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud",
    },
  ],
  skills: {
    frontendLanguages: [
      "Java",
      "Python",
      "C/C++",
      "SQL",
      "JavaScript",
      "HTML/CSS",
    ],
    backendLanguages: ["React", "Node.js", "Flask", "Express"],
    developerTools: ["Git", "PostMan"],
    libraries: ["pandas", "NumPy", "Matplotlib", "TensorFlow API"],
  },
  project: [
    {
      projectName: "Online Payment Fraud Detection",
      technologies: [
        "Python",
        "TensorFlow",
        "Pandas",
        "NumPy",
        "Flask",
        "React",
      ],
      githubLink: "Link",
      description:
        "Clean and preprocess data using Pandas for analysis-ready format Build fraud detection models using scikit-learn (Random Forest, Gradient Boosting) Develop a Flask application for real-time monitoring of transactions Deploy the trained models using TensorFlow Serving for efficient and scalable fraud detection",
    },
  ],
};

const importData = async () => {
  try {
    await Resume.create(profileData);

    console.log("Data have been added");
  } catch (err) {
  }
};

if (process.argv[2] == "--import") importData();
