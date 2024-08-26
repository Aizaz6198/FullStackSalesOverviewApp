# Fullstack Assignment - RapidQuest

==========================

## Table of Contents

1. Project Overview
2. Technologies Used
4. Getting Started
5. Prerequisites
6. Installation
7. Backend
8. Running the Backend
9. Frontend
10. Running the Frontend


## Project Overview

Your mission, should you choose to accept it, will be to build a data visualization web application that can analyze e-commerce data from a sample Shopify store stored in MongoDB. You will build an API layer that reads the data from the database and performs the necessary queries to manipulate data and serve it to the front end through a REST API. The front end should connect to your API and visualize the data using Chart.js or a similar JavaScript visualization library.

## Technologies Used

- **Frontend:**
  - React
  - Axios
  - React Toastify (for notifications)
  - CSS for styling
  - React-icons
  - Chart.js
  
- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (Mongoose for ORM)

## Getting Started

### Prerequisites

- **Node.js** and **npm** installed on your machine.
- **MongoDB** installed and running.
- **Git** installed on your machine.

### Installation

1. **Clone the repository:**

git clone 

cd RapidQuest_Assignment

2. **Install dependencies for frontend and backend:**

   - **Frontend:**
     cd frontend

     npm install

   - **Backend:**

     cd backend

     npm install


## Backend


### Running the Backend

To start the backend server:

1. **Ensure MongoDB is running on your machine.**
2. **Start the backend server:**
3. **Don't forget to create .env file in backend folder set MongoURI and PORT NO.**

   cd backend
   npm start

The backend will be running on `http://localhost:5000`.

## Frontend

### Running the Frontend

To start the frontend development server:

cd frontend
npm run dev

The frontend will be accessible on `http://localhost:5173`.
