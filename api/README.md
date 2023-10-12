# Strongylodon Backend 💾

### Auth 🔐
| Method     | Endpoint                        | Description                 | Auth (JWT) | Body                                            | Query
|------------|---------------------------------|-----------------------------|------------|-------------------------------------------------|-----
| POST       | `/api/auth/register`         | Register new users.         | ❌         | { "username": "", "email": "", "password":"" }  | -
| POST       | `/api/auth/login`            | Auth by credentials.        | ❌         | { "username": "", "password": "" }              | -
| GET        | `/api/auth/renew_session`            | Auth by JWT.                | ✔          | -                                               | -
| GET        | `/api/auth/logout`           | Logout account.             | ✔          | -                                               | -

### Expenses 💸
| Method     | Endpoint                        | Description                 | Auth (JWT) | Body                                            | Query 
|------------|---------------------------------|-----------------------------|------------|-------------------------------------------------|------
| GET        | `/api/expense/get`         | Get all expenses of the logged user.         | ✔         |  - | -
| POST       | `/api/expense/create`      | Create a new expense.        | ✔          | { "title": "", "description": "", "amount": 0, "date": null, "expenseCategoryId": null } | -
| PUT        | `/api/expense/update`      | Update an existing expense.                | ✔          | { "title": "", "description": "", "amount": 0, "date": null, "expenseCategoryId": null } | id
| DELETE     | `/api/expense/delete`      | Delete an expense.             | ✔          | -                                               | id

### Categories 📂
| Method     | Endpoint                        | Description                 | Auth (JWT) | Body                                            | Query 
|------------|---------------------------------|-----------------------------|------------|-------------------------------------------------|------
| GET        | `/api/category/get`         | Get all categories of the logged user.         | ✔         |  - | -
| POST       | `/api/category/create`      | Create a new category.        | ✔          | { "title": "" }| -
| PUT        | `/api/category/update`      | Update an existing category.                | ✔          | { "title": "" } | id
| DELETE     | `/api/category/delete`      | Delete a category.             | ✔          | -                                               | id

### Statistics 📊
| Method     | Endpoint                        | Description                 | Auth (JWT) | Body                                            | Query 
|------------|---------------------------------|-----------------------------|------------|-------------------------------------------------|------
| GET        | `/api/statistic/get`         | Get statistics of the logged user.         | ✔         |  - | -
| PUT        | `/api/statistic/add_amount`      | Add new amount of cash.     | ✔          | { "amount": "" }| id
| PUT        | `/api/statistic/edit_amount`      | Edit amount of cash.      | ✔          | { "amount": "" }| id
