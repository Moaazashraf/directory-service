# 📁 Directory - File Management & Processing System

A robust, production-ready file management and processing system built with NestJS, featuring JWT authentication, PostgreSQL database with Kysely query builder, and comprehensive audit logging.

[![NestJS](https://img.shields.io/badge/NestJS-11.0.1-E0234E?logo=nestjs)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql)](https://www.postgresql.org/)
[![Kysely](https://img.shields.io/badge/Kysely-0.27.5-orange)](https://kysely.dev/)
[![License](https://img.shields.io/badge/License-UNLICENSED-red)](LICENSE)

---

## 🌟 Features

### 🔐 Authentication & Security

- **JWT-based Authentication** with secure token management
- **Password Hashing** using bcrypt (industry standard)
- **User Registration & Login** with validation
- **Role-based Access Control** (extensible for future roles)
- **Audit Logging** for all critical user actions

### 📂 File Management

- **File Upload** with metadata tracking
- **File Organization** by user and upload date
- **Secure File Storage** with sanitized filenames
- **File Validation** (type, size, format)
- **Database-backed File Tracking**

### 🗄️ Database & Migrations

- **PostgreSQL** for reliable data persistence
- **Kysely Query Builder** for type-safe SQL queries
- **Migration System** for database versioning
- **Type Generation** from database schema
- **Connection Pooling** for optimal performance

### 📊 Monitoring & Logging

- **Request Logging** middleware for all API calls
- **Audit Trails** for security and compliance
- **Structured Logging** for easier debugging
- **Error Tracking** with detailed stack traces

---

## 🏗️ Architecture

```
src/
├── auth/                    # Authentication module (JWT, login, registration)
├── users/                   # User management module
├── files/                   # File upload and management module
├── logs/                    # Audit logging module
├── repository/              # Database layer (Kysely queries)
│   ├── types/              # Auto-generated TypeScript types from DB schema
│   └── database.ts         # Database connection and query builder
├── migrations/             # Database migrations (versioned schema changes)
├── middleware/             # Custom middleware (logging, etc.)
├── dtos/                   # Data Transfer Objects (validation schemas)
└── main.ts                 # Application entry point
```

### Key Design Patterns

- **Repository Pattern** for data access abstraction
- **Dependency Injection** for loose coupling
- **Middleware Pipeline** for request processing
- **DTO Pattern** for input validation and transformation
- **Module-based Architecture** for separation of concerns

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x
- **PostgreSQL** >= 16.x
- **Docker** (optional, for containerized development)

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd directory
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
# Database Configuration
DATABASE_URL=postgres://postgres:postgres@localhost:5439/directory

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=1h

# Application Configuration
PORT=3000
NODE_ENV=development

# File Upload Configuration
MAX_FILE_SIZE=10485760  # 10MB in bytes
UPLOAD_DIR=./uploads
```

4. **Start PostgreSQL Database**

Using Docker Compose (recommended):

```bash
docker-compose up -d
```

Or start your own PostgreSQL instance on port 5439.

5. **Run Database Migrations**

```bash
npm run migration:latest
```

This will create all necessary tables:

- `users` - User accounts with authentication
- `files` - File metadata and tracking

6. **Generate TypeScript Types from Database Schema**

```bash
npm run kysely:generate
```

This generates type-safe interfaces in `src/repository/types/db.d.ts`.

---

## 🎯 Usage

### Development Mode

Start the application with hot-reload:

```bash
npm run start:dev
```

The API will be available at `http://localhost:3000`

### Production Build

```bash
# Build the application
npm run build

# Start in production mode
npm run start:prod
```

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint         | Description              | Auth Required |
| ------ | ---------------- | ------------------------ | ------------- |
| POST   | `/auth/register` | Create new user account  | No            |
| POST   | `/auth/login`    | Login and get JWT token  | No            |
| GET    | `/auth/profile`  | Get current user profile | Yes           |

### Example: User Registration

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePassword123!",
    "name": "John Doe"
  }'
```

### Example: Login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePassword123!"
  }'
```

Response:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid-here",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### Using Protected Endpoints

Include the JWT token in the Authorization header:

```bash
curl -X GET http://localhost:3000/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 🗃️ Database Management

### Available Migration Commands

```bash
# Create a new migration
npm run migration:generate my_migration_name

# Apply all pending migrations
npm run migration:latest

# Run next pending migration
npm run migration:up

# Rollback last migration
npm run migration:down

# List all migrations
npm run migration:list

# Rollback to previous state
npm run migration:rollback
```

### Database Schema

#### Users Table

- `id` (UUID, Primary Key)
- `email` (Unique, Indexed)
- `password` (Bcrypt hashed)
- `name` (User display name)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

#### Files Table

- `id` (UUID, Primary Key)
- `user_id` (Foreign Key to users)
- `filename` (Original file name)
- `path` (Storage location)
- `mime_type` (File type)
- `size` (File size in bytes)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

---

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run e2e tests
npm run test:e2e

# Generate test coverage report
npm run test:cov
```

---

## 🔧 Development Tools

### Code Quality

```bash
# Lint code
npm run lint

# Format code
npm run format
```

### Debugging

```bash
# Start in debug mode
npm run start:debug
```

Attach your debugger to `localhost:9229`

---

## 🐳 Docker Support

### Build and Run with Docker Compose

```bash
# Start all services (app + database)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Stop and remove volumes (clears database)
docker-compose down -v
```

### Docker Services

- **postgres**: PostgreSQL 16 database on port 5439
- **Volume**: `postgres_data` for persistent data storage

---

## 📁 Project Structure Details

### Key Modules

**AuthModule**

- Handles user authentication and authorization
- JWT strategy implementation
- Login/Register controllers and services

**UsersModule**

- User management and profile operations
- User repository for database operations

**FilesModule**

- File upload and management
- File metadata storage

**LogsModule**

- Audit logging for security and compliance
- Request/response logging

### Configuration

The application uses `@nestjs/config` for environment management:

- `.env` file for local development
- Environment variables for production
- Global configuration accessible throughout the app

---

## 🔒 Security Best Practices

1. **Password Security**

   - Passwords are hashed with bcrypt (10 salt rounds)
   - Never stored or logged in plain text
   - Minimum complexity requirements enforced

2. **JWT Tokens**

   - Signed with strong secret key
   - Configurable expiration time
   - Validated on every protected request

3. **Input Validation**

   - All inputs validated with `class-validator`
   - DTOs (Data Transfer Objects) for type safety
   - Sanitization of user inputs

4. **Audit Logging**

   - All authentication attempts logged
   - User actions tracked for compliance
   - IP addresses and timestamps recorded

5. **Database Security**
   - Parameterized queries prevent SQL injection
   - Connection string stored in environment variables
   - Database credentials never committed to repository

---

## 📝 Scripts Reference

| Script                       | Description                       |
| ---------------------------- | --------------------------------- |
| `npm run build`              | Build production bundle           |
| `npm run start`              | Start application                 |
| `npm run start:dev`          | Start with hot-reload             |
| `npm run start:debug`        | Start in debug mode               |
| `npm run start:prod`         | Start production build            |
| `npm run lint`               | Lint code with ESLint             |
| `npm run format`             | Format code with Prettier         |
| `npm run test`               | Run unit tests                    |
| `npm run test:watch`         | Run tests in watch mode           |
| `npm run test:cov`           | Generate coverage report          |
| `npm run test:e2e`           | Run end-to-end tests              |
| `npm run migration:generate` | Create new migration              |
| `npm run migration:latest`   | Run all migrations                |
| `npm run migration:up`       | Run next migration                |
| `npm run migration:down`     | Rollback migration                |
| `npm run kysely:generate`    | Generate TypeScript types from DB |

---

## 🛠️ Technology Stack

### Core Framework

- **NestJS 11.0.1** - Progressive Node.js framework
- **TypeScript 5.7.3** - Type-safe JavaScript
- **Node.js 18+** - JavaScript runtime

### Database

- **PostgreSQL 16** - Relational database
- **Kysely 0.27.5** - Type-safe SQL query builder
- **pg 8.13.1** - PostgreSQL client

### Authentication

- **JWT** - JSON Web Tokens for auth
- **bcrypt 6.0.0** - Password hashing
- **Passport** - Authentication middleware

### Validation

- **class-validator 0.14.2** - Decorator-based validation
- **class-transformer 0.5.1** - Object transformation

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Jest** - Testing framework
- **Supertest** - HTTP testing

---

## 🚧 Roadmap & Future Enhancements

### Planned Features

- [ ] **File Processing Queue** (Bull + Redis for async processing)
- [ ] **PDF Text Extraction** (Automated content extraction)
- [ ] **Image OCR** (Optical Character Recognition)
- [ ] **CSV/Excel Parsing** (Structured data extraction)
- [ ] **Real-time Updates** (WebSocket notifications)
- [ ] **User Dashboard** (Analytics and metrics)
- [ ] **Admin Panel** (System-wide management)
- [ ] **API Documentation** (Swagger/OpenAPI)
- [ ] **Rate Limiting** (Protect against abuse)
- [ ] **Email Verification** (Account activation)
- [ ] **Password Reset** (Forgot password flow)
- [ ] **Multi-file Upload** (Drag-and-drop interface)

### Infrastructure Improvements

- [ ] Redis caching layer
- [ ] Horizontal scaling support
- [ ] Monitoring and alerting (Prometheus/Grafana)
- [ ] CI/CD pipeline
- [ ] Automated backups
- [ ] Performance optimization
- [ ] Load balancing

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Coding Standards

- Follow TypeScript best practices
- Write unit tests for new features
- Update documentation as needed
- Use conventional commit messages
- Ensure all tests pass before submitting

---

## 📄 License

This project is **UNLICENSED** - Private/Proprietary software.

---

## 👥 Authors

- **Moaz Ashraf** - Initial work

---

## 🙏 Acknowledgments

- [NestJS](https://nestjs.com/) - The progressive Node.js framework
- [Kysely](https://kysely.dev/) - Type-safe SQL query builder
- [PostgreSQL](https://www.postgresql.org/) - The world's most advanced open source database
- Full project requirements and architecture details can be found in [project-breakdown.md](project-breakdown.md)

---

## 📚 Additional Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [Kysely Documentation](https://kysely.dev/docs/intro)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Project Breakdown](project-breakdown.md) - Detailed technical specifications

---

**Built with ❤️ using NestJS, TypeScript, and PostgreSQL**
