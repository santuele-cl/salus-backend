import { Router } from "express";
import {
  getRoles,
  postRole,
  updateRole,
  deleteRole,
} from "./role.controller.js";
import { verifyRole } from "../../middlewares/verifyRole.middleware.js";
import verifyJWT from "../../middlewares/verifyJWT.middleware.js";

const router = Router();

router.use(verifyJWT);
router.use(verifyRole(["admin"]));
router.route("/").get(getRoles).post(postRole);

router.route("/:roleId").patch(updateRole).delete(deleteRole);

export default router;
