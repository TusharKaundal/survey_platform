const { createLogger, format, transports } = require("winston");
const fs = require("fs");
const path = require("path");

// Create logs directory if it doesn't exist
const logDir = path.join(__dirname, "../logs");
try {
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
} catch (err) {
  console.error("Failed to create logs directory:", err);
}

const logFile = path.join(logDir, "error.log");

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.json(),
    format.prettyPrint()
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(({ level, message, timestamp }) => {
          const errorMessage = level.includes("error")
            ? message + "\n" + `Check logs for error in ${logFile}`
            : message;
          return `[${timestamp}] ${level}: ${errorMessage}`;
        })
      ),
    }),
    new transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error",
    }),
  ],
});

module.exports = logger;
