import { Router } from "express";

import {
  getUsers,
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
  .get(verifyRole(["admin"]), getUsers)
  .post(verifyRole(["admin"]), createNewUser) // Admin and manager only verifyRole(["admin", "manager"]),
  .patch(verifyRole(["admin"]), updateUser)
  .delete(verifyRole(["admin"]), deleteUser); // Admin and manager only

router
  .route("/:userId")
  .get(verifyRole(["admin"]), getUsers)
  .put()
  .delete();
export default router;

/**
 * GET /users
 * GET /users/:userId
 * POST /users
 * PUT /users/:userId
 * DELETE /users/:userId
 */
