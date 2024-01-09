import { Router } from "express";

import {
  getAllLabOrders,
  getLabOrdersByPatientChartId,
  getLabOrderById,
  createLabOrder,
  updateLabOrder,
  deleteLabOrder,
} from "./lab.controller.js";

import verifyJWT from "../../middlewares/verifyJWT.middleware.js";
import { verifyRole } from "../../middlewares/verifyRole.middleware.js";
import verifyUserId from "../../middlewares/verifyUserId.middleware.js";

const router = Router();

router.use(verifyJWT);

router
  .route("/")
  .get(verifyRole(["PHYSICIAN", "NURSE"]), getAllLabOrders)
  .post(verifyRole(["PHYSICIAN"]), createLabOrder);
router
  .route("/:labOrderId")
  .get(verifyRole(["PHYSICIAN", "NURSE"]), getLabOrderById)
  .patch(verifyRole(["PHYSICIAN", "NURSE"]), updateLabOrder);
// .delete(deleteLabOrder);

router.route("/pc/:patientChartId").get(getLabOrdersByPatientChartId);

export default router;
