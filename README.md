# 🛒 User Product Management App

> **⚠️ LEARNING PROJECT - NOT FOR PRODUCTION USE**
> 
> This is a **learning project** built to understand NestJS, ReactJS, and MongoDB integration. It's designed for educational purposes and should **NOT** be used in production environments.

A simple full-stack project built with NestJS (Backend) and ReactJS (Frontend) where users can:

- Create an account and log in securely 🔐
- Add, edit, and delete products 🧾
- Upload product images 🖼️
- View all their added products with details like name, description, and price 💰

**🎓 This project is specifically designed for learning NestJS and ReactJS integration with MongoDB.**

## 🚀 Tech Stack

- **Frontend**: ReactJS (Vite)
- **Backend**: NestJS
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer (for product images)
- **UI Library**: Tailwind CSS + shadcn/ui
- **State Management**: React Context API

## 📁 Project Structure

```
/user_crud
│
├── backend/                 # NestJS API
│   ├── src/
│   │   ├── auth/            # User login & signup logic
│   │   ├── products/        # Product CRUD APIs
│   │   ├── users/           # User module
│   │   ├── upload/          # File upload handling
│   │   ├── schemas/         # MongoDB schemas
│   │   ├── main.ts          # App entry point
│   │   └── app.module.ts    # Root module
│   ├── .env                 # Environment variables
│   └── package.json
│
├── Frontend/                # ReactJS UI
│   ├── src/
│   │   ├── pages/           # Login, Signup, Home, Product pages
│   │   ├── components/      # Reusable UI components
│   │   ├── contexts/        # React Context for state management
│   │   ├── lib/             # API calls (Axios)
│   │   └── utils/           # Utility functions
│   ├── .env
│   └── package.json
│
└── README.md
```

## ⚙️ Features

- ✅ User Registration & Login
- ✅ Secure JWT Authentication with Refresh Tokens
- ✅ Add / Edit / Delete Product
- ✅ Upload Product Images with Image Processing
- ✅ Display Products with Name, Price, and Image
- ✅ MongoDB Atlas Integration
- ✅ Modern Responsive UI with Tailwind CSS
- ✅ Form Validation with Zod
- ✅ Protected Routes
- ✅ Image Preview and Management
- ✅ Product Search and Filtering

## 🧩 API Endpoints (NestJS)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/register` | Register a new user |
| POST | `/api/v1/auth/login` | Login and get JWT token |
| POST | `/api/v1/auth/refresh` | Refresh access token |
| POST | `/api/v1/auth/logout` | Logout user |
| GET | `/api/v1/auth/me` | Get current user profile |
| GET | `/api/v1/products` | Get all user products |
| POST | `/api/v1/products` | Add new product |
| GET | `/api/v1/products/:id` | Get single product |
| PUT | `/api/v1/products/:id` | Update product details |
| DELETE | `/api/v1/products/:id` | Delete product |
| POST | `/api/v1/products/:id/upload` | Upload product image |
| DELETE | `/api/v1/products/:id/images/:filename` | Delete product image |
| GET | `/uploads/:filename` | Get uploaded image |

## 🧠 Learning Goals

**This is a LEARNING PROJECT designed to help you understand:**

### 🎯 NestJS Concepts
- How NestJS handles routes, controllers, and services
- Dependency injection in NestJS
- Middleware and guards implementation
- Exception handling and custom exceptions
- Module architecture and organization
- Database integration with Mongoose

### 🎯 Full-Stack Development
- How to use MongoDB with Mongoose in NestJS
- How to build a React frontend and connect it to backend APIs
- How to implement JWT authentication with refresh tokens
- How to upload and serve images using Multer
- API design and RESTful principles
- CORS configuration and security

### 🎯 Frontend Development
- How to create responsive UIs with Tailwind CSS
- How to manage state with React Context
- How to implement form validation with Zod
- How to handle file uploads and image processing
- React Router for navigation
- Component architecture and reusability

