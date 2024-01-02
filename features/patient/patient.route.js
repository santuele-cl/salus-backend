import { Router } from "express";

import {
  getPatients,
  getPatientById,
  addPatient,
  updatePatient,
  deletePatient,
} from "./patient.controller.js";

import verifyJWT from "../../middlewares/verifyJWT.middleware.js";
import { verifyRole } from "../../middlewares/verifyRole.middleware.js";
import verifyUserId from "../../middlewares/verifyUserId.middleware.js";

const router = Router();

router.use(verifyJWT);
router.use(verifyRole(["NURSE", "PHYSICIAN"]));

router.route("/").get(getPatients).post(addPatient);

router
  .route("/:patientId")
  .get(getPatientById)
  .patch(updatePatient)
  .delete(deletePatient);

export default router;
