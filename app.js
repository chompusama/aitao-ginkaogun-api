const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// define path of each routes
const testRoutes = require("./api/routes/testRoutes");
const feedRoutes = require("./api/routes/feedRoutes");
const foodRoutes = require("./api/routes/foodLevelRoutes");
const timerRoutes = require("./api/routes/timerRoutes");

// connect to mongoDB
// username is chompusama and password is digio
mongoose.connect(
  "mongodb+srv://chompusama:digio@wallet-nfc-elwkn.mongodb.net/aitao?retryWrites=true&w=majority",
  function(err) {
        if(err) throw err;
        console.log('Connect to MongoDB Atlas successful!')
    }
);

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests
app.use("/test", testRoutes);
app.use("/feed", feedRoutes);
app.use("/food", foodRoutes);
app.use("/timer", timerRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});




module.exports = app;
