import express from "express";
import monitorsController from "../../controllers/admin/monitorsController.js";

const router = express.Router();

router.get("/", monitorsController.getAll);
router.get("/:id", monitorsController.getById);
router.post("/", monitorsController.create);
router.put("/:id", monitorsController.update);
router.delete("/:id", monitorsController.remove);

export default router;
