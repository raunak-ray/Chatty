import { createLogger, format, transports } from "winston";

const logger = createLogger({
  level: "info",
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.errors({ stack: true }),
        format.printf(({ timestamp, level, message, stack, ...meta }) => {
          return `[${timestamp}] ${level}: ${message} ${
            stack ? "\n" + stack : ""
          } ${
            Object.keys(meta).length ? "\n" + JSON.stringify(meta, null, 2) : ""
          }`;
        }),
      ),
    }),
  ],
});

export default logger;
