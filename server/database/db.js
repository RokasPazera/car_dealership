import Database from 'better-sqlite3'

let db = Database('./database/app.db');


const createCarDatabase = () => {
    db.exec(`CREATE TABLE IF NOT EXISTS cars (
            car_id INTEGER PRIMARY KEY AUTOINCREMENT,
            brand VARCHAR(30) NOT NULL,
            make VARCHAR(20) NOT NULL,
            year INTEGER NOT NULL,
            mileage INTEGER NOT NULL,
            price INTEGER NOT NULL,
            likes INTEGER NOT NULL DEFAULT 0,
            description STRING NOT NULL,
            img STRING NOT NULL)`);
};

const createUserDatabase = () => {
    db.exec(`CREATE TABLE IF NOT EXISTS users (
            user_id INTEGER PRIMARY KEY AUTOINCREMENT,
            username VARCHAR(20) NOT NULL,
            email VARCHAR(50) NOT NULL UNIQUE,
            password VARCHAR(20) NOT NULL,
            isAdmin BOOLEAN NOT NULL)`);
};

const createFavouritesDatabase = () => {
    db.exec(`CREATE TABLE IF NOT EXISTS favourites (
            favourites_id INTEGER PRIMARY KEY AUTOINCREMENT,
            car_id INTEGER,
            user_id INTEGER,
            FOREIGN KEY (car_id) REFERENCES cars(car_id),
            FOREIGN KEY (user_id)  REFERENCES users(user_id))`);
}


const carDummyData = () => {
    const data = [
        {
            brand: "BMW",
            make: "330i",
            year: 2018,
            mileage: 300000,
            price: 9800,
            likes: 0,
            description: "Well-maintained 2018 BMW 330i. Runs great with 300,000 km. Powerful turbo engine, smooth drive, and loaded with luxury features. Asking $9,800. A great deal for BMW lovers!",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWTYmFGUcrijaR5Uvk5VWs9uJMR9yauhrvMQ&s"
        },
        {
            brand: "BMW",
            make: "M5",
            year: 2014,
            mileage: 220000,
            price: 15000,
            likes: 0,
            description: "2014 BMW M5 in great condition! 220,000 km but still delivers incredible performance with its powerful V8 engine. Well-maintained luxury sports sedan. Asking $15,000 — don't miss out!",
            img: "https://carsguide-res.cloudinary.com/image/upload/f_auto,fl_lossy,q_auto,t_default/v1/editorial/BMW-m5-(11).jpg"
        },
    ]

    const insertData = db.prepare(`INSERT INTO cars (brand, make, year, mileage, price, likes, description, img) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);

    data.forEach((car) => {
        insertData.run(car.brand, car.make, car.year, car.mileage, car.price, car.likes, car.description, car.img);
    });
}

const userDummyData = () => {
    const userData = [
        {
            username: "admin",
            email: "admin@gmail.com",
            password: "$2a$10$x9/cwbWqxHhKZuBmd08Js.vPV1gZRhXSm7qUZCr2v9R07bttsalo6",
            isAdmin: 1,
        },
        {
            username: "test2",
            email: "test2@gmail.com",
            password: "$2a$10$x9/cwbWqxHhKZuBmd08Js.vPV1gZRhXSm7qUZCr2v9R07bttsalo6",
            isAdmin: 0,
        },
    ]

    const insertData = db.prepare(`INSERT INTO users (username, email, password, isAdmin) VALUES (?, ?, ?, ?)`);

    userData.forEach((user) => {
        insertData.run(user.username, user.email, user.password, user.isAdmin);
    });
}


createCarDatabase();
createUserDatabase();
createFavouritesDatabase();



//userDummyData();
//carDummyData();
export default db;