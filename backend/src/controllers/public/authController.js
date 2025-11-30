import jwt from "jsonwebtoken";
import Users from "../../models/usersModel.js";

export async function login(req, res) {
    console.log(process.env.JWT_SECRET);
    const { username, password } = req.body;

    const user = await Users.findOne({ username });

    if (!user || user.password !== password) {
        return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const token = jwt.sign(
        { username: user.username, type: user.type },
        process.env.JWT_SECRET,
        { expiresIn: "6h" }
    );

    res.json({ token, type: user.type, usarname: user.username });
}
