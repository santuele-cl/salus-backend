import { fileURLToPath } from "url";
import { join, dirname } from "path";

// @desc - 3rd-party module import
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";

// @desc- routes import
import rootRoute from "./routes/root.route.js";
import errorRoute from "./routes/error.route.js";
import userRoute from "./routes/user.route.js";
import noteRoute from "./routes/note.route.js";
import authRoute from "./routes/auth.route.js";

// @desc- middleware import
import { logger } from "./middlewares/logger.middleware.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";

// @desc- others import
import corsOptions from "./config/cors/corsOptions.js";
import { connectDB } from "./services/db/mongoDB.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 8000;

// @middlewares
app.use(helmet());
app.use(cors(corsOptions));
app.use(logger);
app.use(express.json());
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

// @routes
app.use("/", rootRoute);
app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/notes", noteRoute);

app.use("*", errorRoute);

// @error handler and logger
app.use(errorHandler);

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}... `));
};

startServer();
