"use strict"

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const adminRoutes = require("./routes/admin");
const patientRoutes = require("./routes/patients");
const providerRoutes = require("./routes/providers");
const messageRoutes = require("./routes/messages")

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.use("/admin", adminRoutes)
app.use("/patient", patientRoutes)
app.use("/provider", providerRoutes)
app.use("/message", messageRoutes)

app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== "test") console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;
  
    return res.status(status).json({
      error: { message, status },
    });
  });
  
  module.exports = app;