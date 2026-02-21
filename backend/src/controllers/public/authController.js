import jwt from "jsonwebtoken";
import * as model from "../../models/usersModel.js";

export const login = async (req, res) => {
    const { id, password } = req.body;

    const result = await model.getById(id);
    const user = result.rows[0];

    if (!user || user.password !== password) {
        return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const token = jwt.sign(
        { id: user.id, type: user.type },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    res.json({ token, type: user.type, id: user.id });
}
