import {databaseCreateUser, databaseDeleteUser, databaseGetUser, databaseUpdateUser} from "../database/userDatabase.js";
import bcrypt from "bcrypt";

const checkIfValid = (username, email) => {
    if (!username) {
        return {error: "Username is required"};
    }

    if (!email) {
        return {error: "Email is required"};
    }
}

export const userCreation = async (req, res) => {
    const {username, email, password, password_confirmation} = req.body;

    checkIfValid(username, email);

    if(databaseGetUser(email)){
        return res.status(401).json({error: "Email is already in use"});
    }

    if (!password || !password_confirmation) {
        return res.status(400).json({error: "Password is required"});
    }

    if(password !== password_confirmation) {
        return res.status(400).json({error: "Passwords do not match"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const isAdmin = 0;

    databaseCreateUser(username, email, hashedPassword, isAdmin);

    res.status(201).json({username: username, email: email});
}

export const getUser = (req, res) => {
    const email = req.body.email;
    if (!email) {
        return res.status(400).json({error: "email is required"});
    }

    const user = databaseGetUser(email);

    res.status(200).json(user);
}

export const updateUser = async (req, res) => {
    const id = req.params.id;
    const {username, email} = req.body;

    checkIfValid(username, email);

    if (!id) {
        return res.status(400).json({error: "ID is required"});
    }

    databaseUpdateUser(id, req.body);

    res.status(200).json({username: username, email: email});
}

export const deleteUser = async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({error: "ID is required"});
    }

    databaseDeleteUser(id);

    res.status(200).json({success: true});
}