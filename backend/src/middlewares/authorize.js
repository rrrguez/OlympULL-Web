export function authorize(allowedTypes = []) {
    return (req, res, next) => {
        if (!allowedTypes.includes(req.user.type)) {
            return res.status(403).json({ error: "No tienes permisos" });
        }
        next();
    };
}
