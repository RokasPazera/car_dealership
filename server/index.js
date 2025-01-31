import express from 'express';
import {createCar, getCars, updateCar, deleteCar} from "./database/crud.js";
const app = express()
const port = 3000

app.get('/cars', (req, res) => {
    getCars((err, rows) => {
        if(err){
            res.status(500).send(err.message);
        }else{
            res.status(200).json(rows);
        }
    })
})

app.post('/cars', (req, res) => {
    const {id, brand, make, year, mileage, price, likes, description, img} = req.body;
    createCar(id, brand, make, year, mileage, price, likes, description, img, (err, data) => {
        if(err){
            res.status(500).send(err.message);
        }else{
            res.status(201).send(`car is added with id:  ${data.id}`);
        }
    })
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})