import { Router } from "express";

import {
  getAllVisits,
  getVisitById,
  getVisitsByPatientChartId,
  createVisit,
  updateVisit,
  deleteVisit,
} from "./visit.controller.js";

import verifyJWT from "../../middlewares/verifyJWT.middleware.js";
import { verifyRole } from "../../middlewares/verifyRole.middleware.js";
import verifyUserId from "../../middlewares/verifyUserId.middleware.js";

const router = Router();

router.use(verifyJWT);
router.use(verifyRole(["NURSE", "PHYSICIAN"]));

router.route("/").get(getAllVisits).post(createVisit);
router
  .route("/:visitId")
  .get(getVisitById)
  .patch(updateVisit)
  .delete(deleteVisit);

router.route("/patientChart/:patientChartId").get(getVisitsByPatientChartId);

export default router;
