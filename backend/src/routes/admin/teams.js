import express from "express";
import teamsController from "../../controllers/teamsController.js";
import upload from "../../middlewares/uploadCsv.js";

const router = express.Router();

router.get("/", teamsController.getAll);
router.get("/export", teamsController.exportCsv);
router.get("/:id", teamsController.getById);
router.post("/", teamsController.create);
router.put("/:id", teamsController.update);
router.delete("/:id", teamsController.remove);
router.post("/import", upload.single("file"), teamsController.importCsv);

export default router;
