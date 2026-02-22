import express from "express";
import itinerariesController from "../../controllers/itinerariesController.js";
import upload from "../../middlewares/uploadCsv.js";

const router = express.Router();

router.get("/", itinerariesController.getAll);
router.get("/olympiad/:olympiadId", itinerariesController.getByOlympiad);
router.get("/export", itinerariesController.exportCsv);
router.get("/:id", itinerariesController.getOne);
router.post("/", itinerariesController.create);
router.put("/:id", itinerariesController.update);
router.delete("/:id", itinerariesController.remove);
router.post("/import", upload.single("file"), itinerariesController.importCsv);

export default router;
