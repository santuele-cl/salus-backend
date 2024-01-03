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
router.use(verifyRole(["PHYSICIAN"]));

router.route("/").get(getAllEvaluations).post(addEvaluation);

router.route("/:evaluationId").get(getEvaluation);
//   .patch( updateEvaluation)
//   .delete( deleteEvaluation);

router.route("/vs/:visitId").get(getEvaluationByVisitId);

export default router;
