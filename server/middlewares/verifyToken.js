import jwt from "jsonwebtoken";
import {databaseGetUser} from "../database/userDatabase.js";


export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);

    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, async (err, person) => {
        if(err) return res.status(401).json({message: "invalid token"});

        const user = await databaseGetUser(person.email);
        if(!user) return res.status(401).json({message: "invalid token"});

        req.user = {
            id: user.id,
            email: user.email,
            isAdmin: user.isAdmin,
        };

        next();
    })
}