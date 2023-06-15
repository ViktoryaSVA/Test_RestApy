const { register, login, updateUser, deleteUser, getUsersByDepartment, getUsersBySubDepartment, getUsersWithContract } = require('../services/UserService');

describe('User Registration', () => {
    test('should register a new user', async () => {
        const newUser = {
            name: 'Anurag',
            password: '12345',
            salary: 9000,
            currency: 'USD',
            department: 'Banking',
            sub_department: 'Loan',
            on_contract: true,
        };

        const result = await register(newUser);

        expect(result.success).toBe(true);
        expect(result.message).toBe('Користувач успішно зареєстрований');
        expect(result.user).toBeDefined();
        expect(result.user.name).toBe(newUser.name);
    });

    test('should return an error if registration fails', async () => {
        const invalidUser = {
            name: 'Anurag',
        };

        const result = await register(invalidUser);

        expect(result.success).toBe(false);
        expect(result.message).toBe('Помилка реєстрації користувача');
        expect(result.error).toBeDefined();
    });
});

describe('User Login', () => {
    test('should log in a user with valid credentials', async () => {
        const username = 'Anurag';
        const password = '12345';

        const result = await login(username, password);

        expect(result.success).toBe(true);
        expect(result.message).toBe('Успішний вхід');
        expect(result.user).toBeDefined();
        expect(result.user.name).toBe(username);
    });

    test('should return an error if login fails', async () => {
        const username = 'Anurag';
        const password = 'incorrect_password';

        const result = await login(username, password);

        expect(result.success).toBe(false);
        expect(result.message).toBe('Неправильні дані для входу');
    });
});

describe('User Update', () => {
    test('should update a user with valid data', async () => {
        const updatedUser = {
            name: 'Anurag',
            password: '1235',
            salary: 6000,
            currency: 'USD',
            department: 'Banking',
            sub_department: 'Loan',
            on_contract: true, // Fixed the value to boolean
        };

        const result = await updateUser(updatedUser);

        expect(result.success).toBe(true);
        expect(result.message).toBe('Користувач успішно оновлений');
        expect(result.user).toBeDefined();
        expect(result.user.name).toBe(updatedUser.name);
    });

    test('should return an error if update fails', async () => {
        const invalidUser = {};

        const result = await updateUser(invalidUser);

        expect(result.success).toBe(false);
        expect(result.message).toBe('Помилка оновлення користувача');
        expect(result.error).toBeDefined();
    });
});

test('Should retrieve users by valid department', async () => {
    const department = 'IT';

    const result = await getUsersByDepartment(department);

    expect(result.success).toBe(true);
    expect(result.message).toBe('Список користувачів отримано');
    expect(result.users).toBeDefined();
    expect(result.users.length).toBeGreaterThan(0);
});

test('Should retrieve users by valid sub-department', async () => {
    const subDepartment = 'Development';

    const result = await getUsersBySubDepartment(subDepartment);

    expect(result.success).toBe(true);
    expect(result.message).toBe('Список користувачів отримано');
    expect(result.users).toBeDefined();
    expect(result.users.length).toBeGreaterThan(0);
});

test('Should retrieve users with valid contract status', async () => {
    const contractStatus = 'true';

    const result = await getUsersWithContract(contractStatus);

    expect(result.success).toBe(true);
    expect(result.message).toBe('Список користувачів отримано');
    expect(result.users).toBeDefined();
    expect(result.users.length).toBeGreaterThan(0);
});