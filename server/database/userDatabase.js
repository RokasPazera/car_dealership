import db from './db.js'

export const databaseCreateUser = (username, email, password, isAdmin) => {
    const sql = db.prepare(`INSERT INTO users (username, email, password, isAdmin) VALUES (?, ?, ?, ?)`);
    sql.run(username, email, password, isAdmin);
}

export const databaseGetUser = (email) => {
    return db.prepare(`SELECT * FROM users WHERE email = ?`).get(email);
}

export const databaseUpdateUser = (id, username, email) => {
    const sql = db.prepare(`UPDATE users SET username = ?, email = ? WHERE id = ?`);
    sql.run(username, email, id);
}

export const databaseDeleteUser = (id) => {
    const sql = db.prepare(`DELETE FROM users WHERE id = ?`);
    sql.run(id);
}