# Ride Booking System

## Student Information

- **Student ID**: WEB7-4436
- **Assignment Variant**: Ride Booking System

This project implements a secure, scalable, and role-based backend API for a ride booking system, similar to popular platforms like Uber and Pathao, using **Express.js** and **Mongoose**. The system allows riders to request rides, drivers to accept and complete them, and admins to manage the overall system. The application includes a JWT-based authentication system, role-based authorization, and various features to manage riders, drivers, and ride histories effectively.

## Project Overview

The API is designed with a modular structure to ensure clean and maintainable code. It provides the following features:

- JWT-based login system with three roles: **Admin**, **Rider**, and **Driver**.
- Secure password hashing using **bcrypt**.
- Ride request management and lifecycle.
- Role-based route protection to restrict access to certain actions based on the user's role.
- CRUD operations for ride management and history.
- Ability for admins to approve/suspend drivers, manage users, and generate reports.

## Functional Requirements

### Authentication & Authorization

- Implemented JWT-based login system.
- Three user roles: **Admin**, **Rider**, and **Driver**.
- Secure password hashing using **bcrypt**.

### Riders

- Request a ride with pickup and destination location.
- Cancel a ride within an allowed window.
- View the ride history.

### Drivers

- Accept or reject ride requests.
- Update ride status (e.g., _Picked Up_ → _In Transit_ → _Completed_).
- View earnings history.
- Set availability status (Online/Offline).

### Admins

- View all users, drivers, and rides.
- Approve or suspend drivers.
- Block or unblock user accounts.
- Optional: Generate reports.

### Rides

- All rides are stored with complete history.
- Ride lifecycle: Requested → Accepted → Picked Up → In Transit → Completed.
- Role-based access to ride management: Only drivers and admins can change ride status.

### Role-Based Route Protection

- Implemented middleware to ensure that each role can only access the endpoints they are authorized for:
  - **Riders** can request and view rides.
  - **Drivers** can accept, reject, and update the status of rides.
  - **Admins** can manage users and approve/suspend drivers.

# API Endpoints

## Authentication Routes

- **POST /login**: Login with credentials.
- **POST /refresh-token**: Get a new access token.
- **POST /logout**: Logout from the application.
- **POST /reset-password**: Reset password (Admin and Super Admin only).

## Driver Routes

- **POST /create**: Create a new driver (Admin/Super Admin only).
- **GET /**: Get all drivers.
- **GET /:driverSlug**: Get a single driver by slug.
- **PATCH /:id**: Update a driver (Admin/Super Admin only).
- **DELETE /:id**: Delete a driver (Admin/Super Admin only).
- **POST /:riderSlug/accept-ride**: Accept a ride request (Admin/Super Admin/Driver).
- **PATCH /ride-status/:driverSlug**: Update ride status (Admin/Super Admin/Driver).
- **GET /:driverSlug/earnings**: View earnings history (Admin/Super Admin/Driver).
- **PATCH /:riderSlug/cancel-ride**: Cancel a ride (Admin/Super Admin/Driver).
- **PATCH /approve-suspend/:driverSlug**: Approve or suspend a driver (Admin/Super Admin only).
- **PATCH /:driverSlug/set-availability**: Set driver availability (Admin/Super Admin/Driver).

## Rider Routes

- **POST /create**: Create a new rider (Admin/Super Admin only).
- **POST /request-ride**: Request a ride (Admin/Super Admin/Rider).
- **PATCH /cancel-ride/:riderSlug**: Cancel a ride (Admin/Super Admin/Rider).
- **GET /ride-history/:riderSlug**: View ride history (Admin/Super Admin/Rider).

## User Routes

- **POST /register**: Register a new user.
- **GET /all-users**: Get all users (Admin/Super Admin only).
- **PATCH /:id**: Update user information (Admin/Super Admin/All roles).

## Technologies Used

- **Node.js** and **Express.js**: For building the backend API and handling HTTP requests.
- **TypeScript**: For writing strongly-typed JavaScript code, enhancing code quality and maintainability.
- **Mongoose**: For MongoDB object modeling and database interaction.
- **JWT (jsonwebtoken)**: For implementing JSON Web Token (JWT)-based authentication and authorization.
- **bcryptjs**: For securely hashing and comparing passwords.
- **zod**: For input validation and schema definition in the backend.
- **Passport.js**: For handling user authentication with support for local strategy.
- **Cookie-parser**: For parsing cookies in incoming HTTP requests.
- **express-session**: For managing user sessions in an Express app.
- **dotenv**: For managing environment variables in a `.env` file.
- **eslint** and **typescript-eslint**: For linting and enforcing code quality standards.
- **http-status-codes**: For using standardized HTTP status codes across the API.
