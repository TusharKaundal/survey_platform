const { createLogger, format, transports } = require("winston");
const fs = require("fs");
const path = require("path");

// Create logs directory if it doesn't exist
const logDir = path.join(__dirname, "..", "logs");
console.log(logDir);
try {
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
} catch (err) {
  console.error("Failed to create logs directory:", err);
}

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
          return `[${timestamp}] ${level}: ${message}`;
        })
      ),
    }),
    new transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error",
      format: format.combine(
        format.timestamp(),
        format.printf(({ level, timestamp, ...args }) => {
          return `[${timestamp}] ${level}: ${JSON.stringify(args, null, 2)}`;
        })
      ),
    }),
  ],
});

module.exports = logger;
