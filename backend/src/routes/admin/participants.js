import express from "express";
import participantsController from "../../controllers/admin/participantsController.js";

const router = express.Router();

router.get("/", participantsController.getAll);
router.get("/export", participantsController.exportCsv);
router.get("/:id", participantsController.getById);
router.get("/type/:type", participantsController.getByType);
router.post("/", participantsController.create);
router.put("/:id", participantsController.update);
router.put("/:id/password", participantsController.updatePassword);
router.delete("/:id", participantsController.remove);
router.post("/import", upload.single("file"), participantsController.importCsv);

export default router;
