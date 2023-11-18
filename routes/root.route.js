// @desc - Built-in Module
import { fileURLToPath } from "url";
import { join, dirname } from "path";

// @desc- 3rd-Party Module
import { Router } from "express";

const __dirname = dirname(fileURLToPath(import.meta.url));
const router = Router();

router.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(join(__dirname, "..", "views", "index.html"));
});

export default router;
