import express from "express";
import teamsController from "../../controllers/admin/teamsController.js";

const router = express.Router();

router.get("/", teamsController.getAll);
router.get("/:id", teamsController.getById);
router.post("/", teamsController.create);
router.put("/:id", teamsController.update);
router.delete("/:id", teamsController.remove);

export default router;
