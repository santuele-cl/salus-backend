import { Router } from "express";
import { login, logout, refresh } from "../controllers/auth.controller.js";
import loginLimiter from "../middlewares/loginLimiter.middleware.js";

const router = Router();

// router.use()
router.route("/").post(loginLimiter, login);
router.route("/refresh").get(refresh);
router.route("/logout").post(logout);

export default router;
