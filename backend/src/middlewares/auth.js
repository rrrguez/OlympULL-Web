import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Middleware base: verifica que el usuario ha enviado un token válido
 */
export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Token inválido" });
    }

    req.user = user; // <- hacemos disponible los datos del usuario
    next();
  });
}

/**
 * Middleware: solo permite acceso a ADMIN
 */
export function isAdmin(req, res, next) {
  if (!req.user || req.user.type !== "ADMIN") {
    return res.status(403).json({ error: "Acceso solo para administradores" });
  }
  next();
}

/**
 * Middleware: solo permite acceso a ORGANIZER
 */
export function isOrganizer(req, res, next) {
  if (!req.user || req.user.type !== "ORGANIZER") {
    return res.status(403).json({ error: "Acceso solo para organizadores" });
  }
  next();
}

