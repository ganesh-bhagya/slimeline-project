# Slimeline Holidays Backend API

NestJS backend API for Slimeline Holidays website.

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=slimelineholidays

# Server Configuration
PORT=3001
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

### 3. Run the Application

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

The API will be available at `http://localhost:3001`

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout
- `GET /api/auth/check` - Check authentication status

### Packages
- `GET /api/packages` - Get all packages
- `GET /api/packages/:id` - Get single package
- `POST /api/packages` - Create package (admin only)
- `PUT /api/packages/:id` - Update package (admin only)
- `DELETE /api/packages/:id` - Delete package (admin only)

### Contacts
- `GET /api/contacts` - Get all contacts (admin only)
- `GET /api/contacts/:id` - Get single contact (admin only)
- `POST /api/contacts` - Create contact (public)
- `PUT /api/contacts/:id` - Update contact status (admin only)
- `DELETE /api/contacts/:id` - Delete contact (admin only)

### Enquiries
- `GET /api/enquiries` - Get all enquiries (admin only)
- `GET /api/enquiries/:id` - Get single enquiry (admin only)
- `POST /api/enquiries` - Create enquiry (public)
- `PUT /api/enquiries/:id` - Update enquiry status (admin only)
- `DELETE /api/enquiries/:id` - Delete enquiry (admin only)

### Upload
- `POST /api/upload` - Upload file (admin only)

## Default Admin Credentials

- Username: `admin`
- Password: `admin123`

**⚠️ Change the default password in production!**

## Database

The database tables will be automatically created on first run. The database connection uses the MySQL connection pool.

## Next.js Frontend Integration

Update your Next.js frontend to use this backend:

1. Update API calls from `/api/*` to `http://localhost:3001/api/*` (or your backend URL)
2. Ensure CORS is properly configured in `.env`
3. The cookie-based authentication will work across domains if configured correctly

