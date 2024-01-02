import { Router } from "express";
import {
  getConfig,
  postConfig,
  updateConfig,
  deleteConfig,
} from "./config.controller.js";

const router = Router();

router.route("/").get(getConfig).post(postConfig);

router.route("/:configId").patch(updateConfig).delete(deleteConfig);

export default router;
