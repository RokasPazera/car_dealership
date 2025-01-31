import db from './db';

const createCar = (brand, make, year, mileage, price, likes, description, img, callback) => {
    const sql = `INSERT INTO Car (brand, make, year, mileage, price, likes, description, img) VALUES (?, ?)`
    db.run(sql, [brand, make, year, mileage, price, likes, description, img], function(err) {
        callback(err, {id: this.lastID})
    })
}
const getCars = (callback) => {
    const sql = `SELECT * FROM Car`;
    db.all(sql, [], callback);
}

const updateCar = (id, brand, make, year, mileage, price, likes, description, img, callback) => {
    const sql = `UPDATE Car SET brand = ?, make = ?, year = ?, mileage = ?, price = ?, likes = ?, description = ?, img = ? WHERE id = ?`
    db.run(sql, [brand, make, year, mileage, price, likes, description, img, id], callback)
}

const deleteCar = (id, callback) => {
    const sql = `DELETE FROM Car WHERE id = ?`
    db.run(sql, id, callback)
}

module.exports = {createCar, getCars, updateCar, deleteCar}