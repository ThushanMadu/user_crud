# User CRUD Frontend

A modern React frontend for the User CRUD application built with Vite, TypeScript, Tailwind CSS, and shadcn/ui.

## Features

- 🔐 **Authentication**
  - Login and Register pages with form validation
  - JWT token management with automatic refresh
  - Protected routes and authentication context

- 👤 **User Management**
  - Profile page with editable user information
  - Avatar upload functionality
  - Account information display

- 📦 **Product Management**
  - Product listing with search and filtering
  - Add/Edit product forms with image upload
  - Product deletion with confirmation
  - Responsive grid layout

- 🎨 **Modern UI**
  - Built with shadcn/ui components
  - Tailwind CSS for styling
  - Responsive design
  - Dark mode support
  - Loading states and error handling

## Tech Stack

- **React 18** with TypeScript
- **Vite** for build tooling
- **React Router** for navigation
- **React Hook Form** with Zod validation
- **Axios** for API calls
- **Tailwind CSS** for styling
- **shadcn/ui** for components
- **Lucide React** for icons
- **React Hot Toast** for notifications

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend API running on port 3000

### Installation

1. Install dependencies:
```bash
npm install
```

2. Copy environment file:
```bash
cp env.example .env
```

3. Update environment variables in `.env`:
```env
VITE_API_URL=http://localhost:3000/api/v1
```

4. Start development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3001`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/
│   └── ui/           # shadcn/ui components
├── contexts/         # React contexts
├── lib/             # Utilities and API client
├── pages/           # Page components
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Home.tsx
│   ├── Profile.tsx
│   └── ProductForm.tsx
├── App.tsx           # Main app component
├── main.tsx          # Entry point
└── index.css         # Global styles
```

## API Integration

The frontend connects to the NestJS backend API with the following endpoints:

- **Authentication**: `/auth/login`, `/auth/register`, `/auth/logout`
- **Users**: `/users/me`, `/users/me/stats`
- **Products**: `/products`, `/products/:id`, `/products/:id/upload`

## Features Overview

### Authentication Flow
1. User registers/logs in
2. JWT token stored in localStorage
3. Automatic token refresh on API calls
4. Protected routes redirect to login if not authenticated

### Product Management
1. View all products in responsive grid
2. Search and filter products
3. Add new products with image upload
4. Edit existing products
5. Delete products with confirmation

### User Profile
1. View and edit profile information
2. Upload avatar images
3. View account statistics

## Security Features

- JWT token authentication
- Automatic token refresh
- Protected routes
- Input validation with Zod
- File upload size limits
- XSS protection with React

## Responsive Design

The application is fully responsive and works on:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+