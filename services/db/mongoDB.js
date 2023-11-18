import mongoose from "mongoose";
import { logEvents } from "../../middlewares/logger.middleware.js";
const { connection, connect, disconnect } = mongoose;

const connectDB = async () => {
  try {
    await connect(process.env.MONGODB_URI);
  } catch (err) {
    console.error(err);
  }
};

const disconnectDB = async () => {
  try {
    await disconnect();
  } catch (err) {
    console.error(err);
  }
};

connection.once("open", () => console.log("Connected to MongoDB."));

connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongodb.log"
  );
});

export { connectDB, disconnectDB };
