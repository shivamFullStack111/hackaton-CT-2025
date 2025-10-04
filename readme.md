# SkillSync Project

This repository contains both the frontend and backend for the SkillSync application.

## Setup Instructions

### 1. Frontend Setup

The frontend is built using **React.js** and is managed with **npm**.

#### Steps to run the frontend:
1. Install dependencies:
    ```bash
    npm install
    ```

2. To run the frontend in development mode:
    ```bash
    npm run dev
    ```

This will start the frontend on your local machine (usually on `http://localhost:5173`).

---

### 2. Backend Setup

The backend is built using **Node.js** and **Express.js** with MongoDB as the database. 

#### Steps to run the backend:
1. First, create a `.env` file in the root directory of the backend with the following configuration:

    ```
    MONGOURL=""
    JWT_SECRET=
    GEMINI_API_KEY=
    PERSPECTIVE_API_KEY=
    ```

   - Replace the **MONGOURL** with your MongoDB connection URL.
   - Replace **JWT_SECRET**, **GEMINI_API_KEY**, and **PERSPECTIVE_API_KEY** with your actual values.

2. Install backend dependencies:
    ```bash
    npm install
    ```

3. To run the backend, you can use **nodemon**:
    ```bash
    npx nodemon index.js
    ```

This will start the backend server and it will listen for incoming API requests.

---