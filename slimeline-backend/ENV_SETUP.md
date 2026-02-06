# Environment Variables Setup

## .env File

Create a `.env` file in the `slimeline-backend` directory with the following content:

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
# Frontend URL - Update this for production
CORS_ORIGIN=http://localhost:3000

# JWT Secret for authentication
# Change this to a secure random string in production
# Generate a secure secret with: openssl rand -base64 32
JWT_SECRET=supersecretjwtkey
```

## Environment Variables Explained

### Database Configuration
- `DB_HOST`: MySQL database host (default: localhost)
- `DB_USER`: MySQL username (default: root)
- `DB_PASSWORD`: MySQL password (default: root)
- `DB_NAME`: Database name (default: slimelineholidays)

### Server Configuration
- `PORT`: Server port (default: 3001)
- `NODE_ENV`: Environment mode (development/production)

### CORS Configuration
- `CORS_ORIGIN`: Frontend URL for CORS (default: http://localhost:3000)
  - For production, update to your frontend domain
  - Example: `https://yourdomain.com`

### JWT Secret
- `JWT_SECRET`: Secret key for JWT token signing
  - **IMPORTANT**: Change this to a secure random string in production
  - Generate a secure secret: `openssl rand -base64 32`

## Production Notes

For production deployment:

1. **Change JWT_SECRET** to a secure random string
2. **Update CORS_ORIGIN** to your production frontend URL
3. **Update database credentials** to your production database
4. **Set NODE_ENV** to `production`
5. **Use environment-specific .env files** or use your hosting platform's environment variable configuration

## Security

⚠️ **Never commit `.env` file to version control!**

The `.env` file is already listed in `.gitignore` and will not be committed to the repository.

