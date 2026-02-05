import express from "express";
import schoolsController from "../../controllers/admin/schoolsController.js";

const router = express.Router();

router.get("/", schoolsController.getAll);
router.get("/export", schoolsController.exportCsv);
router.get("/:id", schoolsController.getById);
router.post("/", schoolsController.create);
router.put("/:id", schoolsController.update);
router.delete("/:id", schoolsController.remove);
router.post("/import", upload.single("file"), schoolsController.importCsv);

export default router;
