const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv")
dotenv.config()
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const cookieParser = require("cookie-parser");
const app = express();
const path = require('path')
const connectToDB = require('./db/connection')
const resumeRouter = require("./routes/resumeRoute");
const userRouter = require("./routes/userRoute");
const portfolioRouter = require("./routes/portfolioRouter");


const __dirnam = path.resolve()


var corsOptions = {
    origin: true,
      credentials: true,
  }
  

app.use(cors(corsOptions));
app.use(helmet());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(mongoSanitize());

if (process.env.NODE_ENV == "development") app.use(morgan("dev"));

app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "script-src 'self' https://accounts.google.com");
  next();
});

app.use("/api/users", userRouter);
app.use("/api/resume", resumeRouter);
app.use("/api/portfolio", portfolioRouter);

app.use(express.static(path.join(__dirnam,"frontend/dist")))

app.get("*",(req,res) => {
  res.sendFile(path.join(__dirnam,"frontend","dist","index.html"))
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  connectToDB()
  console.log(`Server is running on port ${PORT}`);
});
