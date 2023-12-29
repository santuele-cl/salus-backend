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

router.use(verifyJWT);
router.use(verifyRole(["admin"]));
router.route("/").get(getConfig).post(postConfig);

router.route("/:configId").patch(updateConfig).delete(deleteConfig);

export default router;
