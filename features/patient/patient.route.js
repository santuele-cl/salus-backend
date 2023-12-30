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
router
  .route("/")
  .get(verifyRole(["admin"]), getPatients)
  .post(verifyRole(["ADMIN"]), addPatient);

router
  .route("/:patientId")
  .get(verifyUserId, getPatientById)
  .patch(verifyRole(["ADMIN"]), updatePatient)
  .delete(verifyRole(["ADMIN"]), deletePatient);

export default router;
