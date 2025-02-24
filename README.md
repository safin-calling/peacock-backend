# Peacock Backend

This is the backend for the Peacock application, built with Node.js, Express, and MongoDB. It provides authentication, category subscription, and feed functionalities.

## Table of Contents

- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)

## Features

- User authentication (register and login)
- Category subscription and unsubscription
- Category subscription/unsubscription email notifications
- Feed retrieval based on user's subscribed categories

## API Endpoints

### Authentication

- **POST** `/api/auth/register`: Register a new user
- **POST** `/api/auth/login`: Login a user

### Categories

- **GET** `/api/categories`: Get all categories
- **POST** `/api/categories/subscribe`: Subscribe to a category
- **POST** `/api/categories/unsubscribe`: Unsubscribe from a category

### Feed

- **GET** `/api/feeds`: Get all feeds

## Environment Variables

- `MONGO_URI`: MongoDB connection string
- `PORT`: Port number for the server
- `BCRYPT_SALT_ROUNDS`: Salt rounds for bcrypt hashing
- `JWT_SECRET`: JWT secret key
- `EMAIL_USER`: Email address for sending notifications
- `EMAIL_PASS`: Email password for sending notifications