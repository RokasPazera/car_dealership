import express from 'express';
import {userCreation, deleteUser, getUser, updateUser} from "../controllers/userController.js";
import {verifyToken} from "../middlewares/verifyToken.js";

const userRouter = express.Router();

userRouter.post('/', userCreation);
userRouter.get('/', verifyToken, getUser);
userRouter.put('/:id', verifyToken, updateUser);
userRouter.delete('/:id', verifyToken, deleteUser);

export {userRouter};