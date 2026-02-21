import express from "express";
import usersController from "../controllers/usersController.js";
import upload from "../middlewares/uploadCsv.js";

const router = express.Router();

router.get("/", usersController.getAll);
router.get("/export", usersController.exportCsv);
router.get("/:id", usersController.getById);
router.get("/type/:type", usersController.getByType);
router.post("/", usersController.create);
router.put("/:id", usersController.update);
router.put("/:id/password", usersController.updatePassword);
router.delete("/:id", usersController.remove);
router.post("/import", upload.single("file"), usersController.importCsv);

export default router;
