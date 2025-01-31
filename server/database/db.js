import Database from 'better-sqlite3'

let db = Database('app.db', (err) => {
    if(err){
        console.error(err.message);
    }
    else{
        db.run(`CREATE TABLE IF NOT EXISTS Car (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            brand STRING NOT NULL,
            make STRING NOT NULL,
            year INTEGER NOT NULL,
            mileage INTEGER NOT NULL,
            price INTEGER NOT NULL,
            likes INTEGER NOT NULL,
            description STRING NOT NULL,
            img STRING NOT NULL)`, (err) => {
            if(err){
                console.error(err.message);
            }
        });

    }
});
/*

const data = [
    { brand: "BMW", make: "330i", year: 2018, mileage: 300000, price: 9800, likes: 0, description: "Well-maintained 2018 BMW 330i. Runs great with 300,000 km. Powerful turbo engine, smooth drive, and loaded with luxury features. Asking $9,800. A great deal for BMW lovers!", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWTYmFGUcrijaR5Uvk5VWs9uJMR9yauhrvMQ&s"},
    { brand: "BMW", make: "M5", year: 2014, mileage: 220000, price: 15000, likes: 0, description: "2014 BMW M5 in great condition! 220,000 km but still delivers incredible performance with its powerful V8 engine. Well-maintained luxury sports sedan. Asking $15,000 — don't miss out!", img: "https://carsguide-res.cloudinary.com/image/upload/f_auto,fl_lossy,q_auto,t_default/v1/editorial/BMW-m5-(11).jpg"},
]

const insertData = db.prepare("INSERT INTO Car (brand, make, year, mileage, price, likes, description, img) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");

data.forEach((car) => {
    insertData.run(car.brand, car.make, car.year, car.mileage, car.price, car.likes, car.description, car.img);
});
*/
/*

console.log(cars);*/

const car = db.prepare('SELECT * FROM Car WHERE id= ?').get(1);
console.log(car);

db.close();