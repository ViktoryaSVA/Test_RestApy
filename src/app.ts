import * as http from 'http';
import { pool, createTable } from './connectDb';

interface User {
    id: number;
    name: string;
    password: string;
    salary: string;
    currency: string;
    department: string;
    sub_department: string;
    on_contract: string;
}

async function register(body: User): Promise<Record<string, any>> {
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

async function login(username: string, password: string): Promise<Record<string, any>> {
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

async function updateUser(body: User): Promise<Record<string, any>> {
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

async function deleteUser(userId: number): Promise<Record<string, any>> {
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

async function getUsersByDepartment(department: string): Promise<Record<string, any>> {
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

async function getUsersBySubDepartment(sub_department: string): Promise<Record<string, any>> {
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

async function getUsersWithContract(on_contract: string): Promise<Record<string, any>> {
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

const server = http.createServer(async (req, res) => {
    if (req.method === 'POST') {
        if (req.url === '/register') {
            let body = '';

            req.on('data', (chunk) => {
                body += chunk.toString();
            });

            req.on('end', async () => {
                const data = JSON.parse(body);

                await createTable();

                const result = await register(data);

                if (result.success) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: result.message, user: result.user }));
                } else {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: result.message }));
                }
            });
        } else if (req.url === '/login') {
            let body = '';

            req.on('data', (chunk) => {
                body += chunk.toString();
            });

            req.on('end', async () => {
                const { username, password } = JSON.parse(body);

                const result = await login(username, password);

                if (result.success) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: result.message, user: result.user }));
                } else {
                    res.writeHead(401, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: result.message }));
                }
            });
        } else {
            res.statusCode = 404;
            res.end('Not Found');
        }
    } else if (req.method === 'PUT') {
        if (req.url === '/update') {
            let body = '';

            req.on('data', (chunk) => {
                body += chunk.toString();
            });

            req.on('end', async () => {
                const data = JSON.parse(body);

                const result = await updateUser(data);

                if (result.success) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: result.message, user: result.user }));
                } else {
                    res.writeHead(401, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: result.message }));
                }
            });
        }
    } else if (req.method === 'DELETE') {
        if (req.url === '/delete') {
            let body = '';

            req.on('data', (chunk) => {
                body += chunk.toString();
            });

            req.on('end', async () => {
                const { id } = JSON.parse(body);

                const result = await deleteUser(id);

                if (result.success) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: result.message, user: result.user }));
                } else {
                    res.writeHead(401, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: result.message }));
                }
            });
        }
    } else if (req.method === 'GET') {
        if (req.url === '/getUsersByDepartment') {
            let body = '';

            req.on('data', (chunk) => {
                body += chunk.toString();
            });

            req.on('end', async () => {
                const { department } = JSON.parse(body);

                const result = await getUsersByDepartment(department);

                if (result.success) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: result.message, user: result.users }));
                } else {
                    res.writeHead(401, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: result.message }));
                }
            });
        } else if (req.url === '/getUsersBySubDepartment') {
            let body = '';

            req.on('data', (chunk) => {
                body += chunk.toString();
            });

            req.on('end', async () => {
                const { sub_department } = JSON.parse(body);

                const result = await getUsersBySubDepartment(sub_department);

                if (result.success) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: result.message, user: result.users }));
                } else {
                    res.writeHead(401, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: result.message }));
                }
            });
        } else if (req.url === '/getUsersWithContract') {
            let body = '';

            req.on('data', (chunk) => {
                body += chunk.toString();
            });

            req.on('end', async () => {
                const { on_contract } = JSON.parse(body);

                const result = await getUsersWithContract(on_contract);

                if (result.success) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: result.message, user: result.users }));
                } else {
                    res.writeHead(401, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: result.message }));
                }
            });
        }
    } else {
        res.statusCode = 404;
        res.end('Not Found');
    }
});

const PORT = 8000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
