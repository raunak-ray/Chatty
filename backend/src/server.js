import express from "express";
import "dotenv/config";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectToDb } from "./lib/db.js";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socket.js";
import {
  errorLoggerMiddleware,
  requestLoggerMiddleware,
} from "./middleware/logger.middleware.js";

const __dirname = path.resolve();

const port = process.env.PORT || 3000;

app.use(express.json());
// app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser());
app.use(requestLoggerMiddleware);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/message", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get(/.*/, (_, res) => {
    console.log(path.join(__dirname, "../frontend", "dist", "index.html"));

    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.use(errorLoggerMiddleware);

server.listen(port, () => {
  console.log(`Server started on port: ${port}`);

  connectToDb();
});
