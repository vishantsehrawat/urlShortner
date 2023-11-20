const winston = require("winston");
const { format } = winston;
const path = require("path");

const logsDirectory = path.join(__dirname, "..", "logs");

const logger = winston.createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.simple(),
    format.colorize()
  ),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({
      filename: path.join(logsDirectory, "access.log"),
      level: "info",
    }),
    new winston.transports.File({
      filename: path.join(logsDirectory, "error.log"),
      level: "error",
    }),
    // * using info level instead of http
    // new winston.transports.File({
    //   filename: path.join(logsDirectory, "http.log"),
    //   level: "http",
    // }),
  ],
});

module.exports = { logger };
