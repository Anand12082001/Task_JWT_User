# JWT Bearer Authentication (Node.js + Express + Mongoose)

A simple Node.js API that demonstrates user authentication and authorization using **JWT Bearer tokens**, following the **MVC pattern**.

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- Postman (for testing and API docs)

## Features

- User registration with hashed passwords
- User login with JWT generation
- Bearer token–based authentication middleware
- Protected route to fetch current user profile
- Proper error handling and validation
- MVC folder structure

## Project Structure

```bash
src/
  config/
    db.js
  controllers/
    authController.js
  middlewares/
    authMiddleware.js
  models/
    User.js
  routes/
    authRoutes.js
    userRoutes.js
  views/
  utils/
    errorHandler.js
  app.js
