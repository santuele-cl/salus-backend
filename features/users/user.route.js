import { Router } from "express";

import {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
} from "./user.controller.js";

import verifyJWT from "../../middlewares/verifyJWT.middleware.js";
import { verifyRole } from "../../middlewares/verifyRole.middleware.js";

const router = Router();

router.use(verifyJWT);
router
  .route("/")
  .get(verifyRole(["admin"]), getAllUsers)
  .post(verifyRole(["admin"]), createNewUser) // Admin and manager only verifyRole(["admin", "manager"]),
  .patch(verifyRole(["admin"]), updateUser)
  .delete(verifyRole(["admin"]), deleteUser); // Admin and manager only

export default router;
