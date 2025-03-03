
---

### **Backend (`backend/README.md`)**
```md
# Task Manager App - Backend (Node.js & Express)

## Overview
A Node.js (Express) backend with MongoDB for task management and user authentication.

## Features
- JWT-based Authentication
- Task Management API (CRUD)
- Secure password hashing with bcrypt
- MongoDB with Mongoose

## Tech Stack
- Node.js & Express
- MongoDB & Mongoose
- JWT for authentication
- bcrypt.js for password security

## Setup & Installation
1. Clone repo: `git clone <your-repo-url> && cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file:
   ```env
   MONGO_URI=mongodb+srv://<db_username>:<db_password>@cluster0.mongodb.net/
   JWT_SECRET=your_random_secret_key
   PORT=5000
