import { Router } from "express";

import {
  getVitalsByVisitId,
  getAllVitals,
  getVital,
  addVitals,
} from "./vitals.controller.js";

import verifyJWT from "../../middlewares/verifyJWT.middleware.js";
import { verifyRole } from "../../middlewares/verifyRole.middleware.js";
import verifyUserId from "../../middlewares/verifyUserId.middleware.js";

const router = Router();

router.use(verifyJWT);
router
  .route("/")
  .get(verifyRole(["admin"]), getAllVitals)
  .post(verifyRole(["ADMIN"]), addVitals);

router.route("/:vitalsId").get(verifyUserId, getVital);
//   .patch(verifyRole(["ADMIN"]), updateEvaluation)
//   .delete(verifyRole(["ADMIN"]), deleteEvaluation);

router.route("/vs/:visitId").get(verifyUserId, getVitalsByVisitId);

export default router;
