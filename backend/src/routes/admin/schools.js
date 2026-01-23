import express from "express";
import schoolsController from "../../controllers/admin/schoolsController.js";

const router = express.Router();

router.get("/", schoolsController.getAll);
router.get("/:id", schoolsController.getById);
router.post("/", schoolsController.create);
router.put("/:id", schoolsController.update);
router.delete("/:id", schoolsController.remove);

export default router;
