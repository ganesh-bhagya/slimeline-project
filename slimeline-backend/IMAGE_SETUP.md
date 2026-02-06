# Image Files Setup

## Images Copied
All package images have been copied from the frontend to the backend:
- Source: `slimelineholidays/src/assets/images/pakcages/`
- Destination: `slimeline-backend/public/assets/images/pakcages/`
- Total: 61 image files

## Directory Structure
```
slimeline-backend/
└── public/
    └── assets/
        └── images/
            ├── pakcages/      (61 images - original typo preserved)
            └── packages/      (for new uploads)
```

## Image Paths

### Existing Images (from migration)
- Path in database: `/assets/images/pakcages/filename.jpg`
- Accessible at: `http://localhost:3001/assets/images/pakcages/filename.jpg`

### New Uploads
- Saved to: `public/assets/images/packages/`
- Path returned: `/assets/images/packages/filename.jpg`
- Accessible at: `http://localhost:3001/assets/images/packages/filename.jpg`

## Static File Serving

The backend is configured in `src/main.ts` to serve static files from the `public` directory:
```typescript
app.useStaticAssets(join(process.cwd(), 'public'), {
  prefix: '/',
});
```

This makes all files in the `public` directory accessible at the root URL.

## Testing

To verify images are accessible:
1. Start the backend: `npm run start:dev`
2. Visit: `http://localhost:3001/assets/images/pakcages/package1.jpg`
3. The image should load in the browser

