import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Middleware base: verifica que el usuario ha enviado un token válido
 */
export function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Token no proporcionado o expirado" });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: "La sesión ha expirado. Vuelve a iniciar sesión." });
        }

        req.user = user;
        next();
    });
}
