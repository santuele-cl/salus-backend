import { fileURLToPath } from "url";
import { join, dirname } from "path";

// @desc - 3rd-party module import
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";

// @desc- routes import
import rootRoute from "./features/root/root.route.js";
import errorRoute from "./features/error/error.route.js";
import userRoute from "./features/users/user.route.js";
import roleRoute from "./features/roles/role.route.js";
import authRoute from "./features/auth/auth.route.js";
import patientRoute from "./features/patient/patient.route.js";
import visitRoute from "./features/visit/visit.route.js";
import evaluationRoute from "./features/evaluation/evaluation.route.js";
// import chartRoute from "./features/chart/chart.route.js";
import configRoute from "./features/config/config.route.js";
import vitalsRoute from "./features/vitals/vitals.route.js";
import testRoute from "./features/test/test.route.js";
import labOrderRoute from "./features/laborders/lab.route.js";
import categoriesRoute from "./features/labprocedure/labProcedureCategory.route.js";

// @desc- middleware import
import { logger } from "./middlewares/logger.middleware.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";

// @desc- others import
import corsOptions from "./config/cors/corsOptions.js";

import prismaInstance from "./prisma/prismaClient.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 8000;

// @middlewares
app.use(helmet());
// app.use(cors(corsOptions));
app.use(
  cors({
    origin: "https://playful-empanada-24d002.netlify.app",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(logger);
app.use(express.json());
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

// @routes
app.use("/", rootRoute);
app.use("/auth", authRoute);
app.use("/roles", roleRoute);

app.use("/users", userRoute);
app.use("/patients", patientRoute);
app.use("/visits", visitRoute);
app.use("/vitals", vitalsRoute);
app.use("/evaluations", evaluationRoute);
app.use("/laborders", labOrderRoute);
app.use("/procedurecategories", categoriesRoute);
// app.use("/charts", chartRoute);
app.use("/config", configRoute);

app.use("/test", testRoute);
app.use("*", errorRoute);

// @error handler and logger
app.use(errorHandler);

const startServer = async () => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}... `));
};

try {
  await startServer();
} catch (error) {
  console.error(error);
  process.exit(1);
}