### 🎯 Database & Authentication
- MongoDB schema design
- User authentication flows
- Password hashing and security
- Token management and refresh strategies
- File storage and serving

## 🪄 Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/user_crud.git
cd user_crud
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

**Configure your `.env` file:**

```env
# Database Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/user_crud_db?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this-in-production
JWT_REFRESH_EXPIRES_IN=7d

# Application Configuration
PORT=3000
NODE_ENV=development

# File Upload Configuration
MAX_FILE_SIZE=5242880
UPLOAD_PATH=uploads
ALLOWED_IMAGE_TYPES=image/jpeg,image/png,image/gif,image/webp
```

**Start the backend:**

```bash
npm run start:dev
```

### 3️⃣ Frontend Setup

```bash
cd ../Frontend
npm install
```

**Configure your `.env` file:**

```env
VITE_API_URL=http://localhost:3000/api/v1
```

**Start the frontend:**

```bash
npm run dev
```

### 4️⃣ MongoDB Atlas Setup

1. Create a MongoDB Atlas account at [https://cloud.mongodb.com/](https://cloud.mongodb.com/)
2. Create a new cluster
3. Get your connection string
4. Add your IP address to the whitelist
5. Update the `MONGODB_URI` in your backend `.env` file

## 🎯 Usage

1. **Register/Login**: Create an account or login with existing credentials
2. **Add Products**: Click "Add New Product" to create products with images
3. **Manage Products**: View, edit, or delete your products
4. **Upload Images**: Upload multiple images for each product
5. **Search**: Use the search functionality to find specific products

## 🔧 Development

### Backend Commands

```bash
npm run start:dev    # Start development server
npm run build        # Build for production
npm run start:prod   # Start production server
npm run lint         # Run ESLint
npm run test         # Run tests
```

### Frontend Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🛡️ Security Features (Learning Implementation)

**⚠️ Note: These are basic security implementations for learning purposes. For production, additional security measures would be required.**

- JWT Authentication with refresh tokens
- Password hashing with bcrypt
- Input validation with class-validator
- CORS configuration
- Helmet for security headers
- Rate limiting
- File upload validation

**🚨 Production Security Considerations:**
- Add rate limiting per user/IP
- Implement proper error handling
- Add input sanitization
- Use environment-specific configurations
- Add logging and monitoring
- Implement proper session management

## 📱 UI Components

- **Login/Register Forms**: Secure authentication
- **Product Cards**: Display products with images
- **Product Form**: Add/edit products with validation
- **Image Upload**: Drag & drop image upload
- **Search Bar**: Find products quickly
- **Responsive Design**: Works on all devices

## 💡 Future Learning Improvements

**🎓 Additional features you can implement to further your learning:**

- [ ] Add product categories (learn about relationships)
- [ ] Pagination & advanced search (learn about database queries)
- [ ] Image compression and optimization (learn about file processing)
- [ ] User profile editing (learn about user management)
- [ ] Cloud image storage (learn about external services)
- [ ] Email verification (learn about email services)
- [ ] Password reset functionality (learn about email workflows)
- [ ] Product reviews and ratings (learn about complex relationships)
- [ ] Export products to CSV/PDF (learn about file generation)
- [ ] Dark mode theme (learn about theme management)
- [ ] Unit testing (learn about testing strategies)
- [ ] Docker containerization (learn about deployment)
- [ ] API documentation with Swagger (learn about documentation)
- [ ] WebSocket implementation (learn about real-time features)

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**: Make sure your IP is whitelisted in MongoDB Atlas
2. **Images Not Loading**: Check if the backend is running and CORS is configured
3. **Authentication Issues**: Verify JWT secrets are set correctly
4. **File Upload Errors**: Check file size limits and allowed types

### Debug Mode

Enable debug logging by setting `NODE_ENV=development` in your backend `.env` file.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🧑‍💻 Author

**Thushan Madhusanka**
- 📍 Sri Lanka
- 💻 GitHub: [ThushanMadu](https://github.com/ThushanMadu)
---

**Happy Learning! 🎓🚀**
