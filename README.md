# Personal Blog API

A comprehensive NestJS-based REST API for a personal blog platform with advanced content management, authentication, and SEO capabilities. This API serves as the backend for a full-stack personal blog application with Angular SSR frontend integration.

## Table of Contents

1. [Overview](#overview)
2. [Technology Stack](#technology-stack)
3. [Prerequisites](#prerequisites)
4. [Installation and Setup](#installation-and-setup)
5. [Environment Variables](#environment-variables)
6. [Available Scripts](#available-scripts)
7. [Architecture](#architecture)
8. [API Endpoints](#api-endpoints)
9. [Authentication and Security](#authentication-and-security)
10. [Database Schema](#database-schema)
11. [Email System](#email-system)
12. [Testing](#testing)
13. [Deployment](#deployment)
14. [Configuration](#configuration)
15. [Frontend Integration](#frontend-integration)
16. [Troubleshooting](#troubleshooting)

## Overview

The Personal Blog API is a robust, scalable backend service built with modern technologies and best practices. It provides comprehensive content management capabilities, advanced security features, and seamless integration with server-side rendering applications.

### Key Features

- Advanced Authentication: JWT-based authentication with refresh tokens and TOTP-based two-factor authentication
- Content Management: Full CRUD operations for articles, projects, pages, and dynamic content
- SEO Optimization: Built-in SEO metadata, Open Graph tags, and structured data support
- Email Integration: SendGrid-powered email system for contact forms and newsletters
- Transaction Management: Database transactions with custom decorators for data consistency
- Docker Support: Containerized development environment with Docker Compose
- Testing: Comprehensive test suite with Jest and end-to-end testing
- Database Seeding: Mock data generation for development and testing
- File Storage: AWS S3 integration for static asset management
- Security: Multi-layered security with password hashing, AES encryption, and two-factor authentication

## Technology Stack

- **Framework**: NestJS 10.x with TypeScript
- **Database**: PostgreSQL with Sequelize ORM
- **Authentication**: JWT with refresh tokens and Speakeasy TOTP two-factor authentication
- **Email Service**: SendGrid integration
- **Cloud Storage**: AWS S3 integration
- **Security**: bcryptjs password hashing and AES encryption
- **Containerization**: Docker and Docker Compose
- **Process Management**: PM2 for production deployment
- **Testing**: Jest for unit testing, Supertest for end-to-end testing
- **Validation**: class-validator and class-transformer

## Prerequisites

- Node.js 18 or higher and npm
- Docker and Docker Compose
- PostgreSQL 13 or higher (if running without Docker)
- SendGrid account (for email functionality)
- AWS S3 bucket (for file storage)

## Installation and Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd personal-blog-api
```

### 2. Environment Configuration

Create environment files based on your needs:

```bash
# Copy and configure development environment
cp .env.development.example .env.development

# Copy and configure production environment
cp .env.production.example .env.production
```

### 3. Development Setup

#### Option A: Docker Compose (Recommended)

```bash
# Start development environment with PostgreSQL
npm run api:dev

# Or build and start fresh containers
npm run api:dev:build

# Stop services
npm run api:dev:down
```

#### Option B: Local Development

```bash
# Install dependencies
npm install

# Ensure PostgreSQL is running locally
# Update .env.development with your local database credentials

# Start development server
npm run start:dev
```

### 4. Database Setup

```bash
# Seed database with mock data (after containers are running)
npm run database:dev:mock

# To remove mock data
npm run database:dev:mock:undo

# To completely wipe database
npm run database:dev:wipe
```

The API will be available at `http://localhost:3000` (or your configured API_PORT).

## Environment Variables

### Database Configuration

```bash
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USERNAME=your_username
POSTGRES_PASSWORD=your_password
POSTGRES_DATABASE=personal_blog
```

### API Configuration

```bash
API_PORT=3000
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your_refresh_secret_key
JWT_REFRESH_EXPIRES_IN=7d
```

### Security and Encryption

```bash
HASH_PASSWORD_ROUNDS=12
RECOVERY_ENCRYPTION_KEY_SIZE=256
RECOVERY_ENCRYPTION_ITERATIONS=100000
RECOVERY_ENCRYPTION_SALT=your_salt_here
RECOVERY_ENCRYPTION_IV=your_iv_here
```

### Email Configuration (SendGrid)

```bash
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=noreply@yourdomain.com
SENDGRID_FROM_NAME="Your Blog Name"
```

### AWS S3 Configuration

```bash
AWS_S3_BUCKET_NAME=your_s3_bucket
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_S3_REGION=us-east-1
```

### Frontend Integration

```bash
FRONTEND_URL=http://localhost:4200
```

### Contact Configuration

```bash
CONTACT_EMAIL_ADDRESS=contact@yourdomain.com
```

## Available Scripts

### Development Scripts

| Script | Description |
|--------|-------------|
| `npm run start:dev` | Start development server with watch mode |
| `npm run api:dev` | Run via Docker Compose for development |
| `npm run api:dev:build` | Build and run Docker Compose containers |
| `npm run api:dev:down` | Stop Docker Compose services |

### Production Scripts

| Script | Description |
|--------|-------------|
| `npm run api:build` | Build NestJS application for production |
| `npm run prod` | Start production server |
| `npm run api:process-start` | Start with PM2 process manager |
| `npm run api:restart` | Restart PM2 process |

### Database Scripts

| Script | Description |
|--------|-------------|
| `npm run database:dev:mock` | Seed database with mock data |
| `npm run database:dev:mock:undo` | Remove mock data |
| `npm run database:dev:wipe` | Clear all seeded data |

### Testing and Quality Scripts

| Script | Description |
|--------|-------------|
| `npm test` | Run Jest unit tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:cov` | Run tests with coverage report |
| `npm run test:e2e` | Run end-to-end tests |
| `npm run lint` | Run ESLint with automatic fixes |
| `npm run format` | Format code with Prettier and ESLint |

## Architecture

### Module Structure

The application follows a feature-based modular architecture with 23 modules:

```
src/
├── modules/              # Feature modules
│   ├── auth/            # Authentication and session management
│   ├── security/        # Two-factor authentication (TOTP)
│   ├── users/           # User management
│   ├── articles/        # Blog post management
│   ├── projects/        # Portfolio project showcase
│   ├── pages/           # Dynamic page management
│   ├── about/           # Professional experience and certifications
│   ├── newsletters/     # Email subscription management
│   ├── contact/         # Contact form handling
│   ├── home/            # Landing page content
│   ├── blog/            # Blog listing functionality
│   ├── changelog/       # Platform changelog
│   ├── faq/             # Frequently asked questions
│   ├── license/         # License page management
│   ├── privacy/         # Privacy policy management
│   ├── menu/            # Menu page and navigation tiles
│   ├── not-found/       # Custom 404 page content
│   ├── site-config/     # Global site configuration
│   ├── static-assets/   # AWS S3 file upload and management
│   ├── control/         # Control panel functionality
│   ├── maintenance/     # Maintenance mode toggle
│   ├── password-protection/ # Password protection mode
│   ├── social-links/    # Social media links management
│   └── copyright/       # Copyright information management
├── models/              # Sequelize TypeScript models (36 models)
├── dto/                 # Data Transfer Objects for validation
├── guards/              # Authentication guards
├── interceptors/        # Transaction interceptors
├── decorators/          # Custom decorators
├── pipes/               # Validation pipes
├── exceptions/          # Custom exception classes (44+ exceptions)
├── shared/              # Shared services and utilities
├── database/            # Database seeders and configuration
└── libs/                # Interfaces, enums, regex patterns, and utilities
```

### Key Design Patterns

- **Domain-Driven Design**: Feature-based modular organization
- **Repository Pattern**: Sequelize models with TypeScript interfaces
- **Transaction Management**: Global transaction interceptor with @Transaction() decorator
- **Exception Handling**: Custom exception classes for different error types
- **Interface-Driven Development**: Comprehensive TypeScript interfaces for type safety
- **Dependency Injection**: NestJS dependency injection container throughout
- **Decorator Pattern**: Custom decorators for cross-cutting concerns

### Core Services

The application includes seven global services in the shared module:

1. **ApiConfigService**: Centralized configuration management with environment variable access
2. **CryptographicService**: Password hashing, AES encryption/decryption, hash functions
3. **EmailService**: SendGrid integration for transactional emails
4. **EmailTemplatesService**: HTML email template generation
5. **S3Service**: AWS S3 file upload, deletion, and URL generation
6. **SlugService**: URL-friendly slug generation with uniqueness validation
7. **TimeService**: Time-related utilities

### Guards and Interceptors

- **AuthGuard**: JWT authentication validation for protected endpoints
- **BasicAuthGuard**: HTTP Basic authentication for admin endpoints
- **TransactionInterceptor**: Global database transaction management for data consistency

### Custom Decorators

- **@TrxDecorator()**: Injects database transaction from request context
- **@UserId()**: Extracts userId from authenticated request
- **@CookieRefreshToken()**: Extracts refresh token from cookies

## API Endpoints

### Public Endpoints

#### Content Retrieval

```http
# Articles
GET /api/articles/posts                    # Get all published blog posts
GET /api/articles/posts/slugs              # Get post slugs for route generation
GET /api/articles/posts/:slug              # Get specific post by slug
GET /api/articles/blog                     # Blog page with pagination and search

# Projects
GET /api/projects                          # Get projects with pagination
GET /api/projects/slugs                    # Get project slugs for route generation
GET /api/projects/:slug                    # Get specific project by slug
GET /api/projects/featured                 # Get featured projects

# Pages
GET /api/pages                             # Get all published pages
GET /api/pages/slugs                       # Get page slugs for route generation
GET /api/pages/:slug                       # Get specific page by slug

# Static Pages (SSR Data)
GET /api/home                              # Home page data
GET /api/about                             # About page data
GET /api/blog                              # Blog listing page data
GET /api/changelog                         # Changelog page data
GET /api/license                           # License page data
GET /api/privacy                           # Privacy policy page data
GET /api/menu                              # Menu page data
GET /api/not-found                         # 404 page data

# Site Configuration
GET /api/site-config                       # Public site configuration

# System
GET /api/control/health-check              # Health check endpoint
```

#### User Actions

```http
# Authentication
POST /api/auth/login                       # User login
GET /api/auth/logout                       # User logout
GET /api/auth/refresh                      # Refresh access token

# Contact and Newsletter
POST /api/contact                          # Submit contact form
POST /api/newsletters/subscribe            # Subscribe to newsletter
GET /api/newsletters/confirm/:id           # Confirm subscription
GET /api/newsletters/unsubscribe/:id       # Unsubscribe from newsletter

# Password Recovery
POST /api/users/forgot-password            # Send password reset email
```

### Protected Endpoints (Require Authentication)

#### User Management

```http
GET /api/users/user-info                   # Get current user information
```

#### Content Management

```http
# Articles Management
GET /api/articles/admin/posts              # Get admin posts list
POST /api/articles/admin/posts             # Create new post
PUT /api/articles/admin/posts/:id          # Update existing post
DELETE /api/articles/admin/posts/:id       # Delete post
PUT /api/articles/admin/posts/:id/publish  # Toggle publish status

# Projects Management
GET /api/projects/admin                    # Get admin projects list
POST /api/projects/admin                   # Create new project
PUT /api/projects/admin/:id                # Update existing project
DELETE /api/projects/admin/:id             # Delete project

# Pages Management
GET /api/pages/admin                       # Get all pages for admin
GET /api/pages/admin/:slug                 # Get specific page for editing
POST /api/pages/admin                      # Create new page
PUT /api/pages/admin/:id                   # Update existing page
DELETE /api/pages/admin/:id                # Delete page
```

#### About Page Management

```http
# About Page
GET /api/about/admin                       # Get admin about page data
POST /api/about/admin                      # Create about page content
PUT /api/about/admin/:id                   # Update about page content

# Experience Management
GET /api/about/admin/experiences           # Get all experiences
POST /api/about/admin/experiences          # Create experience entry
PUT /api/about/admin/experiences/:id       # Update experience entry
DELETE /api/about/admin/experiences/:id    # Delete experience entry

# Certificate Management
GET /api/about/admin/certificates          # Get all certificates
POST /api/about/admin/certificates         # Create certificate entry
PUT /api/about/admin/certificates/:id      # Update certificate entry
DELETE /api/about/admin/certificates/:id   # Delete certificate entry
```

#### Specialized Page Management

```http
# Changelog Management
GET /api/changelog/admin/entries           # Get changelog entries
POST /api/changelog/admin/entries          # Create changelog entry
PUT /api/changelog/admin/entries/:id       # Update changelog entry
DELETE /api/changelog/admin/entries/:id    # Delete changelog entry
PUT /api/changelog/admin/page              # Update changelog page settings

# FAQ Management
GET /api/faq/admin                         # Get FAQ entries
POST /api/faq/admin                        # Create FAQ entry
PUT /api/faq/admin/:id                     # Update FAQ entry
DELETE /api/faq/admin/:id                  # Delete FAQ entry

# License Management
GET /api/license/admin/tiles               # Get license tiles
POST /api/license/admin/tiles              # Create license tile
PUT /api/license/admin/tiles/:id           # Update license tile
DELETE /api/license/admin/tiles/:id        # Delete license tile
PUT /api/license/admin/page                # Update license page settings

# Privacy Management
PUT /api/privacy/admin/page                # Update privacy page settings
POST /api/privacy/admin/sections           # Create privacy section
PUT /api/privacy/admin/sections/:id        # Update privacy section
DELETE /api/privacy/admin/sections/:id     # Delete privacy section

# Menu Management
GET /api/menu/admin                        # Get menu page data
POST /api/menu/admin                       # Create menu page
PUT /api/menu/admin/:id                    # Update menu page
POST /api/menu/admin/tiles                 # Create menu tile
PUT /api/menu/admin/tiles/:id              # Update menu tile
DELETE /api/menu/admin/tiles/:id           # Delete menu tile

# Not Found Page Management
GET /api/not-found/admin                   # Get 404 page content
PUT /api/not-found/admin                   # Update 404 page content
```

#### Site Configuration

```http
GET /api/site-config/admin                 # Get admin site configuration
PUT /api/site-config/admin                 # Update site configuration
```

#### Static Assets Management

```http
POST /api/static-assets/upload             # Upload file (multipart/form-data)
POST /api/static-assets/upload-base64      # Upload base64 encoded file
PUT /api/static-assets/:id                 # Update static asset metadata
DELETE /api/static-assets/:id              # Delete static asset
```

#### Contact Management

```http
GET /api/contact/admin/messages            # Get contact messages
GET /api/contact/admin/messages/:id        # Get specific contact message
POST /api/contact/admin/reply/:id          # Reply to contact message
DELETE /api/contact/admin/messages/:id     # Delete contact message
GET /api/contact/admin/page                # Get contact page configuration
PUT /api/contact/admin/page                # Update contact page configuration
POST /api/contact/admin/tiles              # Create contact tile
PUT /api/contact/admin/tiles/:id           # Update contact tile
DELETE /api/contact/admin/tiles/:id        # Delete contact tile
```

#### Two-Factor Authentication

```http
POST /api/security/login-generate-2fa-qr   # Generate 2FA QR during login
GET /api/security/generate-2fa-qr          # Generate 2FA QR for user
POST /api/security/login-verify-2fa        # Verify 2FA during login
POST /api/security/verify-2fa              # Verify 2FA for user
```

#### Maintenance and Password Protection

```http
PUT /api/maintenance/admin                 # Update maintenance mode
PUT /api/password-protection/admin         # Update password protection mode
POST /api/password-protection/verify       # Verify password protection
```

#### Social Links and Copyright

```http
GET /api/social-links/admin                # Get social links
PUT /api/social-links/admin                # Update social links
GET /api/copyright/admin                   # Get copyright information
PUT /api/copyright/admin                   # Update copyright information
```

### API Response Formats

#### Success Response

```json
{
  "success": true,
  "data": {
    // Response data
  },
  "message": "Operation completed successfully"
}
```

#### Error Response

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description",
    "details": {}
  }
}
```

#### Paginated Response

```json
{
  "success": true,
  "data": {
    "items": [],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "totalPages": 10
    }
  }
}
```

## Authentication and Security

### JWT Authentication

The API uses a dual-token JWT authentication system:

- **Access Token**: Short-lived (15 minutes) for API requests
- **Refresh Token**: Long-lived (7 days) stored in HTTP-only cookies
- **Custom Header**: `x-access-token: Bearer <token>`

### Two-Factor Authentication

- **TOTP-based 2FA** using Speakeasy library
- **QR Code generation** for authenticator apps (Google Authenticator, Authy, etc.)
- **Time-based verification** with delta tolerance
- **Recovery codes** generation for account recovery

### Security Features

- **Password Hashing**: bcryptjs with configurable salt rounds (default: 12)
- **AES Encryption**: CryptoJS for sensitive data encryption (recovery keys, tokens)
- **Session Management**: Database-stored refresh tokens with rotation
- **Input Validation**: class-validator decorators on all DTOs
- **CORS Protection**: Configurable CORS for frontend integration
- **HTTP Basic Auth**: Additional protection layer for admin endpoints
- **Transaction Safety**: Global transaction interceptor for data consistency

### Authentication Flow

1. **Login**: `POST /api/auth/login` with email and password
2. **2FA Check**: If enabled, requires TOTP verification
3. **Token Generation**: Returns access token and HTTP-only refresh token cookie
4. **API Requests**: Include `x-access-token: Bearer <token>` header
5. **Token Refresh**: `GET /api/auth/refresh` using refresh token cookie
6. **Logout**: `GET /api/auth/logout` clears refresh token

### Password Security

- Minimum length validation
- Password strength requirements via regex
- bcryptjs hashing with configurable rounds
- Password reset via email with encrypted recovery tokens

## Database Schema

### Core Models (36 Total)

#### User Management

- **User**: Core user authentication and profiles (email, password, firstName, lastName, isMfaSet)
- **UserSettings**: User-specific settings and 2FA tokens (twoFaToken)
- **Session**: JWT session management and refresh tokens (tokenId, userId, tokenType)

#### Content Management

- **Article**: Blog posts with SEO optimization (title, slug, description, content, excerpt, featuredImageId, tags, metaKeywords, featured, published)
- **Project**: Portfolio projects showcase (similar structure to Article plus projectType)
- **Page**: Dynamic pages with custom content
- **PagesContent**: Generic page content storage

#### Specialized Pages

- **AboutPage**: Professional experience and certifications overview
- **Experience**: Professional work history entries
- **Position**: Individual job positions within experiences
- **Certificate**: Professional certifications
- **HomePage**: Landing page configuration and content
- **BlogPage**: Blog listing page configuration
- **ProjectsPage**: Projects page configuration
- **ChangelogPage**: Platform changelog page settings
- **ChangelogEntry**: Individual changelog entries
- **LicensePage**: License documentation page
- **LicenseTile**: License information tiles
- **PrivacyPage**: Privacy policy page management
- **PrivacySection**: Privacy policy sections
- **ContactPage**: Contact page configuration
- **ContactMessage**: Stored contact form submissions
- **ContactTile**: Contact method tiles
- **SubscribePage**: Newsletter subscription page
- **MenuPage**: Menu page configuration
- **MenuTile**: Menu navigation items
- **NotFoundPage**: Custom 404 page content

#### Utility Models

- **Newsletter**: Email subscription management (email, isConfirmed)
- **SiteConfig**: Global site configuration (siteName, siteDescription, siteAuthor, siteUrl, defaultImage, keywords, socialMedia, organization)
- **FAQ**: Frequently asked questions
- **WhysSection**: "Why choose us" content sections
- **StaticAsset**: AWS S3 file references (name, s3Url, description, assetType)
- **MaintenanceMode**: Maintenance mode settings
- **PasswordProtectionMode**: Password protection configuration
- **SocialLink**: Social media links
- **Copyright**: Copyright information

### Database Features

- **UUID Primary Keys**: All models use UUID for enhanced security
- **Timestamps**: Automatic `createdAt` and `updatedAt` management
- **JSONB Fields**: PostgreSQL JSONB for flexible content storage (socialMedia, organization)
- **SEO Fields**: Comprehensive meta tags, Open Graph, and structured data
- **Relationships**: Proper foreign key relationships and cascading deletes
- **Constraints**: Unique constraints on slugs and email addresses
- **Indexes**: Database indexes for performance optimization

### Key Relationships

- User -> Session (1:1)
- User -> UserSettings (1:1)
- User -> Article (1:N)
- User -> Project (1:N)
- AboutPage -> Experience (1:N)
- Experience -> Position (1:N)
- AboutPage -> Certificate (1:N)
- ChangelogPage -> ChangelogEntry (1:N)
- LicensePage -> LicenseTile (1:N)
- PrivacyPage -> PrivacySection (1:N)
- ContactPage -> ContactTile (1:N)
- MenuPage -> MenuTile (1:N)
- HomePage -> WhysSection (1:N)

## Email System

The API includes a comprehensive email system powered by SendGrid:

### Email Templates

- **Contact Form**: Professional contact form notifications
- **Newsletter Subscription**: Welcome and confirmation emails
- **Password Recovery**: Secure password reset functionality
- **Contact Reply**: Reply to user contact messages

### Email Features

- **HTML Templates**: Professional email templates with branding
- **Template Service**: Centralized email template management
- **Error Handling**: Robust error handling for email delivery
- **Configuration**: Environment-based email configuration
- **Unsubscribe Links**: Automatic unsubscribe link generation
- **Base Template**: Reusable base layout for consistent branding

### Email Endpoints

```http
POST /api/contact                          # Sends contact notification
POST /api/newsletters/subscribe            # Sends subscription confirmation
GET /api/newsletters/confirm/:id           # Confirms subscription
POST /api/users/forgot-password            # Sends password reset email
POST /api/contact/admin/reply/:id          # Sends reply to contact message
```

### Template Architecture

All email templates use a base HTML layout with:
- Responsive table-based design for email client compatibility
- Branded color scheme (primary: #ffc94c)
- Call-to-action buttons
- Footer with unsubscribe links
- Professional formatting

## Testing

### Test Structure

```bash
src/
├── **/*.spec.ts            # Unit tests
test/
├── **/*.e2e-spec.ts        # End-to-end tests
└── jest-e2e.json           # E2E test configuration
```

### Running Tests

```bash
# Unit tests
npm test                    # Run all tests
npm run test:watch          # Watch mode
npm run test:cov            # With coverage

# E2E tests
npm run test:e2e            # End-to-end tests

# Debug tests
npm run test:debug          # Debug mode
```

### Test Configuration

- **Framework**: Jest with TypeScript support
- **Coverage**: Istanbul code coverage reports
- **E2E Testing**: Supertest for HTTP testing
- **Mocking**: Jest mocking capabilities
- **Test Environment**: Node.js test environment
- **Transform**: ts-jest for TypeScript compilation

### Test Infrastructure

The project includes complete test infrastructure with:
- Jest configuration in package.json
- E2E test configuration in test/jest-e2e.json
- Coverage directory setup
- TypeScript test support

## Deployment

### Development Deployment

#### Docker Compose (Recommended)

```bash
# Start development environment
npm run api:dev:build

# View logs
docker-compose logs -f

# Stop environment
npm run api:dev:down
```

#### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run start:dev
```

### Production Deployment

#### PM2 Process Manager

```bash
# Build application
npm run api:build

# Start with PM2
npm run api:process-start

# Restart PM2 process
npm run api:restart

# Monitor PM2 processes
pm2 monit

# View PM2 logs
pm2 logs personal-blog-api
```

#### Docker Production Setup

```bash
# Build production image
docker build -t personal-blog-api .

# Run production container
docker run -d \
  --name personal-blog-api \
  --env-file .env.production \
  -p 3000:3000 \
  personal-blog-api
```

### Environment Configuration

#### Development Environment

- Uses `.env.development` configuration
- Docker Compose with PostgreSQL container
- Hot reload enabled
- Debug logging enabled
- Volume mounting for code changes

#### Production Environment

- Uses `.env.production` configuration
- External PostgreSQL database
- PM2 process management
- Optimized build and logging
- Production error handling

### Health Monitoring

```bash
# Health check endpoint
GET /api/control/health-check

# Response format
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 12345
}
```

### Docker Configuration

The project includes:
- **Dockerfile**: Multi-stage build with Node.js base image
- **docker-compose.yml**: Development environment with API and PostgreSQL services
- **Network**: Custom Docker network (personal-blog-api-network)
- **Volumes**: PostgreSQL data persistence

## Configuration

### Environment Files

- `.env.development` - Development configuration
- `.env.production` - Production configuration
- `.env.development.example` - Development template
- `.env.production.example` - Production template

### Key Configuration Options

#### Database Configuration

```bash
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USERNAME=username
POSTGRES_PASSWORD=password
POSTGRES_DATABASE=personal_blog
```

#### JWT Configuration

```bash
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your_refresh_secret_here
JWT_REFRESH_EXPIRES_IN=7d
```

#### Security Configuration

```bash
HASH_PASSWORD_ROUNDS=12
RECOVERY_ENCRYPTION_KEY_SIZE=256
RECOVERY_ENCRYPTION_ITERATIONS=100000
RECOVERY_ENCRYPTION_SALT=random_salt_string
RECOVERY_ENCRYPTION_IV=random_iv_string
```

#### Email Configuration

```bash
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=noreply@yourdomain.com
SENDGRID_FROM_NAME="Your Blog Name"
CONTACT_EMAIL_ADDRESS=contact@yourdomain.com
```

#### AWS S3 Configuration

```bash
AWS_S3_BUCKET_NAME=your_s3_bucket
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_S3_REGION=us-east-1
```

#### Deployment Configuration

```bash
DEPLOYMENT_SSH_USER=your_ssh_user
DEPLOYMENT_SERVER_IP=your_server_ip
DEPLOYMENT_SSH_PRIVATE_KEY=your_private_key
```

### TypeScript Path Aliases

The project uses extensive path aliases for clean imports:

```typescript
import { User } from '@models/user.model';
import { AuthGuard } from '@guards/auth.guard';
import { EmailService } from '@shared/services/email.service';
import { CreateArticleDto } from '@dto/articles/requests/create-article.dto';
```

Available aliases:
- `@shared/*` -> Shared services and utilities
- `@models/*` -> Database models
- `@dto/*` -> Data Transfer Objects
- `@guards/*` -> Authentication guards
- `@decorators/*` -> Custom decorators
- `@modules/*` -> Feature modules
- `@interfaces/*` -> TypeScript interfaces
- `@exceptions/*` -> Custom exceptions
- `@interceptors/*` -> Interceptors
- `@pipes/*` -> Validation pipes
- `@regex/*` -> Validation patterns
- `@email-templates/*` -> Email templates

## Frontend Integration

### SSR Data Endpoints

The API provides specialized endpoints for Angular SSR integration:

```http
GET /api/home          # Home page data with featured content
GET /api/about         # About page with experience and certificates
GET /api/blog          # Blog listing with pagination
GET /api/changelog     # Changelog with entries
GET /api/license       # License page with tiles
GET /api/privacy       # Privacy policy with sections
GET /api/menu          # Menu page with navigation tiles
GET /api/not-found     # Custom 404 page content
```

### Route Generation

```http
GET /api/articles/posts/slugs    # Blog post slugs for route generation
GET /api/projects/slugs          # Project slugs for route generation
GET /api/pages/slugs             # Page slugs for route generation
```

### SEO Integration

All public endpoints include:
- **Meta Tags**: Title, description, keywords
- **Open Graph**: Social media optimization
- **Structured Data**: JSON-LD for search engines
- **Canonical URLs**: SEO-friendly URL structure
- **Slug-based Routing**: Clean, readable URLs

### CORS Configuration

Pre-configured CORS whitelist for:
- http://localhost:4200 (Admin panel)
- http://localhost:4202 (Blog frontend)
- http://localhost:8080 (Blog frontend)
- http://127.0.0.1:8080 (Blog frontend)
- http://localhost:4000 (Production frontend)

### Content Delivery

- **Featured Content**: Flagged content for homepage display
- **Pagination**: Configurable page size and offset
- **Search**: Full-text search with tag filtering
- **Dynamic Pages**: Flexible page content management
- **Static Assets**: S3-hosted images and files with CDN-ready URLs

## Troubleshooting

### Common Issues

#### Database Connection Issues

```bash
# Check PostgreSQL is running
docker-compose ps

# Check database logs
docker-compose logs db

# Restart database container
docker-compose restart db

# Verify database credentials
echo $POSTGRES_USERNAME
echo $POSTGRES_PASSWORD
```

#### Email Delivery Issues

```bash
# Verify SendGrid API key
curl -X "GET" "https://api.sendgrid.com/v3/user/account" \
  -H "Authorization: Bearer YOUR_API_KEY"

# Check email service logs
docker-compose logs api | grep email

# Verify SendGrid configuration
echo $SENDGRID_API_KEY
echo $SENDGRID_FROM_EMAIL
```

#### Authentication Issues

```bash
# Verify JWT configuration
echo $JWT_SECRET
echo $JWT_REFRESH_SECRET

# Check token expiration settings
echo $JWT_EXPIRES_IN
echo $JWT_REFRESH_EXPIRES_IN

# Verify user credentials
# Check database user table for correct password hash
```

#### File Upload Issues

```bash
# Verify AWS S3 configuration
echo $AWS_S3_BUCKET_NAME
echo $AWS_ACCESS_KEY_ID
echo $AWS_S3_REGION

# Test S3 bucket access
aws s3 ls s3://your-bucket-name

# Check file size limits
# Default NestJS limit: 10MB
```

### Debug Mode

```bash
# Start in debug mode
npm run start:debug

# Debug tests
npm run test:debug

# Enable verbose logging
# Set LOG_LEVEL=debug in environment
```

### Logging

```bash
# View application logs
docker-compose logs -f api

# View database logs
docker-compose logs -f db

# PM2 logs (production)
pm2 logs personal-blog-api

# View specific module logs
docker-compose logs api | grep "AuthModule"
```

### Performance Issues

```bash
# Check database query performance
# Enable Sequelize logging in configuration

# Monitor database connections
docker exec -it personal-blog-api-db psql -U username -d personal_blog
SELECT * FROM pg_stat_activity;

# Check PM2 metrics
pm2 monit
```

### Common Error Codes

- **401 Unauthorized**: Invalid or expired JWT token
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: Resource not found
- **422 Unprocessable Entity**: Validation error
- **500 Internal Server Error**: Server-side error

## Project Structure Summary

```
personal-blog-api/
├── src/
│   ├── main.ts                          # Application entry point
│   ├── app.module.ts                    # Root module
│   ├── modules/                         # Feature modules (23 modules)
│   ├── models/                          # Sequelize models (36 models)
│   ├── dto/                             # Request/response DTOs
│   ├── shared/                          # Global services
│   ├── guards/                          # Authentication guards
│   ├── interceptors/                    # Transaction interceptor
│   ├── decorators/                      # Custom decorators
│   ├── pipes/                           # Validation pipes
│   ├── exceptions/                      # Custom exceptions (44+ classes)
│   ├── database/                        # Seeders and configuration
│   └── libs/                            # Interfaces, enums, utilities
├── test/                                # E2E tests
├── .env.development                     # Development environment
├── .env.production                      # Production environment
├── docker-compose.yml                   # Docker Compose configuration
├── Dockerfile                           # Docker image definition
├── nest-cli.json                        # NestJS CLI configuration
├── tsconfig.json                        # TypeScript configuration
├── package.json                         # Dependencies and scripts
└── README.md                            # This file
```

## Related Projects

- **Frontend**: Personal Blog Frontend - Angular SSR application with content management interface

## Contributing

This is a personal project. For questions or suggestions, please use the contact form on the deployed application.

## License

See LICENSE file for details.

---

**Built with NestJS, TypeScript, and modern web technologies.**
