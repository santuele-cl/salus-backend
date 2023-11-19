import { Router } from "express";
import {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
} from "./test.controller.js";
const router = Router();

router
  .route("/")
  .get(getAllUsers)
  .post(createNewUser) // Admin and manager only verifyRole(["admin", "manager"]),
  .patch(updateUser)
  .delete(deleteUser);
//   .delete(verifyRole(["admin", "manager"]), deleteUser); // Admin and manager only

export default router;
