import { User } from "../models/User";
import { pool } from "../connectDb";

export async function register(body: User): Promise<Record<string, any>> {
    try {
        const client = await pool.connect();
        const result = await client.query(
            'INSERT INTO users (name, password, salary, currency, department, sub_department, on_contract) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [
                body.name,
                body.password,
                body.salary,
                body.currency,
                body.department,
                body.sub_department,
                body.on_contract
            ]
        );
        client.release();

        const newUser = result.rows[0];
        return { success: true, message: 'Користувач успішно зареєстрований', user: newUser };
    } catch (error: any) {
        return { success: false, message: 'Помилка реєстрації користувача', error: error.message };
    }
}

export async function login(username: string, password: string): Promise<Record<string, any>> {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM users WHERE name = $1 AND password = $2', [username, password]);
        client.release();

        const user = result.rows[0];
        if (user) {
            return { success: true, message: 'Успішний вхід', user: user };
        } else {
            return { success: false, message: 'Неправильні дані для входу' };
        }
    } catch (error: any) {
        return { success: false, message: 'Помилка входу користувача', error: error.message };
    }
}

export async function updateUser(body: User): Promise<Record<string, any>> {
    try {
        const client = await pool.connect();
        const result = await client.query(
            'INSERT INTO users (name, password, salary, currency, department, sub_department, on_contract) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [
                body.name,
                body.password,
                body.salary,
                body.currency,
                body.department,
                body.sub_department,
                body.on_contract
            ]
        );
        client.release();

        const updatedUser = result.rows[0];
        return { success: true, message: 'Користувач успішно оновлений', user: updatedUser };
    } catch (error: any) {
        return { success: false, message: 'Помилка оновлення користувача', error: error.message };
    }
}

export async function deleteUser(userId: number): Promise<Record<string, any>> {
    try {
        const client = await pool.connect();
        const result = await client.query('DELETE FROM users WHERE id = $1 RETURNING *', [userId]);
        client.release();

        if (result.rowCount === 0) {
            return { success: false, message: 'Користувача з таким ідентифікатором не знайдено' };
        }

        const deletedUser = result.rows[0];
        return { success: true, message: 'Користувач успішно видалений', user: deletedUser };
    } catch (error: any) {
        return { success: false, message: 'Помилка видалення користувача', error: error.message };
    }
}

export async function getUsersByDepartment(department: string): Promise<Record<string, any>> {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM users WHERE department = $1', [department]);
        client.release();

        const users = result.rows;
        return { success: true, message: 'Список користувачів отримано', users };
    } catch (error: any) {
        return { success: false, message: 'Помилка отримання користувачів', error: error.message };
    }
}

export async function getUsersBySubDepartment(sub_department: string): Promise<Record<string, any>> {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM users WHERE sub_department = $1', [sub_department]);
        client.release();

        const users = result.rows;
        return { success: true, message: 'Список користувачів отримано', users };
    } catch (error: any) {
        return { success: false, message: 'Помилка отримання користувачів', error: error.message };
    }
}

export async function getUsersWithContract(on_contract: string): Promise<Record<string, any>> {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM users WHERE on_contract = $1', [on_contract]);
        client.release();

        const users = result.rows;
        return { success: true, message: 'Список користувачів отримано', users };
    } catch (error: any) {
        return { success: false, message: 'Помилка отримання користувачів', error: error.message };
    }
}
