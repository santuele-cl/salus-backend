import { Router } from "express";

import { getCharts } from "./chart.controller.js";

import verifyJWT from "../../middlewares/verifyJWT.middleware.js";
import { verifyRole } from "../../middlewares/verifyRole.middleware.js";
import verifyUserId from "../../middlewares/verifyUserId.middleware.js";

const router = Router();

router.use(verifyJWT);
router.route("/").get(verifyRole(["admin"]), getCharts);
//   .post(verifyRole(["ADMIN"]), createVisit);

router.route("/:patientChartId").get(verifyUserId, getPatientVisits);
//   .patch(verifyRole(["ADMIN"]), updateVisit)
//   .delete(verifyRole(["ADMIN"]), deleteVisit);

export default router;
