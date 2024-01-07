import { Router } from "express";
import { getCategories } from "./labProcedureCategory.controller.js";
import { verifyRole } from "../../middlewares/verifyRole.middleware.js";
import verifyJWT from "../../middlewares/verifyJWT.middleware.js";

const router = Router();

// router.use(verifyJWT);
// router.use(verifyRole(["ADMIN"]));

router.route("/").get(getCategories);
// .post(postRole);

// router.route("/:roleId").patch(updateRole).delete(deleteRole);

export default router;
