# Discrete Math Project

A full-stack application built with modern technologies for discrete mathematics operations and calculations.

## Project Structure

This project follows a microservices architecture with separate frontend and backend services:

```
descrete-math/
├── backend/           # NestJS backend API
├── frontend/          # Next.js frontend application
├── docker-compose.*.yml  # Docker configuration files
└── .env.*            # Environment configuration files
```

## Tech Stack

### Backend

- NestJS (TypeScript)
- Node.js
- Docker
- TypeScript

### Frontend

- Next.js (React)
- TypeScript
- Docker

## Prerequisites

- Node.js (LTS version recommended)
- Docker and Docker Compose
- npm or yarn package manager

## Environment Setup

The project uses different environment configurations:

- `.env` - Main environment file
- `.env.example` - Template for environment variables
- `.env.prod` - Production environment configuration

Key environment variables:

- `PORT` - Backend server port (default: 5000)
- `FRONTEND_PORT` - Frontend server port (default: 3000)
- `NODE_ENV` - Environment mode (development/production)
- `CORS_ORIGINS` - CORS allowed origins
- `DEBUG_MODE` - Debug logging
- `NEXT_PUBLIC_API_BASE_URL` - API base URL

## Getting Started

### Local Deployment

1. Clone the repository
2. Copy `.env.example` to `.env` and configure your environment variables
3. Start the development environment:

```bash
cd backend
npm run start:dev
cd ..
cd frontend
npm run dev
```

### Docker Dev Deployment

1. Build the Docker images:

```bash
docker compose -f docker-compose.dev.yml up -d --build
```

2. Access the application:

- Backend: http://localhost:5000
- Frontend: http://localhost:3000


## Project Organization

### Backend Structure

The backend is built using NestJS and follows a modular architecture:

- Controllers handle HTTP requests
- Services contain business logic
- Modules organize related functionality
- DTOs for request/response validation

### Frontend Structure

The frontend is built with Next.js and follows a component-based architecture:

- Pages in `/src/pages`
- Components in `/src/components`
- Styles in `/src/styles`
- API integration in `/src/services`
