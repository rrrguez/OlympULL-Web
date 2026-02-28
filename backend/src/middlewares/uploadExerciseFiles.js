import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const id = req.body.id || req.params.id;

        if (!id) {
            return cb(new Error("Se requiere de un ID de ejercicio para la subida de archivos"));
        }

        let uploadPath = "";

        if (file.fieldname === "wording_file") {
            uploadPath = path.join("uploads/wordings");
        }

        if (file.fieldname === "input_files") {
            uploadPath = path.join("uploads/inputs");
        }

        if (file.fieldname === "output_files") {
            uploadPath = path.join("uploads/outputs");
        }

        fs.mkdirSync(uploadPath, { recursive: true });

        cb(null, uploadPath);
    },

    filename: (req, file, cb) => {
        const id = req.body.id || req.params.id;

        if (file.fieldname === "wording_file") {
            cb(null, `${id}.pdf`);
        }

        if (file.fieldname === "input_files") {
            cb(null, `${id}.zip`);
        }

        if (file.fieldname === "output_files") {
            cb(null, `${id}.zip`);
        }
    }
});

export const uploadExerciseFiles = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.fieldname === "wording_file" && file.mimetype !== "application/pdf") {
            return cb(new Error("Solo se permiten archivos PDF para los enunciados"));
        }

        if (
            (file.fieldname === "input_files" || file.fieldname === "output_files") && !file.originalname.endsWith(".zip")
        ) {
            return cb(new Error("Solo se permiten archivos ZIP para los inputs y outputs"))
        }

        cb(null, true)
    }
}).fields([
    { name: "wording_file", maxCount: 1 },
    { name: "input_files", maxCount: 1 },
    { name: "output_files", maxCount: 1 }
]);
