import * as http from 'http';

import { createTable } from './connectDb';
import { register, login, updateUser, deleteUser, getUsersByDepartment, getUsersBySubDepartment, getUsersWithContract } from "./services/UserService";

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
