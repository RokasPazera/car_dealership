import db from './db.js';

export const databaseCreateCar = (brand, make, year, mileage, price, description, img) => {
    const sql = db.prepare(`INSERT INTO cars (brand, make, year, mileage, price, description, img) VALUES (?, ?, ?, ?, ?, ?, ?)`);
    sql.run(brand, make, year, mileage, price, description, img);
};

export const databaseGetCars = () => {
    return db.prepare(`SELECT * FROM cars`).all();
};

export const databaseUpdateCar = (id, brand, make, year, mileage, price, description, img) => {
    const sql = db.prepare(`UPDATE cars SET brand = ?, make = ?, year = ?, mileage = ?, price = ?, description = ?, img = ? WHERE id = ?`);
    sql.run(brand, make, year, mileage, price, description, img, id)
};

export const databaseDeleteCar = (id) => {
    const sql = db.prepare(`DELETE FROM cars WHERE id = ?`);
    sql.run(id);
};

export default {databaseCreateCar, databaseGetCars, databaseUpdateCar, databaseDeleteCar};