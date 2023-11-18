// @desc - Built-in Module
import { fileURLToPath } from "url";
import { join, dirname } from "path";

// @desc -  3rd Party Module
import { Router } from "express";

const __dirname = dirname(fileURLToPath(import.meta.url));
const router = Router();

router.all("/", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(join(__dirname, "..", "views", "error.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found." });
  } else {
    res.type("txt").send("404 not found");
  }
});

export default router;
