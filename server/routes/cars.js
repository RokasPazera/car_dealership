import express from 'express';
import {createCars, deleteCar, getAllCars, updateCar} from "../controllers/carController.js";
import {verifyToken} from "../middlewares/verifyToken.js";
import {verifyAdmin} from "../middlewares/verifyAdmin.js";

const carRouter = express.Router();

carRouter.get("/", verifyToken, getAllCars);
carRouter.post("/", verifyToken, verifyAdmin, createCars);
carRouter.put("/:id", verifyToken, verifyAdmin, updateCar);
carRouter.delete("/:id", verifyToken, verifyAdmin, deleteCar);

export {carRouter};