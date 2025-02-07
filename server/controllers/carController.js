import {databaseCreateCar, databaseDeleteCar, databaseGetCars, databaseUpdateCar} from "../database/carDatabase.js";

const checkIfValid = (brand, make, year, mileage, price, description, img) => {
    if (!brand) {
        return {error: "Please provide a valid brand"};
    }
    if (!make) {
        return {error: "Please provide a valid make"};
    }
    if (!year) {
        return {error: "Please provide a valid year"};
    }
    if (year > 2025) {
        return {error: "car cannot be made in the future"};
    }
    if (year < 1980) {
        return {error: "car is too old"};
    }
    if (!mileage) {
        return {error: "Please provide a valid mileage"};
    }
    if (!price) {
        return {error: "Please provide a valid price"};
    }
    if (price <= 0) {
        return {error: "price must be more than 0"};
    }
    if (!description) {
        return {error: "Please provide a valid description"};
    }
    if (!img) {
        return {error: "Please provide a valid img"};
    }

}

export const createCars = (req, res) => {
    const {brand, make, year, mileage, price, description, img} = req.body;

    const errorMessage = checkIfValid(brand, make, year, mileage, price, description, img);

    if (errorMessage) {
        databaseCreateCar(brand, make, year, mileage, price, description, img);
        res.status(201).send(`car is added`);
    } else {
        res.status(400).json(errorMessage);
    }

};

export const getAllCars = (req, res) => {
    const cars = databaseGetCars();
    if (!cars) {
        res.status(404).json({error: "no cars found"});
    }
    res.status(200).json(cars);
};

export const updateCar = (req, res) => {
    const id = req.params.id;
    const {brand, make, year, mileage, price, description, img} = req.body;

    if (!id) {
        res.status(404).send('Car not found');
    }

    const errorMessage = checkIfValid(brand, make, year, mileage, price, description, img);

    if (errorMessage) {
        databaseCreateCar(brand, make, year, mileage, price, description, img);
        res.status(201).send(`car is added`);
    } else {
        res.status(400).json(errorMessage);
    }

    databaseUpdateCar(id, brand, make, year, mileage, price, description, img);

    res.status(201).send(`car is updated with id: ` + id);

};

export const deleteCar = (req, res) => {
    const carId = req.params.id;

    if (!carId) {
        res.status(404).send('Car not found');
    }
    databaseDeleteCar(carId);

    res.send();
}