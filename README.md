# Task Manager MERN Stack Application

A full-stack Task Manager application built with the ERN stack (Express, React, Node.js) using an in-memory data store.

## Features

- Create, read, update, and delete tasks
- Task model with title, description, status, and timestamps
- Modern React frontend with Bootstrap for styling
- RESTful API backend with Express
- In-memory data storage (no database required)

## Project Structure

```
task-manager/
  ├── backend/             # Express server and API
  │   ├── models/          # In-memory data store
  │   ├── routes/          # API routes for tasks
  │   ├── server.js        # Express application main file
  │   └── .env             # Environment variables
  │
  ├── frontend/            # React frontend application
      ├── public/
      └── src/
          ├── components/  # React components
          ├── services/    # API service for backend communication
          ├── App.js       # Main React component
          └── index.js     # React entry point
```

## Prerequisites

- Node.js (v14 or later)
- npm or yarn

## Installation and Setup

### 1. Clone the repository

```
git clone <repository-url>
cd task-manager
```

### 2. Backend Setup

```
cd backend
npm install
```

Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
```

### 3. Frontend Setup

```
cd ../frontend
npm install
```

### 4. Run the Application

#### Development Mode

Start the backend server:
```
cd backend
npm run dev
```

Start the frontend development server:
```
cd frontend
npm start
```

The frontend will be available at http://localhost:3000 and will connect to the backend API at http://localhost:5000.

#### Production Mode

Build the frontend:
```
cd frontend
npm run build
```

Start the backend server (which will serve the frontend build files):
```
cd backend
npm start
```

The application will be available at http://localhost:5000.

## API Endpoints

- `GET /tasks` - Get all tasks
- `GET /tasks/:id` - Get a specific task by ID
- `POST /tasks` - Create a new task
- `PUT /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task

## Task Model

- `id`: auto-generated
- `title`: string, required
- `description`: string, optional
- `status`: enum - pending, in-progress, completed
- `created_at`: timestamp
- `updated_at`: timestamp

## Future Enhancements

- User authentication
- Task categories/labels
- Task due dates
- Mobile responsiveness improvements
- Task search and filtering

## License

This project is licensed under the ISC License. 