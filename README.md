# Student Task Manager

Student Task Manager is a React coursework project for managing university tasks.  
The application includes login, register, routing, forms, hooks and REST API requests using json-server.

## Main Functionalities

- Home page
- Login form
- Register form
- Simple authentication with localStorage
- Navigation bar
- Dashboard page
- Load tasks from REST API
- Add new task
- Edit existing task
- Delete task
- Data stored in db.json using json-server

## Technologies Used

- React
- Vite
- React Router
- JavaScript
- CSS
- json-server
- GitHub

## REST API

The project uses json-server as a mock backend.

Main API endpoints:

```text
GET    /tasks
POST   /tasks
PUT    /tasks/:id
DELETE /tasks/:id

GET    /users
POST   /users
How to Run the Project

First install the dependencies:

npm install

Start the REST API server:

npm run server

Open a second terminal and start the React application:

npm run dev

Then open:

http://localhost:5173/
Test User

You can register a new user from the Register page.

Example user from db.json:

Email: viktor@example.com
Password: 123456
Project Structure
src
├── components
│   └── Navbar.jsx
├── pages
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   └── Dashboard.jsx
├── App.jsx
├── App.css
└── main.jsx
Author

Viktor Stankov