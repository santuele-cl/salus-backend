import { Router } from "express";

import {
  getVitalsByVisitId,
  getAllVitals,
  getVital,
  addVitals,
} from "./vitals.controller.js";

import verifyJWT from "../../middlewares/verifyJWT.middleware.js";
import { verifyRole } from "../../middlewares/verifyRole.middleware.js";

const router = Router();

router.use(verifyJWT);
router.use(verifyRole(["NURSE", "PHYSICIAN"]));

router.route("/").get(getAllVitals).post(addVitals);

router.route("/:vitalsId").get(getVital);
//   .patch(verifyRole(["ADMIN"]), updateEvaluation)
//   .delete(verifyRole(["ADMIN"]), deleteEvaluation);

router.route("/vs/:visitId").get(getVitalsByVisitId);

export default router;
