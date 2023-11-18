import { Router } from "express";
import {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import verifyJWT from "../middlewares/verifyJWT.middleware.js";
import { verifyRole } from "../middlewares/verifyRole.middleware.js";

const router = Router();

router.use(verifyJWT);
router
  .route("/")
  .get(getAllUsers)
  .post(createNewUser) // Admin and manager only verifyRole(["admin", "manager"]),
  .patch(updateUser)
  .delete(verifyRole(["admin", "manager"]), deleteUser); // Admin and manager only

export default router;
