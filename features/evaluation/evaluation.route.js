// import { Router } from "express";

// import {
//   getPatientEvaluations,
//   getEvaluation,
//   addEvaluation,
//   updateEvaluation,
//   deleteEvaluation,
// } from "./evaluation.controller.js";

// import verifyJWT from "../../middlewares/verifyJWT.middleware.js";
// import { verifyRole } from "../../middlewares/verifyRole.middleware.js";
// import verifyUserId from "../../middlewares/verifyUserId.middleware.js";

// const router = Router();

// router.use(verifyJWT);
// router
//   .route("/")
//   .get(verifyRole(["admin"]), getPatientEvaluations)
//   .post(verifyRole(["ADMIN"]), addEvaluation);

// router
//   .route("/:patientChartId")
//   .get(verifyUserId, getEvaluation)
//   .patch(verifyRole(["ADMIN"]), updateEvaluation)
//   .delete(verifyRole(["ADMIN"]), deleteEvaluation);

// export default router;
