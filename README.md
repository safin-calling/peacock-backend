# Peacock Backend

This is the backend for the Peacock application, built with Node.js, Express, and MongoDB. It provides authentication, category subscription, and feed functionalities.

## Table of Contents

-   [Live Demo](#live-demo)
-   [Features](#features)
-   [API Endpoints](#api-endpoints)
-   [Environment Variables](#environment-variables)
-   [Tech Stack](#tech-stack)

## Live Demo

-   **Base API URL**: [https://peacock-backend.onrender.com](https://peacock-backend.onrender.com)
-   **Postman Collection**: [View Collection](https://www.postman.com/lunar-module-candidate-22737456/my-workspace/collection/rb32uma/peacock?action=share&creator=42555517)

## Features

-   ✅ **User Authentication** (JWT-based Register/Login)
-   ✅ **Category Subscription & Unsubscription**
-   ✅ **Personalized Content Feed** based on user preferences
-   ✅ **Subscription Confirmation Emails** using Nodemailer
-   ✅ **Deployed API** (Render)
-   ✅ (Optional) **Weekly Email Digests** – implemented using node-cron
-   🚧 (Optional) **Payment Integration** – Not implemented

## API Endpoints

### Authentication

-   **POST** `/api/auth/register`: Register a new user
-   **POST** `/api/auth/login`: Login a user

### Categories

-   **GET** `/api/categories`: Get all categories
-   **POST** `/api/categories/subscribe`: Subscribe to a category
-   **POST** `/api/categories/unsubscribe`: Unsubscribe from a category

### Feed

-   **GET** `/api/feeds`: Get personalized content

## Environment Variables

-   `MONGO_URI`: MongoDB connection string
-   `PORT`: Port number for the server
-   `BCRYPT_SALT_ROUNDS`: Salt rounds for bcrypt hashing
-   `JWT_SECRET`: JWT secret key
-   `EMAIL_USER`: Email address for sending notifications
-   `EMAIL_PASS`: Email password for sending notifications

## Tech Stack

-   **Backend**: Node.js, Express.js
-   **Database**: MongoDB + Mongoose
-   **Authentication**: JWT + bcrypt
-   **Email**: Nodemailer + node-cron
-   **Deployment**: Render
-   **API Testing**: Postman
