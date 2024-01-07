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

// router.use(verifyJWT);
// router.use(verifyRole(["PHYSICIAN"]));

router.route("/").get(getAllLabOrders).post(createLabOrder);
router.route("/:labOrderId").get(getLabOrderById).patch(updateLabOrder);
// .delete(deleteLabOrder);

router.route("/pc/:patientChartId").get(getLabOrdersByPatientChartId);

export default router;
