# Aerospace Academy & Consultancy Website

## Overview

This is a modern, full-stack web application for an Aerospace Academy & Consultancy that specializes in drone training, design and simulation services, industry insights, and aerospace consultancy. The application features a complete course selling platform with a responsive design, contact forms, testimonials, and professional services. Built with React frontend, Express.js backend, and uses in-memory storage with capability to switch to PostgreSQL with Drizzle ORM for data management.

## Recent Changes (January 2025)

✓ **Complete Website Structure Created**:
- Home page with hero section, course offerings, and testimonials
- Courses catalog with filtering by category (drone training, design & simulation)
- Individual course detail pages with enrollment information
- Industry insights blog section
- Consultancy services page with inquiry forms
- About page with team member profiles
- Contact page with forms and company information
- Legal page with terms, privacy policy, and disclaimer

✓ **Navigation & User Experience**:
- Professional header with dropdown navigation
- Mobile-responsive design with hamburger menu
- Footer with social links and company information
- Classic and simple design as requested
- Aerospace-themed color scheme (blue, amber, slate)

✓ **Functional Components**:
- Course browsing and filtering system
- Contact inquiry forms with validation
- Consultancy request forms
- Team member showcase
- Testimonials display
- Responsive layout for all devices

✓ **Technical Implementation**:
- TypeScript throughout for type safety
- React Query for data fetching and caching
- React Hook Form with Zod validation
- Tailwind CSS for styling
- In-memory storage with sample aerospace data
- Express.js API with proper error handling

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with custom aerospace-themed color scheme
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Module System**: ES modules for modern JavaScript architecture
- **API Pattern**: RESTful API design with clear endpoint structure
- **Error Handling**: Centralized error handling middleware
- **Logging**: Request/response logging with performance metrics

### Data Layer
- **Database**: PostgreSQL (configured for Neon serverless)
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema Management**: Centralized schema definitions in shared directory
- **Validation**: Zod schemas for runtime type validation
- **Migrations**: Drizzle Kit for database schema migrations

## Key Components

### Core Entities
1. **Courses**: Training programs for drone operations and design/simulation
2. **Articles**: Industry insights and educational content
3. **Consultancy Inquiries**: Business consultation requests
4. **Contact Inquiries**: General contact form submissions
5. **Team Members**: Staff and instructor profiles
6. **Testimonials**: Customer feedback and reviews

### Frontend Pages
- **Home**: Landing page with hero section, offerings overview, and featured content
- **Courses**: Course catalog with filtering and categorization
- **Course Detail**: Individual course information with enrollment details
- **Industry Insights**: Article listing and content management
- **Article Detail**: Individual article display
- **Consultancy**: Service offerings and inquiry forms
- **About**: Company information and team profiles
- **Contact**: Contact forms and company details
- **Legal**: Terms of service and privacy policy

### UI Components
- Responsive layout with mobile-first design
- Reusable component library based on Radix UI
- Form components with validation
- Navigation with dropdown menus
- Toast notifications for user feedback
- Loading states and error handling

## Data Flow

### Client-Server Communication
1. Frontend makes API calls using TanStack Query
2. Express.js routes handle incoming requests
3. Storage layer (in-memory for development) manages data operations
4. Responses are cached on the client side for performance

### Course Management
- Courses are categorized (drone training, design & simulation)
- Featured courses are highlighted on the homepage
- Filtering by category, search, and sorting capabilities

### Content Management
- Articles support categories (technology, regulations, education, trends)
- Featured articles appear on homepage
- Author attribution and publication dates

### Inquiry Processing
- Separate handling for consultancy and general contact inquiries
- Form validation on both client and server sides
- Data persistence for follow-up and analytics

## External Dependencies

### UI and Styling
- **Radix UI**: Accessible, unstyled UI components
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library for consistent iconography
- **class-variance-authority**: Dynamic className generation

### State Management
- **TanStack Query**: Server state management and caching
- **React Hook Form**: Form state management and validation
- **Wouter**: Lightweight routing solution

### Development Tools
- **Vite**: Build tool with hot module replacement
- **TypeScript**: Type safety across the entire application
- **ESBuild**: Fast JavaScript bundler for production

### Database and Validation
- **Drizzle ORM**: Type-safe database operations
- **Zod**: Runtime type validation and schema definition
- **@neondatabase/serverless**: PostgreSQL driver for serverless environments

## Deployment Strategy

### Development Setup
- Vite development server with hot reload
- Express.js server with middleware for logging and error handling
- In-memory storage for rapid prototyping
- Environment-based configuration

### Production Configuration
- Vite builds optimized static assets
- ESBuild bundles server code for Node.js deployment
- PostgreSQL database with connection pooling
- Environment variables for database and API configuration

### Architecture Benefits
1. **Type Safety**: Full TypeScript coverage from database to UI
2. **Performance**: Optimized builds and efficient caching strategies
3. **Developer Experience**: Hot reload, type checking, and modern tooling
4. **Scalability**: Modular architecture supports easy feature additions
5. **Maintainability**: Separation of concerns and reusable components

### Key Design Decisions
- **Shared Schema**: Common type definitions between frontend and backend
- **Component Library**: Consistent UI patterns using shadcn/ui
- **API Structure**: RESTful endpoints with clear resource organization
- **Error Handling**: Graceful degradation with user-friendly error messages
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints