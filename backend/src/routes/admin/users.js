import express from "express";
import usersController from "../../controllers/admin/usersController.js";

const router = express.Router();

router.get("/", usersController.getAll);
router.get("/:id", usersController.getById);
router.post("/", usersController.create);
router.put("/:id", usersController.update);
router.put("/:id/password", usersController.updatePassword);
router.delete("/:id", usersController.remove);

export default router;
