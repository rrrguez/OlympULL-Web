import express from "express";
import organizersController from "../../controllers/admin/organizersController.js";

const router = express.Router();

router.get("/", organizersController.getAll);
router.get("/export", organizersController.exportCsv);
router.get("/:id", organizersController.getById);
router.post("/", organizersController.create);
router.put("/:id", organizersController.update);
router.delete("/:id", organizersController.remove);
router.post("/import", upload.single("file"), organizersController.importCsv);

export default router;
