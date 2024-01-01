import { Router } from "express";

import {
  getEvaluationByVisitId,
  getEvaluation,
  getAllEvaluations,
  addEvaluation,
} from "./evaluation.controller.js";

import verifyJWT from "../../middlewares/verifyJWT.middleware.js";
import { verifyRole } from "../../middlewares/verifyRole.middleware.js";
import verifyUserId from "../../middlewares/verifyUserId.middleware.js";

const router = Router();

router.use(verifyJWT);
router
  .route("/")
  .get(verifyRole(["admin"]), getAllEvaluations)
  .post(verifyRole(["ADMIN"]), addEvaluation);

router.route("/:evaluationId").get(verifyUserId, getEvaluation);
//   .patch(verifyRole(["ADMIN"]), updateEvaluation)
//   .delete(verifyRole(["ADMIN"]), deleteEvaluation);

router.route("/vs/:visitId").get(verifyUserId, getEvaluationByVisitId);

export default router;
