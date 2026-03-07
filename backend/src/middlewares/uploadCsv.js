import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve("/app/uploads"));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== "text/csv") {
            return cb(new Error(
                "Los campos 'Archivos de entrada' y 'Archivos de salida' deben ser archivos ZIP"
            ), false);
        }
        cb(null, true);
    },
});

export default upload;
