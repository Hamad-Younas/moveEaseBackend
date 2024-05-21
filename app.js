var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const axios = require('axios');
require("dotenv").config();
require("./utils/database");
const createWebSocketServer = require('./utils/websocket');

createWebSocketServer(5000);


var indexRouter = require("./routes/index");
var usersRouter = require("./routes");

var SignUpRouter = require("./routes/SignUp");
var LoginRouter = require("./routes/Login");
var GetProfileRouter = require("./routes/GetProfile");
var UpdateProfileRouter = require("./routes/UpdateProfile");
var AddInsuranceRouter = require("./routes/AddInsurance");
var AddServiceRouter = require("./routes/AddService");
var AddInformtionRouter = require("./routes/AddInformtion");
var GetInformationRouter = require("./routes/GetInformation");
var GetServiceRouter = require("./routes/GetService");
var GetInsuranceRouter = require("./routes/GetInsurance");
var DeleteInsuranceRouter = require("./routes/DeleteInsurance");
var DeleteInformationRouter = require("./routes/DeleteInformation");
var DeleteServiceRouter = require("./routes/DeleteService");
var GetOpeningHoursRouter = require("./routes/GetOpeningHours");
var UpdateOpeningHoursRouter = require("./routes/UpdateOpeningHours");
var UpdateDescriptionRouter = require("./routes/UpdateDescription");
var UpdateLogoRouter = require("./routes/UpdateLogo");
var AddMoveRequestRouter = require("./routes/AddMoveRequest");
var feedbackRouter = require("./routes/FeedBack");
var GetfeedbackRouter = require("./routes/GetfeedBakc");
var GetMoveReqRouter = require("./routes/GetMoveRequest");
var SendEmailRouter = require("./routes/SendEmail");
var DeleteCompanyRouter = require("./routes/DeleteCompany");
var DeleteMoveReqRouter = require("./routes/DeleteMoveReq");
var ChatRouter = require("./routes/GetChat");
const { info } = require("console");

var app = express();
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// function validateAPIKey(req, res, next) {
//   const authkey =  req.header('api-key');
//   if (authkey && crypto.createHash('sha256').update(authkey).digest('hex') == process.env.API_KEY) {
//     next();
//   } else {
//     res.status(401).json({ error: 'Unauthorized Access' });
//   }
// }
// app.use((req, res, next) => {
//   if (req.path.startsWith('/images')) {
//     return next();
//   }
//   validateAPIKey(req, res, next);
// });

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("", usersRouter);
// Users
app.use("/SignUp", SignUpRouter);
app.use("/Login", LoginRouter);
app.use("/GetProfile", GetProfileRouter);
app.use("/UpdateProfile", UpdateProfileRouter);
app.use("/AddInsurance", AddInsuranceRouter);
app.use("/AddService", AddServiceRouter);
app.use("/AddInformtion", AddInformtionRouter);
app.use("/GetInformation", GetInformationRouter);
app.use("/GetService", GetServiceRouter);
app.use("/GetInsurance", GetInsuranceRouter);
app.use("/DeleteInsurance", DeleteInsuranceRouter);
app.use("/DeleteInformation", DeleteInformationRouter);
app.use("/DeleteService", DeleteServiceRouter);
app.use("/GetOpeningHours", GetOpeningHoursRouter);
app.use("/UpdateOpeningHours", UpdateOpeningHoursRouter);
app.use("/UpdateDescription", UpdateDescriptionRouter);
app.use("/UpdateLogo", UpdateLogoRouter);
app.use("/AddMoveRequest", AddMoveRequestRouter);
app.use("/FeedBack", feedbackRouter);
app.use("/GetFeedBack", GetfeedbackRouter);
app.use("/GetMoveReq", GetMoveReqRouter);
app.use("/Email", SendEmailRouter);
app.use("/DeleteCompany", DeleteCompanyRouter);
app.use("/UpdateMoveReq", DeleteMoveReqRouter);
app.use("/Chat", ChatRouter);

app.get('/places', async (req, res) => {
  const { input } = req.query;
  const apiKey = 'AIzaSyCcWiBYpJLmkhPhdg-HYkYEuypXlGsY1fU'; // Replace with your Google Maps API key
  const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching places:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
