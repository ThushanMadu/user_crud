# MongoDB Atlas Setup Guide

## 🚀 Quick Setup Steps

### 1. Create MongoDB Atlas Account
- Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
- Sign up for free account
- Choose **M0 Sandbox** (Free tier)

### 2. Create Cluster
- **Cloud Provider**: AWS/Google Cloud/Azure
- **Region**: Choose closest to you
- **Tier**: M0 Sandbox (Free)
- **Name**: `user-crud-cluster`

### 3. Database Access
- Go to "Database Access"
- Add new user: `user-crud-admin`
- Generate secure password
- Set privileges: "Read and write to any database"

### 4. Network Access
- Go to "Network Access"
- Add IP Address: "Allow access from anywhere" (for development)
- Or add your specific IP address

### 5. Get Connection String
- Go to "Database" → "Connect"
- Choose "Connect your application"
- Driver: Node.js
- Copy the connection string

### 6. Update Environment Variables

Create `.env` file in `/backend/` directory:

```env
# Database Configuration - MongoDB Atlas
MONGODB_URI=mongodb+srv://user-crud-admin:YOUR_PASSWORD@user-crud-cluster.xxxxx.mongodb.net/user_crud_db?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-2024
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this-in-production-2024
JWT_REFRESH_EXPIRES_IN=7d

# Application Configuration
PORT=3000
NODE_ENV=development

# File Upload Configuration
MAX_FILE_SIZE=5242880
UPLOAD_PATH=uploads
ALLOWED_IMAGE_TYPES=image/jpeg,image/png,image/gif,image/webp

# Security Configuration
BCRYPT_ROUNDS=12
RATE_LIMIT_TTL=60
RATE_LIMIT_LIMIT=100

# CORS Configuration
CORS_ORIGIN=http://localhost:3001
CORS_CREDENTIALS=true
```

### 7. Replace Connection String
Replace `YOUR_PASSWORD` and `xxxxx` with your actual values:

```env
MONGODB_URI=mongodb+srv://user-crud-admin:MySecurePassword123@user-crud-cluster.abc123.mongodb.net/user_crud_db?retryWrites=true&w=majority
```

### 8. Start Your Application
```bash
cd backend
npm run start:dev
```

## 🔧 Troubleshooting

### Connection Issues
- Check if password is URL-encoded (replace special characters)
- Verify network access allows your IP
- Ensure cluster is running (not paused)

### Security Best Practices
- Use strong passwords
- Enable IP whitelisting in production
- Use environment variables for secrets
- Enable MongoDB Atlas encryption at rest

## 📊 Database Collections

Your application will automatically create these collections:
- `users` - User accounts and profiles
- `products` - Product information
- `refreshtokens` - JWT refresh tokens

## 🎯 Next Steps

1. Complete Atlas setup
2. Update `.env` file with your connection string
3. Start the backend server
4. Test the API endpoints
5. Deploy to production when ready

## 💡 Pro Tips

- **Free Tier**: 512MB storage, shared clusters
- **Development**: Use "Allow access from anywhere"
- **Production**: Whitelist specific IP addresses
- **Monitoring**: Use Atlas monitoring dashboard
- **Backups**: Automatic backups with Atlas


