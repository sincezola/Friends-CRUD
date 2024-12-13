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
    "id": 1,
    "name": "Alice",
    "friendLevel": 5,
    "fatLevel": 2
  },
  {
    "id": 2,
    "name": "Bob",
    "friendLevel": 8,
    "fatLevel": 3
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
  "id": 1,
  "name": "Alice",
  "friendLevel": 5,
  "fatLevel": 2
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
  "message": "Friend created successfully",
  "friend": {
    "id": 3,
    "name": "Charlie",
    "friendLevel": 7,
    "fatLevel": 1
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
- **Description**: Updates details of an existing friend.
- **Example Response**:
```json
{
  "message": "Friend updated successfully",
  "friend": {
    "id": 1,
    "name": "Alice",
    "friendLevel": 9,
    "fatLevel": 2
  }
}
```

#### ❌ Remove a friend
- **DELETE** `/delete-friend/:id`
- **Description**: Removes a friend from the system by ID.
- **Example Response**:
```json
{
  "message": "Friend deleted successfully"
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
   git clone https://github.com/your-username/your-repository.git
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
