# MyExpenses Backend 💾

### Auth 🔐
| Method     | Endpoint                        | Description                 | Auth (JWT) | Body                                            |
|------------|---------------------------------|-----------------------------|------------|-------------------------------------------------|
| POST       | `/api/auth/register`         | Register new users.         | ❌         | { "username": "", "email": "", "password":"" }  |
| POST       | `/api/auth/login`            | Auth by credentials.        | ❌         | { "username": "", "password": "" }              |
| GET        | `/api/auth/renew`            | Auth by JWT.                | ✔          | -                                               |
| GET        | `/api/auth/logout`           | Logout account.             | ✔          | -                                               |