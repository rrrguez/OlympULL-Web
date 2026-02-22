export function authorize(allowedTypes = []) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).jon({ error: "No puedes acceder a esta ruta sin autenticación" })
        }
        if (!allowedTypes.includes(req.user.type)) {
            return res.status(403).json({ error: "No tienes permisos para acceder a esta información" });
        }
        next();
    };
}
