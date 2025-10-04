# User CRUD Backend API

A comprehensive NestJS backend API for user management and product CRUD operations with authentication, file upload, and security features.

## Features

- 🔐 **Authentication & Authorization**
  - JWT-based authentication
  - Refresh token mechanism
  - Password hashing with bcrypt
  - Protected routes with guards

- 👤 **User Management**
  - User registration and login
  - Profile management
  - User statistics

- 📦 **Product Management**
  - Full CRUD operations
  - Product search and filtering
  - Pagination support
  - User-specific products

- 📁 **File Upload**
  - Image upload with Multer
  - Image processing with Sharp
  - File validation and security

- 🛡️ **Security Features**
  - Rate limiting
  - Security headers
  - Input validation
  - CORS configuration

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/refresh` - Refresh access token
- `POST /api/v1/auth/logout` - Logout user

### Users
- `GET /api/v1/users/me` - Get current user profile
- `PUT /api/v1/users/me` - Update user profile
- `DELETE /api/v1/users/me` - Delete user account
- `GET /api/v1/users/me/stats` - Get user statistics

### Products
- `GET /api/v1/products` - Get user's products (with pagination)
- `GET /api/v1/products/:id` - Get single product
- `POST /api/v1/products` - Create product
- `PUT /api/v1/products/:id` - Update product
- `DELETE /api/v1/products/:id` - Delete product
- `GET /api/v1/products/stats/overview` - Get product statistics

### File Upload
- `POST /api/v1/products/:id/upload` - Upload product image
- `DELETE /api/v1/products/:id/images/:filename` - Delete product image

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp env.example .env
```

3. Configure your database and other settings in `.env`

4. Run the application:
```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

## Environment Variables

See `env.example` for all required environment variables including:
- MongoDB database configuration
- JWT secrets
- File upload settings
- Security settings
- CORS configuration

### MongoDB Setup

Make sure you have MongoDB running locally or use MongoDB Atlas:

```bash
# Local MongoDB
mongod

# Or use MongoDB Atlas connection string in .env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/user_crud_db
```

## Documentation

API documentation is available at `/api/docs` when running the application.

## Security

- Password hashing with bcrypt
- JWT token authentication
- Rate limiting
- Security headers
- Input validation
- File upload validation
- CORS protection
