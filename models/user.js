import db from '../clients/db.mysql.js';
import md5 from "md5";
import _ from 'lodash';


export default {
    async getUsersList() {
        const [rows] = await db.query(`SELECT * FROM users`);
        return rows;
     },
    async createUser(body) {
        const values = [body.firstName, body.lastName, body.lowerCaseEmail, body.hashedPassword];

        const [rows] = await db.query(
            `INSERT INTO users (first_name, last_name, email, password) 
         VALUES (?, ?, ?, ?)`,
            values
        );

        const newUser = await this.getProfile(body)

        return {newUser,rows};
    },
    async login(body) {
        const values = [body.lowerCaseEmail];
        const [rows] = await db.query(`
        SELECT * FROM users WHERE email = ?`,
            values
        );

        const user = rows[0];

        if (!user) {
            return { success: false, message: 'Invalid email or password' };
        }

        const hashedPassword = md5(md5(body.password)  + process.env.SECRET);

        if (user.password !== hashedPassword) {
            return { success: false, message: 'Invalid email or password' };
        }

        return { success: true, user: user };
    },
    async getProfile(data) {
        const values = [data.id];
        const [rows] = await db.query(`SELECT * FROM users WHERE email = ? LIMIT 1`, values);

        if (rows.length === 0) {
            return { success: false, message: 'Invalid ID user not found' };
        }
        return _.head(_.head(rows) || null)
    },

    async updateProfile(body) {
        const values = [body.firstName, body.lastName, body.lowerCaseEmail, body.hashedPassword, body.id];

        const [rows] = await db.query(`
            UPDATE users
            SET first_name = ?, last_name = ?, email = ?, password = ?
            WHERE id = ?
            `, values);

        if (rows.affectedRows === 0) {
            return { success: false, message: 'User not found' }
        }

        return { success: true, rows }
    },
    async deleteProfile(body) {
        const values = [body.id];
        const [rows] = await db.query(`DELETE FROM users WHERE id = ?`, values);
        if (rows.affectedRows === 0) {
            return { success: false, message: 'Task not found' }
        }
        return { success: true, rows }
    }

}