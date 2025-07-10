# Hotel Booking System - replit.md

## Overview

This is a full-stack hotel booking system built with modern web technologies. The application provides a luxurious hotel website with room browsing, booking functionality, and contact management. It features a React frontend with shadcn/ui components, an Express.js backend, and uses Drizzle ORM for database management.

## System Architecture

The application follows a monorepo structure with clear separation between client and server code:

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom hotel theme colors
- **State Management**: TanStack Query (React Query) for server state
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: Express sessions with PostgreSQL store
- **Development**: Hot reload with Vite middleware integration

### Database Schema
The application uses four main entities:
- **Users**: Authentication system (id, username, password)
- **Rooms**: Hotel room catalog (id, name, description, price, category, amenities, etc.)
- **Bookings**: Reservation system (guest details, dates, pricing, status)
- **Contacts**: Contact form submissions

## Key Components

### Client-Side Components
1. **Layout Components**: Navbar, Footer, Hero Section
2. **Business Components**: Room Cards, Booking Form, Contact Section
3. **UI Components**: Complete shadcn/ui component set
4. **Pages**: Home, Rooms, Room Detail, Booking, 404

### Server-Side Components
1. **Routes**: RESTful API endpoints for rooms, bookings, contacts, availability
2. **Storage**: Abstract storage interface with in-memory implementation
3. **Middleware**: Request logging, error handling, JSON parsing

### Shared Components
- **Schema**: Drizzle schema definitions and Zod validation schemas
- **Types**: TypeScript type definitions shared between client and server

## Data Flow

1. **Room Display**: Client fetches rooms from `/api/rooms`, displays with filtering
2. **Availability Check**: Client posts search criteria to `/api/availability`
3. **Booking Process**: Multi-step form collects guest info, creates booking via `/api/bookings`
4. **Contact Management**: Contact form submissions stored via `/api/contacts`

## External Dependencies

### Core Dependencies
- **Database**: `@neondatabase/serverless` for PostgreSQL connection
- **ORM**: `drizzle-orm` and `drizzle-kit` for database operations
- **UI**: `@radix-ui/*` components, `tailwindcss`, `class-variance-authority`
- **Forms**: `react-hook-form`, `@hookform/resolvers`
- **HTTP**: `@tanstack/react-query` for API state management

### Development Dependencies
- **Build**: `vite`, `esbuild` for production builds
- **TypeScript**: Full TypeScript setup with path aliases
- **Replit Integration**: Cartographer and runtime error overlay plugins

## Deployment Strategy

### Development
- Uses Vite dev server with HMR
- Express server runs on port 5000
- PostgreSQL database provisioned via Replit modules

### Production
1. **Build Process**: 
   - Frontend: `vite build` outputs to `dist/public`
   - Backend: `esbuild` bundles server to `dist/index.js`
2. **Deployment**: Replit autoscale deployment
3. **Database**: Drizzle migrations with `drizzle-kit push`

### Environment
- **Node.js**: Version 20
- **Database**: PostgreSQL 16
- **Platform**: Replit with autoscale deployment target

## Changelog

```
Changelog:
- June 16, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```