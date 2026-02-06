# NestJS Backend Setup Guide

## Quick Start

1. **Install dependencies:**
   ```bash
   cd slimeline-backend
   npm install
   ```

2. **Create `.env` file:**
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=root
   DB_NAME=slimelineholidays
   PORT=3001
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:3000
   ```

3. **Start the server:**
   ```bash
   # Development
   npm run start:dev

   # Production
   npm run build
   npm run start:prod
   ```

The API will be available at `http://localhost:3001`

## API Endpoints

All endpoints are prefixed with `/api`

### Authentication
- `POST /api/auth/login` - Login (body: {username, password})
- `POST /api/auth/logout` - Logout
- `GET /api/auth/check` - Check auth status

### Packages
- `GET /api/packages` - Get all packages (public)
- `GET /api/packages?admin=true` - Get all packages (admin only)
- `GET /api/packages?slug=package-slug` - Get package by slug
- `GET /api/packages/:id` - Get package by ID
- `POST /api/packages` - Create package (admin only)
- `PUT /api/packages/:id` - Update package (admin only)
- `DELETE /api/packages/:id` - Delete package (admin only)

### Contacts
- `GET /api/contacts` - Get all contacts (admin only)
- `GET /api/contacts?status=pending` - Filter by status
- `GET /api/contacts/:id` - Get contact by ID (admin only)
- `POST /api/contacts` - Create contact (public)
- `PUT /api/contacts/:id` - Update status (admin only)
- `DELETE /api/contacts/:id` - Delete contact (admin only)

### Enquiries
- `GET /api/enquiries` - Get all enquiries (admin only)
- `GET /api/enquiries?status=pending` - Filter by status
- `GET /api/enquiries/:id` - Get enquiry by ID (admin only)
- `POST /api/enquiries` - Create enquiry (public)
- `PUT /api/enquiries/:id` - Update status (admin only)
- `DELETE /api/enquiries/:id` - Delete enquiry (admin only)

### Upload
- `POST /api/upload` - Upload file (admin only, multipart/form-data)

## Next Steps

1. Update your Next.js frontend to call this backend API
2. Update API URLs from `/api/*` to `http://localhost:3001/api/*` (or your backend URL)
3. Ensure CORS is properly configured for your frontend domain

