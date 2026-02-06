# React Admin Integration Guide

This document tracks the integration of admin functionality into the original React/Vite app.

## Progress

### ✅ Completed
1. Updated `axios-client.jsx` to use NestJS backend API
2. Installed dependencies: `js-cookie`, `react-select`, `react-data-table-component`
3. Created admin login page
4. Created admin layout component with sidebar
5. Created admin dashboard page
6. Updated router to include admin routes

### 🚧 In Progress
- Creating admin packages management pages
- Creating admin enquiries page
- Creating admin contacts page
- Creating PackageForm component

### 📋 TODO
- Update React app to fetch packages from backend API
- Update enquiry forms to submit to backend API
- Update contact form to submit to backend API

## Environment Variables

Create a `.env` file in `slimelineholidays/`:
```
VITE_API_URL=http://localhost:3001/api
```

## Running the App

```bash
cd slimelineholidays
npm install
npm run dev
```

## Admin Routes

- `/admin/login` - Admin login page
- `/admin/dashboard` - Admin dashboard (protected)
- `/admin/packages` - Package list (coming soon)
- `/admin/packages/new` - Create package (coming soon)
- `/admin/packages/:id/edit` - Edit package (coming soon)
- `/admin/enquiries` - Enquiries management (coming soon)
- `/admin/contacts` - Contacts management (coming soon)

