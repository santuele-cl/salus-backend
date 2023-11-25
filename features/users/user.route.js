import { Router } from "express";

import {
  getUserById,
  getUsers,
  createNewUser,
  updateUser,
  deleteUser,
} from "./user.controller.js";

import verifyJWT from "../../middlewares/verifyJWT.middleware.js";
import { verifyRole } from "../../middlewares/verifyRole.middleware.js";
import verifyUserId from "../../middlewares/verifyUserId.middleware.js";

const router = Router();

router.use(verifyJWT);
router
  .route("/")
  .get(verifyRole(["admin"]), getUsers)
  .post(verifyRole(["admin"]), createNewUser);

router
  .route("/:userId")
  .get(verifyUserId, getUserById)
  .patch(verifyRole(["admin"]), updateUser)
  .delete(verifyRole(["admin"]), deleteUser);

export default router;
