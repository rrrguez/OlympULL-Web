import express from "express";
import exerciseAssignationsController from "../../controllers/admin/exerciseAssignationsController.js";

const router = express.Router();

router.get("/", exerciseAssignationsController.getAll);
router.post("/", exerciseAssignationsController.create);
router.delete("/", exerciseAssignationsController.remove);

export default router;
