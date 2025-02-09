import {databaseGetUser} from "../database/userDatabase.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const handleLogin = async (req, res) => {
    const {email, password} = req.body;

    const user = databaseGetUser(email);

    if (!user) return res.status(401).json({error: "invalid credentials"});

    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(401).json({error: "invalid credentials"});

    const token = jwt.sign(
        {
            id: user.user_id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET,
    );
    res.status(200).json({token});
}