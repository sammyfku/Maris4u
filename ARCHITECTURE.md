# Maris4u Project Architecture

## Primary Entry Point
**Server:** `server.js` (root level)
- **Port:** 3000 (configured in `.env`)
- **Data Storage:** File-based JSON (no database)
- **Technology:** Express.js

## Project Structure

### `/routes/`
File-based API routes for the main server:
- `auth.js` - User authentication (register/login)
- `products.js` - Product listing and retrieval
- `orders.js` - Order management (requires auth)
- `admin.js` - Admin product management (requires auth)

### `/middleware/`
Shared middleware functions:
- `auth.js` - Authentication middleware for protected routes

### `/data/`
JSON data files:
- `users.json` - User credentials
- `products.json` - Product catalog
- `orders.json` - Order history

### `/public/`
Static files served by Express

## Note: Backend Directory
The `/backend/` directory contains an alternative MongoDB-based implementation.
**Currently not in use.** The primary implementation uses the file-based routes in `/routes/`.

## Running the Server
```bash
npm install
npm run dev  # Development with nodemon
# or
npm start    # Production
```

Server will be available at `http://localhost:3000`
