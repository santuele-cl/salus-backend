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
router
  .route("/")
  .get(verifyRole(["admin"]), getAllVisits)
  .post(verifyRole(["ADMIN"]), createVisit);

router
  .route("/:visitId")
  .get(verifyUserId, getVisitById)
  .patch(verifyRole(["ADMIN"]), updateVisit)
  .delete(verifyRole(["ADMIN"]), deleteVisit);

router
  .route("/patientChart/:patientChartId")
  .get(verifyUserId, getVisitsByPatientChartId);

export default router;
