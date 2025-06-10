const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const { NotFoundError } = require("./utils/AppError");
const logger = require("./utils/logger");
const routes = require("./routes");
const app = express();

// Request logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());

app.use("/api/v1", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new NotFoundError("Route not found"));
});

// handle error
app.use(errorHandler);

module.exports = app;
