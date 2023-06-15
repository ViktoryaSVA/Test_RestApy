## API_Exchange

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run bild
$ npm start

```

## Configure .env file
You should create the Postgres db and configure the .env file with that date.
```bash
POSTGRES_USER='some user'

POSTGRES_PASSWORD='some password'

POSTGRES_DB='some db name'
```

# Examples of requests
### POST
```bash
http://localhost:8000/register
```
### Example of body
```
{
    "name": "Nikhil",
    "salary": "110000",
    "currency": "USD",
    "on_contract": "true",
    "department": "Engineering",
    "sub_department": "Platform",
    "password": "123"
}
```

### Example of result
```bash
{
    "message": "Користувач успішно зареєстрований",
    "user": {
        "id": 3,
        "name": "Nikhil",
        "password": "123",
        "salary": "110000",
        "currency": "USD",
        "department": "Engineering",
        "sub_department": "Platform",
        "on_contract": "true"
    }
}
```

### Login
### POST
```bash
http://localhost:8000/login
```

### Example of body
```
{
    "username": "Anurag",
    "password": "123"
}
```

### Example of result
```bash
{
    "message": "Успішний вхід",
    "user": {
        "id": 1,
        "name": "Anurag",
        "password": "123",
        "salary": "90000",
        "currency": "USD",
        "department": "Banking",
        "sub_department": "Loan",
        "on_contract": "true"
    }
}
```


### Update
### PUT
```bash
http://localhost:8000/update
```

### Example of body
```
{
    "id": 3,
    "name": "Nikhil",
    "salary": "110000",
    "currency": "USD",
    "on_contract": "true",
    "department": "Engineering",
    "sub_department": "Platform",
    "password": "123"
}
```

### Example of result
```bash
{
    "message": "Користувач успішно оновлений",
    "user": {
        "id": 5,
        "name": "Nikhil",
        "password": "123",
        "salary": "110000",
        "currency": "USD",
        "department": "Engineering",
        "sub_department": "Platform",
        "on_contract": "true"
    }
}
```


### Delete user
### DELETE
```bash
http://localhost:8000/delete
```

### Example of body
```
{
    "id": 2
}
```

### Example of result
```bash
{
    "message": "Користувач успішно видалений",
    "user": {
        "id": 2,
        "name": "Abhishek",
        "password": "123",
        "salary": "145000",
        "currency": "USD",
        "department": "Engineering",
        "sub_department": "Platform",
        "on_contract": null
    }
}
```

### Get user by department
### GET
```bash
http://localhost:8000/getUsersByDepartment
```

### Example of body
```
{
    "department": "Engineering"
}
```

### Example of result
```bash
{
    "message": "Список користувачів отримано",
    "user": [
        {
            "id": 3,
            "name": "Nikhil",
            "password": "123",
            "salary": "110000",
            "currency": "USD",
            "department": "Engineering",
            "sub_department": "Platform",
            "on_contract": "true"
        }
    ]
}
```



### Get user by sub_department
### GET
```bash
http://localhost:8000/getUsersBySubDepartment
```

### Example of body
```
{
    "sub_department": "Platform"
}
```

### Example of result
```bash
{
    "message": "Список користувачів отримано",
    "user": [
        {
            "id": 2,
            "name": "Abhishek",
            "password": "123",
            "salary": "145000",
            "currency": "USD",
            "department": "Engineering",
            "sub_department": "Platform",
            "on_contract": null
        },
        {
            "id": 3,
            "name": "Nikhil",
            "password": "123",
            "salary": "110000",
            "currency": "USD",
            "department": "Engineering",
            "sub_department": "Platform",
            "on_contract": "true"
        }
    ]
}
```

### Get user by sub_department
### GET
```bash
http://localhost:8000/getUsersWithContract
```

### Example of body
```
{
    "on_contract": true
}
```

### Example of result
```bash
{
    "message": "Список користувачів отримано",
    "user": [
        {
            "id": 3,
            "name": "Nikhil",
            "password": "123",
            "salary": "110000",
            "currency": "USD",
            "department": "Engineering",
            "sub_department": "Platform",
            "on_contract": "true"
        },
     ]
}
```
