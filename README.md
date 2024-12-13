# Friends API

## 📖 About the API
The **Friends API** is a service that allows you to manage a list of friends. With it, you can:
- List all friends.
- Search friends by ID or name.
- Add new friends.
- Update existing friends' information.
- Remove friends from the list.

The API is already integrated with a frontend that makes it easier to interact with the endpoints. 🎉

> **Disclaimer:** Complete documentation, including an integrated frontend, will be available soon. Stay tuned! 🚧

---

## 🚀 Technologies Used
- **NestJS** - Modular and scalable backend framework.
- **TypeScript** - A superset of JavaScript with static typing.
- **Swagger** - Interactive API documentation.
- **Prisma** - ORM used for interacting with the MySQL database.
- **Express** - Middleware for handling HTTP requests.

---

## 📂 Folder Structure
```plaintext
backend/
├── src/
│   ├── infra/               # Infrastructure (Database)
│   ├── entitites/           # Entities
│   ├── use-cases/           # Use cases (business logic)
│   ├── repositories/        # Repositories (External layer interaction)
│   ├── types/               # Types and DTOs
│   ├── utils/               # Utilities
│   ├── prisma/              # Prisma configuration and manipulation
│   ├── main.ts              # Application entry point
├── package.json             # Backend dependencies and scripts
├── tsconfig.json            # TypeScript configuration
frontend/                    # Integrated frontend
```

---

## 🔗 API Endpoints
### **Base URL**
```
http://localhost:{PORT}/sinz
```

### **Routes**

#### 📋 List all friends
- **GET** `/friends`
- **Description**: Returns a list of all registered friends.
- **Example Response**:
```json
[
	{
		"data": {
			"id": 1,
			"name": "Jhon Doe",
			"friendLevel": 10,
			"fatLevel": 10,
			"created_at": "2024-12-12T19:47:10.811Z"
		}
	},
	{
		"data": {
			"id": 1,
			"name": "Doe Jhon",
			"friendLevel": 10,
			"fatLevel": 10,
			"created_at": "2024-12-12T19:47:10.811Z"
		}
	}
]
```

#### 🔍 Search friend by ID or Name
- **GET** `/friend`
- **Query Parameters**:
  - `id` (optional): Friend's ID.
  - `name` (optional): Friend's name.
- **Description**: Searches for a friend by ID or name.
- **Example Request**:
```
GET /friend?id=1
```
- **Example Response**:
```json
{
	{
		"data": {
			"id": 1,
			"name": "Jhon Doe",
			"friendLevel": 10,
			"fatLevel": 10,
			"created_at": "2024-12-12T19:47:10.811Z"
		}
	}
}
```

#### ➕ Add a new friend
- **POST** `/new-friend`
- **Body** (JSON):
```json
{
  "name": "Charlie",
  "friendLevel": 7,
  "fatLevel": 1
}
```
- **Description**: Creates a new friend record.
- **Example Response**:
```json
{
  "data": {
    "id": 1,
    "name": "Charlie",
    "friendLevel": 7,
    "fatLevel": 1,
    "created_at": "2024-12-12T19:47:10.811Z"
  }
}
```

#### 🛠️ Update friend information
- **PATCH** `/patch-friend/:id`
- **Body** (JSON):
```json
{
  "friendLevel": 9
}
```
- **Description**: Updates details of an existing friend (Cannot change Name).
- **Example Response**:
```json
{
  "data": {
    "id": 1,
    "name": "Jhon Doe",
    "friendLevel": 9,
    "fatLevel": 10,
    "created_at": "2024-12-12T19:47:10.811Z"
  }
}
```

#### ❌ Remove a friend
- **DELETE** `/delete-friend/:id`
- **Description**: Removes a friend from the system by ID.
- **Example Response (User that have been deleted)**:
```json
{
  "data": {
    "id": 4,
    "name": "Jhon doe",
    "friendLevel": 7,
    "fatLevel": 10,
    "created_at": "2024-12-12T19:47:10.811Z"
  }
}
```

---

## 🛠️ How to Run the Project

### Prerequisites
Make sure you have installed:
- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)
- [NPM](https://www.npmjs.com/)

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/sincezola/Friends-CRUD.git
   ```
2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Configure the database in the `.env` file:
   ```env
   DATABASE_URL=mysql://user:password@localhost:3306/database_name
   ```
4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```
5. Start the backend server:
   ```bash
   npm run start:dev
   ```
6. Start the frontend:
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

---

## 🖥️ Interactive Documentation
Access the Swagger documentation at:
```
http://localhost:{PORT}/api-docs
```

---

## 🤝 Contributions
Contributions are welcome! Feel free to open issues or pull requests with improvements or fixes.

---

## 📝 License
This project is under the [MIT](LICENSE) license.
