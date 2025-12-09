import express from "express";
import exerciseAssignationsController from "../../controllers/admin/exerciseAssignationsController.js";

const router = express.Router();

router.get("/", exerciseAssignationsController.getAll);
router.get("/:id", exerciseAssignationsController.getOne);
router.post("/", exerciseAssignationsController.create);
router.put("/:id", exerciseAssignationsController.update);
router.delete("/:id", exerciseAssignationsController.remove);

export default router;
