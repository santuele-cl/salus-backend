import { Router } from "express";
import {
  getConfig,
  postConfig,
  updateConfig,
  deleteConfig,
} from "./config.controller.js";
import { verifyRole } from "../../middlewares/verifyRole.middleware.js";
import verifyJWT from "../../middlewares/verifyJWT.middleware.js";

const router = Router();

router
  .route("/")
  .get(getConfig)
  .post(verifyJWT, verifyRole(["ADMIN"]), postConfig);

router
  .route("/:configId")
  .patch(verifyJWT, verifyRole(["ADMIN"]), updateConfig)
  .delete(verifyJWT, verifyRole(["ADMIN"]), deleteConfig);

export default router;
