import { Router } from "express";

import {
  getAllNotes,
  createNewNote,
  updateNote,
  deleteNote,
} from "../controllers/note.controller.js";
import verifyJWT from "../middlewares/verifyJWT.middleware.js";
import { verifyRole } from "../middlewares/verifyRole.middleware.js";

const router = Router();

router.use(verifyJWT);
router
  .route("/")
  .get(getAllNotes)
  .post(createNewNote)
  .patch(updateNote)
  .delete(verifyRole(["admin", "manager"]), deleteNote); //only Manager or Admin allowed

export default router;
