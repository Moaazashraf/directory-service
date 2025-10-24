# File Upload and Analysis System - Complete Project Breakdown

---

## PART 1: PRODUCT MANAGER BREAKDOWN

---

### Epic 1: Authentication & Authorization System

#### Ticket 1.1: User Authentication (JWT Implementation)

**Priority:** High

**User Story:**
As a user, I want to register and login to the system, so that I can securely access my files and data.

**Description:**
Implement a complete JWT-based authentication system with secure password hashing and token management.

**Acceptance Criteria:**

- User can register with email and password
- Passwords are hashed using bcrypt before storage
- User can login and receive a JWT token
- JWT tokens expire after a configurable time period
- Refresh token mechanism is implemented
- Failed login attempts are tracked and logged
- Password validation includes minimum requirements (length, complexity)

**Dependencies:**

- None (foundational ticket)

**Technical Requirements:**

- JWT token generation and validation
- Bcrypt password hashing
- Database schema for users table
- Error handling for duplicate emails

---

#### Ticket 1.2: Role-Based Access Control (RBAC)

**Priority:** High

**User Story:**
As an admin, I want to have elevated permissions to manage other users, so that I can maintain system security and user management.

**Description:**
Implement role-based access control with guards and interceptors to enforce permission boundaries.

**Acceptance Criteria:**

- Two roles defined: 'user' and 'admin'
- Guards implemented to protect routes based on roles
- Admin can view all users and their files
- Regular users can only access their own data
- Unauthorized access attempts return 403 Forbidden
- Role is assigned during registration (default: user)
- Interceptors log role-based access attempts

**Dependencies:**

- Ticket 1.1 (User Authentication)

**Technical Requirements:**

- Role enum definition
- Custom guards for route protection
- Decorator for role checking
- Database column for user role

---

#### Ticket 1.3: User Profile Management

**Priority:** Medium

**User Story:**
As a user, I want to view and update my profile information, so that I can keep my account details current.

**Description:**
Create endpoints and UI for users to manage their profile information.

**Acceptance Criteria:**

- GET /auth/profile returns current user details
- PUT /auth/profile allows profile updates
- Users can update name, email (with verification)
- Users can change password (requires current password)
- Profile changes are logged in audit trail
- Frontend displays profile in a clean, editable form

**Dependencies:**

- Ticket 1.1 (User Authentication)

**Technical Requirements:**

- Profile update validation
- Email uniqueness check
- Password change with verification

---

### Epic 2: File Upload and Processing System

#### Ticket 2.1: File Upload Infrastructure

**Priority:** High

**User Story:**
As a user, I want to upload single or multiple files with drag-and-drop, so that I can easily submit files for processing.

**Description:**
Build the core file upload infrastructure with validation, storage, and metadata management.

**Acceptance Criteria:**

- POST /upload endpoint accepts single/multiple files
- File validation middleware checks:
  - File type (PDF, images, CSV, Excel)
  - File size (configurable max size, e.g., 10MB)
  - File name sanitization
- Files stored in organized directory structure (by user/date)
- File metadata saved to database (name, size, type, upload date, user_id)
- Progress tracking for large file uploads
- Drag-and-drop UI with visual feedback
- Upload progress bar shows percentage
- Success/error notifications displayed

**Dependencies:**

- Ticket 1.1 (User Authentication)

**Technical Requirements:**

- Multer or similar middleware for file handling
- File system organization strategy
- Database schema for files table
- Frontend file upload component with React Dropzone

---

#### Ticket 2.2: PDF Text Extraction

**Priority:** High

**User Story:**
As a user, I want text automatically extracted from my uploaded PDFs, so that I can search and analyze the content.

**Description:**
Implement PDF processing to extract text content, including multilingual support.

**Acceptance Criteria:**

- PDF files automatically queued for processing
- Text extraction works for standard PDFs
- Multilingual support (English, Spanish, and common languages)
- Extracted text stored in database
- Processing status tracked (pending, processing, completed, failed)
- Error handling for corrupted or password-protected PDFs
- First page preview generated as thumbnail

**Dependencies:**

- Ticket 2.1 (File Upload Infrastructure)
- Ticket 2.4 (Queue System)

**Technical Requirements:**

- pdf-lib or pdf2json library integration
- Character encoding handling for multilingual text
- Preview generation logic
- Async processing implementation

---

#### Ticket 2.3: Image OCR Processing

**Priority:** High

**User Story:**
As a user, I want text extracted from uploaded images using OCR, so that I can digitize printed or handwritten documents.

**Description:**
Implement OCR processing for image files to extract text content.

**Acceptance Criteria:**

- Supported formats: JPG, PNG, TIFF, BMP
- Tesseract or similar OCR engine integrated
- OCR accuracy logging and quality metrics
- Preprocessing applied (contrast enhancement, rotation correction)
- Extracted text stored with confidence scores
- Thumbnail preview generated for images
- Processing handles large images efficiently

**Dependencies:**

- Ticket 2.1 (File Upload Infrastructure)
- Ticket 2.4 (Queue System)

**Technical Requirements:**

- Tesseract.js or node-tesseract-ocr setup
- Image preprocessing pipeline
- Memory management for large images
- Error handling for low-quality images

---

#### Ticket 2.4: Async Queue Processing System

**Priority:** High

**User Story:**
As a system, I want to process files asynchronously using a queue, so that the application remains responsive during heavy processing.

**Description:**
Implement Bull queue with Redis for background job processing of uploaded files.

**Acceptance Criteria:**

- Bull queue configured with local Redis instance
- Separate queues for different file types (PDF, image, CSV)
- Job retry logic with exponential backoff
- Job progress tracking and updates
- Failed job handling and error logging
- Queue dashboard for monitoring (optional but recommended)
- Real-time status updates via WebSocket

**Dependencies:**

- Ticket 2.1 (File Upload Infrastructure)

**Technical Requirements:**

- Redis installation and configuration
- Bull module integration in NestJS
- Job processors for each file type
- Queue event handlers (completed, failed, progress)

---

#### Ticket 2.5: Structured Data Parsing (CSV/Excel)

**Priority:** Medium

**User Story:**
As a user, I want to upload CSV and Excel files and see the data parsed into a readable format, so that I can validate and analyze spreadsheet data.

**Description:**
Parse and extract structured data from CSV and Excel files.

**Acceptance Criteria:**

- CSV parsing with delimiter detection
- Excel file support (.xls, .xlsx)
- Column headers identified automatically
- Data validation and type detection
- Parsed data stored in structured format (JSON)
- Preview shows first 10-20 rows
- Large files handled efficiently (streaming for CSVs)

**Dependencies:**

- Ticket 2.1 (File Upload Infrastructure)
- Ticket 2.4 (Queue System)

**Technical Requirements:**

- papaparse for CSV
- xlsx or exceljs for Excel
- Streaming parser for large files
- Data type inference logic

---

#### Ticket 2.6: File Management and Retrieval

**Priority:** High

**User Story:**
As a user, I want to view, search, filter, and sort my uploaded files, so that I can easily find specific files and their results.

**Description:**
Create comprehensive file management endpoints and UI with advanced filtering.

**Acceptance Criteria:**

- GET /files returns paginated file list (default 20 per page)
- Filtering by:
  - File type (PDF, image, CSV, Excel)
  - Upload date range
  - Processing status
  - File name (partial match)
- Sorting by: name, upload date, size, status
- GET /files/:id returns detailed file info and extracted data
- Frontend table/grid view with sorting and filtering controls
- Quick search bar for file names
- Responsive design for mobile viewing

**Dependencies:**

- Ticket 2.1 (File Upload Infrastructure)

**Technical Requirements:**

- Query builder for complex filtering
- Pagination implementation (offset/cursor-based)
- Search index for performance (optional)
- Frontend data table component

---

### Epic 3: Dashboard and Analytics

#### Ticket 3.1: User Dashboard with Metrics

**Priority:** Medium

**User Story:**
As a user, I want to see a dashboard with statistics about my uploaded files, so that I can understand my usage patterns.

**Description:**
Build a visual dashboard displaying user file statistics and insights.

**Acceptance Criteria:**

- Total files uploaded count
- File type breakdown (pie/donut chart)
- Processing success/failure rate
- Storage used vs. quota (if applicable)
- Recent activity timeline
- Error rate trends over time
- Charts are interactive and responsive
- Data updates in real-time or near-real-time

**Dependencies:**

- Ticket 2.6 (File Management)

**Technical Requirements:**

- Aggregation queries for statistics
- Chart library (Chart.js, Recharts, or Victory)
- Dashboard layout components
- API endpoint for dashboard data

---

#### Ticket 3.2: Admin Dashboard

**Priority:** Low

**User Story:**
As an admin, I want to see system-wide statistics and manage users, so that I can monitor system health and user activity.

**Description:**
Create admin-specific dashboard with system-wide insights and user management.

**Acceptance Criteria:**

- View all users and their file counts
- System-wide statistics (total uploads, storage used)
- Recent user activity across the system
- Ability to view any user's files (read-only)
- User management (disable/enable accounts)
- Processing queue status and health
- Admin-only route protection

**Dependencies:**

- Ticket 1.2 (RBAC)
- Ticket 3.1 (User Dashboard)

**Technical Requirements:**

- Admin-specific endpoints
- User management capabilities
- System health monitoring
- Protected admin routes

---

### Epic 4: Audit Logs and Real-Time Features

#### Ticket 4.1: Audit Logging System

**Priority:** Medium

**User Story:**
As a system administrator, I want all critical user actions logged, so that I can audit security and troubleshoot issues.

**Description:**
Implement comprehensive audit logging for security and compliance.

**Acceptance Criteria:**

- Log events:
  - User login/logout
  - File uploads
  - File deletions
  - Profile changes
  - Failed authentication attempts
  - Role changes (admin actions)
- Each log includes: timestamp, user, action, IP address, result
- Logs stored in database with retention policy
- Frontend displays user's own logs
- Admin can view all logs
- Logs are searchable and filterable

**Dependencies:**

- Ticket 1.1 (Authentication)

**Technical Requirements:**

- Audit logs table schema
- Interceptor or middleware for automatic logging
- Log retention and archival strategy
- Logs API endpoint

---

#### Ticket 4.2: Real-Time Processing Updates

**Priority:** Medium

**User Story:**
As a user, I want to see real-time updates when my files are being processed, so that I know the current status without refreshing.

**Description:**
Implement WebSocket or SSE for real-time status updates during file processing.

**Acceptance Criteria:**

- WebSocket connection established on dashboard
- Real-time notifications for:
  - Processing started
  - Processing progress (percentage)
  - Processing completed
  - Processing failed with error message
- Notifications displayed as toast/snackbar
- Connection handles reconnection on network issues
- Updates pushed only to file owner

**Dependencies:**

- Ticket 2.4 (Queue System)

**Technical Requirements:**

- NestJS WebSocket Gateway or SSE
- Socket.IO or native WebSocket
- Frontend WebSocket client
- Event emission from queue processors

---

### Epic 5: Quality and Deployment

#### Ticket 5.1: Error Handling and Validation

**Priority:** High

**User Story:**
As a user, I want clear error messages when something goes wrong, so that I can understand and fix issues.

**Description:**
Implement comprehensive error handling across the entire application.

**Acceptance Criteria:**

- All endpoints have try-catch error handling
- Custom exception filters for different error types
- User-friendly error messages (no stack traces in production)
- Validation pipes for request data
- HTTP status codes used correctly
- Frontend displays errors in user-friendly format
- File upload errors clearly explain the issue (size, type, etc.)

**Dependencies:**

- All feature tickets

**Technical Requirements:**

- Global exception filter in NestJS
- Validation pipe with class-validator
- Error boundary in React
- Consistent error response format

---

#### Ticket 5.2: Testing Suite

**Priority:** Medium

**User Story:**
As a developer, I want comprehensive tests, so that I can confidently make changes without breaking existing functionality.

**Description:**
Write unit and integration tests for backend and frontend components.

**Acceptance Criteria:**

- Backend unit tests for:
  - Services (auth, file processing)
  - Controllers
  - Guards and interceptors
  - Utility functions
- Integration tests for API endpoints
- Frontend component tests
- E2E tests for critical flows (login, upload, view files)
- Test coverage > 70%
- CI/CD pipeline runs tests automatically

**Dependencies:**

- All feature tickets

**Technical Requirements:**

- Jest for unit/integration tests
- Supertest for API testing
- React Testing Library for frontend
- Playwright or Cypress for E2E
- Test database setup/teardown

---

#### Ticket 5.3: Dockerization and Deployment

**Priority:** Medium

**User Story:**
As a developer, I want the application containerized, so that it can be easily deployed to any environment.

**Description:**
Create Docker setup for easy development and deployment.

**Acceptance Criteria:**

- Dockerfile for backend
- Dockerfile for frontend
- Docker Compose orchestrating:
  - Backend service
  - Frontend service
  - PostgreSQL/SQLite database
  - Redis instance
- Environment variables properly configured
- Volume mounts for persistent data
- Multi-stage builds for optimization
- Documentation for running with Docker

**Dependencies:**

- All feature tickets

**Technical Requirements:**

- Multi-stage Docker builds
- Docker Compose v3+
- Environment configuration
- Health checks in containers

---

#### Ticket 5.4: API Documentation

**Priority:** Low

**User Story:**
As a developer integrating with the API, I want comprehensive documentation, so that I can understand all available endpoints.

**Description:**
Create interactive API documentation using Swagger/OpenAPI.

**Acceptance Criteria:**

- Swagger UI accessible at /api/docs
- All endpoints documented with:
  - Request parameters
  - Request body schemas
  - Response schemas
  - Authentication requirements
  - Example requests/responses
- Documentation auto-generated from decorators
- Postman collection exported (optional)

**Dependencies:**

- All API tickets

**Technical Requirements:**

- @nestjs/swagger module
- API decorators on all endpoints
- Schema definitions
- Authentication configuration in Swagger

---

#### Ticket 5.5: Responsive Design Implementation

**Priority:** Medium

**User Story:**
As a mobile user, I want the application to work seamlessly on my phone, so that I can access my files on the go.

**Description:**
Ensure complete responsiveness across all device sizes.

**Acceptance Criteria:**

- Mobile-first design approach
- Breakpoints: mobile (<768px), tablet (768-1024px), desktop (>1024px)
- Touch-friendly UI elements (buttons, dropdowns)
- File upload works on mobile devices
- Tables convert to cards on mobile
- Navigation adapts to mobile (hamburger menu)
- Tested on iOS and Android browsers

**Dependencies:**

- All frontend tickets

**Technical Requirements:**

- CSS media queries or Tailwind responsive classes
- Mobile testing tools
- Touch event handling
- Responsive component library

---

## PART 2: ENGINEERING BREAKDOWN

---

### Epic 1: Authentication & Authorization System

#### Ticket 1.1: User Authentication (JWT Implementation)

**Technical Plan:**

**Backend Architecture:**

```
src/auth/
├── auth.module.ts
├── auth.controller.ts
├── auth.service.ts
├── strategies/
│   └── jwt.strategy.ts
├── guards/
│   └── jwt-auth.guard.ts
├── dto/
│   ├── register.dto.ts
│   └── login.dto.ts
└── entities/
    └── user.entity.ts
```

**Key Components:**

1. **User Entity/Model:**

   - id (UUID)
   - email (unique, indexed)
   - password_hash
   - role (enum: user, admin)
   - created_at
   - updated_at
   - last_login_at

2. **Auth Service:**

   - `register(dto)`: Hash password, create user, return user object
   - `login(dto)`: Validate credentials, generate JWT, return token
   - `validateUser(email, password)`: Check credentials against DB
   - `generateToken(user)`: Create JWT with user payload

3. **JWT Strategy:**

   - Validates incoming JWT tokens
   - Extracts user payload
   - Attaches user to request object

4. **API Endpoints:**
   - POST /auth/register
   - POST /auth/login
   - GET /auth/profile (protected)

**Database Schema (TypeORM/Prisma):**

```typescript
// User entity includes:
// - password_hash (never expose in responses)
// - email validation
// - unique constraint on email
// - timestamps
```

**Security Considerations:**

- Bcrypt salt rounds: 10-12
- JWT secret: Store in environment variables
- Token expiration: 1 hour (access token), 7 days (refresh token)
- Password requirements: Min 8 chars, uppercase, lowercase, number
- Rate limiting on login endpoint

**Frontend Structure:**

```
app/
├── auth/
│   ├── login/
│   │   └── page.tsx
│   ├── register/
│   │   └── page.tsx
│   └── profile/
│       └── page.tsx
├── components/
│   └── AuthProvider.tsx
└── lib/
    └── auth.ts (API calls)
```

**State Management:**

- Store JWT in httpOnly cookie or localStorage
- Context API for auth state
- Redirect logic for protected routes

**What to Learn:**

- JWT structure (header, payload, signature)
- Bcrypt hashing mechanism
- NestJS Passport integration
- HTTP-only cookies vs localStorage security
- Token refresh strategy
- CSRF protection
- Next.js middleware for route protection

**Best Practices:**

- Never log or expose passwords
- Use DTOs with class-validator for input validation
- Implement rate limiting (e.g., 5 attempts per 15 min)
- Log failed login attempts
- Use secure JWT secret (256+ bits)
- Implement password reset flow (bonus)

**Pitfalls to Avoid:**

- Storing passwords in plain text
- Exposing sensitive data in JWT payload
- Not validating email format
- Missing unique constraint on email
- Not handling expired tokens gracefully
- Hardcoding secrets

---

#### Ticket 1.2: Role-Based Access Control (RBAC)

**Technical Plan:**

**Backend Architecture:**

```
src/auth/
├── decorators/
│   └── roles.decorator.ts
├── guards/
│   ├── jwt-auth.guard.ts
│   └── roles.guard.ts
└── enums/
    └── role.enum.ts
```

**Key Components:**

1. **Role Enum:**

```typescript
enum Role {
  USER = 'user',
  ADMIN = 'admin',
}
```

2. **Roles Decorator:**

```typescript
// @Roles(Role.ADMIN)
// Applied to controller methods
```

3. **Roles Guard:**

- Checks user role from JWT payload
- Compares against required roles from decorator
- Returns 403 if unauthorized

4. **Authorization Logic:**

- JWT payload includes user role
- Guards check role before allowing access
- Interceptor logs access attempts

**Database Changes:**

- Add 'role' column to users table (default: 'user')
- Create migration for existing users

**API Updates:**

- Admin-only endpoints get @Roles(Role.ADMIN)
- User endpoints get @Roles(Role.USER, Role.ADMIN)

**Frontend Protection:**

```typescript
// Role-based component rendering
{user.role === 'admin' && <AdminPanel />}

// Route protection in middleware
if (requiredRole && user.role !== requiredRole) {
  redirect('/unauthorized')
}
```

**What to Learn:**

- NestJS Guards execution order
- Custom decorators in NestJS
- Reflector API for metadata
- ExecutionContext in NestJS
- Role-based UI rendering patterns
- Protected routes in Next.js

**Best Practices:**

- Guards should be composable
- Use enums for roles (not strings)
- Log authorization failures
- Provide clear error messages
- Test with different role combinations
- Consider future role expansion (moderator, etc.)

**Pitfalls to Avoid:**

- Client-side only role checks (always verify server-side)
- Forgetting to apply guards to sensitive endpoints
- Not handling missing role in JWT
- Hardcoding roles instead of using enums
- Exposing admin features in client bundle

---

#### Ticket 1.3: User Profile Management

**Technical Plan:**

**Backend:**

```
src/users/
├── users.module.ts
├── users.controller.ts
├── users.service.ts
└── dto/
    └── update-profile.dto.ts
```

**Key Components:**

1. **Profile Endpoints:**

   - GET /auth/profile: Return current user (from JWT)
   - PUT /auth/profile: Update profile fields
   - PUT /auth/change-password: Change password

2. **Update Logic:**
   - Validate new data
   - Check email uniqueness if changing email
   - Hash new password if changing password
   - Require current password for password change

**Frontend:**

```
app/profile/
└── page.tsx (profile form)
```

**Form Fields:**

- Name (text input)
- Email (email input)
- Current password (for changes)
- New password (if changing)
- Confirm new password

**What to Learn:**

- Partial updates in TypeORM/Prisma
- Form validation with react-hook-form
- Optimistic updates
- Success/error notifications

**Best Practices:**

- Validate email uniqueness asynchronously
- Re-authenticate for sensitive changes
- Show success feedback
- Handle validation errors gracefully

**Pitfalls to Avoid:**

- Allowing role changes via profile update
- Not validating email format
- Allowing password change without current password
- Not updating JWT after profile changes (re-login may be needed)

---

### Epic 2: File Upload and Processing System

#### Ticket 2.1: File Upload Infrastructure

**Technical Plan:**

**Backend Architecture:**

```
src/files/
├── files.module.ts
├── files.controller.ts
├── files.service.ts
├── dto/
│   └── upload-file.dto.ts
├── entities/
│   └── file.entity.ts
├── middleware/
│   └── file-validation.middleware.ts
└── storage/
    └── storage.service.ts
```

**Key Components:**

1. **File Entity:**

```typescript
{
  id: UUID
  user_id: UUID (foreign key)
  original_name: string
  stored_name: string (unique, sanitized)
  mime_type: string
  size: number (bytes)
  file_path: string
  status: enum (pending, processing, completed, failed)
  processing_result: JSON (extracted data)
  error_message: string (nullable)
  uploaded_at: timestamp
  processed_at: timestamp (nullable)
}
```

2. **File Storage Strategy:**

```
uploads/
└── {user_id}/
    └── {year}/
        └── {month}/
            └── {unique_filename}
```

3. **File Validation Middleware:**

- Check MIME type (application/pdf, image/\*, text/csv, application/vnd.ms-excel)
- Check file size (e.g., max 10MB)
- Sanitize filename (remove special chars, limit length)
- Check file extension matches MIME type

4. **Storage Service:**

- `saveFile(file, userId)`: Save to filesystem, return path
- `deleteFile(filePath)`: Remove from filesystem
- `getFileStream(filePath)`: Return file stream for download

5. **API Endpoints:**

```typescript
POST /files/upload
- Multipart form data
- Single or multiple files
- Returns file metadata array

GET /files/download/:id
- Requires authentication
- Checks file ownership
- Streams file to client
```

**Frontend:**

```tsx
components/
└── FileUpload/
    ├── DropZone.tsx
    ├── UploadProgress.tsx
    └── FileList.tsx
```

**Upload Flow:**

1. User drops/selects files
2. Client validates file types/sizes
3. Upload with progress tracking (XMLHttpRequest or axios)
4. Display progress bar per file
5. Show success/error for each file
6. Refresh file list on completion

**What to Learn:**

- Multer middleware in NestJS
- Multipart form data handling
- File stream handling in Node.js
- React Dropzone library
- FormData API for file uploads
- Progress events in axios/fetch
- File MIME type detection
- Path sanitization techniques

**Best Practices:**

- Use streams for large files
- Generate unique filenames (UUID + extension)
- Store files outside web root
- Implement virus scanning (ClamAV) if production
- Set max file size at both client and server
- Clean up orphaned files (cron job)
- Use presigned URLs for direct uploads (advanced)

**Pitfalls to Avoid:**

- Accepting any file type (security risk)
- Storing files with original names (path traversal risk)
- Not limiting upload size (DoS risk)
- Storing files in database (use filesystem)
- Not handling upload interruptions
- Missing file ownership checks on download
- Not cleaning up files on processing failure

---

#### Ticket 2.2: PDF Text Extraction

**Technical Plan:**

**Backend:**

```
src/processing/
├── processing.module.ts
├── processors/
│   ├── pdf.processor.ts
│   ├── image.processor.ts
│   └── csv.processor.ts
└── services/
    ├── pdf-extraction.service.ts
    └── preview.service.ts
```

**Key Components:**

1. **PDF Extraction Service:**

```typescript
class PdfExtractionService {
  async extractText(filePath: string): Promise<string>;
  async extractMetadata(filePath: string): Promise<object>;
  async generatePreview(filePath: string): Promise<Buffer>;
}
```

2. **PDF Processor (Bull Queue Job):**

```typescript
@Processor('pdf-processing')
class PdfProcessor {
  @Process('extract')
  async handleExtraction(job: Job) {
    // Extract text
    // Update file status
    // Emit WebSocket event
    // Handle errors
  }
}
```

3. **Libraries to Use:**

- `pdf-parse`: Simple PDF text extraction
- `pdf-lib`: More advanced PDF manipulation
- `pdf2pic`: Generate thumbnail from first page

4. **Processing Flow:**
1. File uploaded → Create job in PDF queue
1. Processor picks up job
1. Extract text using pdf-parse
1. Generate thumbnail of first page
1. Store results in file.processing_result
1. Update status to 'completed'
1. Emit WebSocket event to user

**Multilingual Handling:**

- Most PDF text extraction libraries handle Unicode automatically
- May need to specify encoding for older PDFs
- Store text in UTF-8

**Database Storage:**

```typescript
processing_result: {
  text: string (full extracted text)
  page_count: number
  language: string (detected)
  confidence: number
  metadata: {
    author: string
    title: string
    created_at: date
  }
}
```

**What to Learn:**

- PDF structure and text layers
- pdf-parse or pdf-lib API
- Character encoding (UTF-8, Latin1, etc.)
- Language detection libraries (franc, langdetect)
- Sharp or ImageMagick for thumbnails
- Error handling for corrupted PDFs

**Best Practices:**

- Set timeout for long-running extractions
- Implement retry logic (max 3 attempts)
- Log extraction metrics (time, page count)
- Handle password-protected PDFs gracefully
- Clean up temp files after processing
- Store metadata separately from text

**Pitfalls to Avoid:**

- Not handling scanned PDFs (no text layer)
- Memory leaks with large PDFs
- Blocking event loop (use queue)
- Not validating PDF structure
- Missing error handling for corrupted files
- Storing entire PDF text in memory

---

#### Ticket 2.3: Image OCR Processing

**Technical Plan:**

**Key Components:**

1. **OCR Service:**

```typescript
class OcrService {
  async extractText(imagePath: string): Promise<OcrResult>;
  async preprocessImage(imagePath: string): Promise<Buffer>;
  async generateThumbnail(imagePath: string): Promise<Buffer>;
}
```

2. **Image Preprocessing:**

- Grayscale conversion
- Contrast enhancement
- Noise reduction
- Deskew (rotation correction)
- Resize for optimal OCR (300 DPI)

3. **Libraries:**

- `tesseract.js` or `node-tesseract-ocr`: OCR engine
- `sharp`: Image preprocessing and thumbnails
- `jimp`: Alternative image manipulation

4. **OCR Processor:**

```typescript
@Processor('ocr-processing')
class OcrProcessor {
  @Process('extract')
  async handleOcr(job: Job) {
    // Preprocess image
    // Run OCR
    // Store confidence scores
    // Generate thumbnail
    // Update file status
  }
}
```

**Processing Flow:**

1. Image uploaded → Create job in OCR queue
2. Preprocess image (enhance quality)
3. Run Tesseract OCR
4. Extract text with confidence scores
5. Generate thumbnail
6. Store results
7. Update status and notify user

**Database Storage:**

```typescript
processing_result: {
  text: string;
  confidence: number(0 - 100);
  language: string;
  blocks: Array<{
    text: string;
    confidence: number;
    bbox: { x; y; width; height };
  }>;
}
```

**What to Learn:**

- OCR technology basics (Tesseract)
- Image preprocessing techniques
- EXIF data handling
- Memory management for large images
- Worker threads in Node.js (for CPU-intensive tasks)
- Sharp API for image manipulation

**Best Practices:**

- Preprocess images for better accuracy
- Set language hints to improve results
- Log confidence scores for quality metrics
- Handle low-resolution images gracefully
- Implement quality checks (reject very low confidence)
- Use worker threads for CPU-intensive OCR
- Cache preprocessed images temporarily

**Pitfalls to Avoid:**

- Running OCR synchronously (blocks server)
- Not handling image orientation (EXIF)
- Memory issues with large images
- Poor results without preprocessing
- Not setting Tesseract language
- Missing timeout for long OCR jobs

---

#### Ticket 2.4: Async Queue Processing System

**Technical Plan:**

**Backend Architecture:**

```
src/queue/
├── queue.module.ts
├── queue.service.ts
└── processors/
    ├── pdf.processor.ts
    ├── ocr.processor.ts
    └── csv.processor.ts
```

**Key Components:**

1. **Queue Configuration:**

```typescript
// Multiple queues for different file types
BullModule.registerQueue(
  { name: 'pdf-processing' },
  { name: 'ocr-processing' },
  { name: 'csv-processing' },
);
```

2. **Queue Service:**

```typescript
class QueueService {
  addToQueue(fileId: string, fileType: string, filePath: string);
  getJobStatus(jobId: string);
  cancelJob(jobId: string);
}
```

3. **Job Lifecycle:**

- created → waiting → active → completed/failed
- Each job has: id, data, progress, result, error

4. **Redis Configuration:**

```typescript
{
  host: 'localhost',
  port: 6379,
  retryStrategy: (times) => Math.min(times * 50, 2000)
}
```

5. **Retry Logic:**

```typescript
{
  attempts: 3,
  backoff: {
    type: 'exponential',
    delay: 2000
  }
}
```

6. **Job Progress Tracking:**

```typescript
// In processor
job.progress(50); // 50% complete
// Emit via WebSocket to frontend
```

**Processor Template:**

```typescript
@Processor('queue-name')
export class FileProcessor {
  @Process('job-type')
  async processFile(job: Job<JobData>) {
    try {
      await job.progress(0);
      // Processing logic
      await job.progress(50);
      // More processing
      await job.progress(100);
      return { success: true, data: extractedData };
    } catch (error) {
      // Error handling
      throw error; // Triggers retry
    }
  }

  @OnQueueCompleted()
  async onCompleted(job: Job, result: any) {
    // Update database
    // Emit WebSocket event
  }

  @OnQueueFailed()
  async onFailed(job: Job, error: Error) {
    // Log error
    // Update file status to 'failed'
    // Emit error notification
  }
}
```

**What to Learn:**

- Bull queue architecture
- Redis data structures
- Job patterns (worker, producer)
- Concurrency control
- Event-driven architecture
- Backpressure handling
- Queue monitoring (Bull Board)

**Best Practices:**

- Separate queues by priority/type
- Set job timeouts (e.g., 5 minutes)
- Implement idempotent processors
- Use job data versioning
- Monitor queue health metrics
- Implement circuit breaker for external services
- Clean up completed jobs periodically
- Use named jobs for easier debugging

**Pitfalls to Avoid:**

- Storing large data in job payload (use references)
- Not handling job timeouts
- Missing error boundaries
- Creating circular job dependencies
- Not monitoring queue memory usage
- Forgetting to close Redis connections
- Not testing retry behavior
- Overloading single queue with different job types

---

#### Ticket 2.5: Structured Data Parsing (CSV/Excel)

**Technical Plan:**

**Key Components:**

1. **CSV Parser Service:**

```typescript
class CsvParserService {
  async parseFile(filePath: string): Promise<ParsedData>;
  detectDelimiter(sample: string): string;
  inferColumnTypes(data: any[]): ColumnTypes;
}
```

2. **Excel Parser Service:**

```typescript
class ExcelParserService {
  async parseFile(filePath: string): Promise<ParsedData>;
  getSheetNames(filePath: string): string[];
  parseSheet(filePath: string, sheetIndex: number): ParsedData;
}
```

3. **Libraries:**

- `papaparse`: CSV parsing with auto-delimiter detection
- `xlsx`: Excel file parsing (both .xls and .xlsx)
- `csv-parser`: Streaming CSV parser for large files

4. **Data Structure:**

```typescript
interface ParsedData {
  headers: string[];
  rows: any[][];
  columnTypes: {
    [header: string]: 'string' | 'number' | 'date' | 'boolean';
  };
  rowCount: number;
  metadata: {
    sheetName?: string;
    encoding?: string;
  };
}
```

5. **CSV Processor:**

```typescript
@Processor('csv-processing')
class CsvProcessor {
  @Process('parse')
  async handleParsing(job: Job) {
    // Detect delimiter
    // Parse CSV (streaming for large files)
    // Infer column types
    // Store sample data (first 100 rows)
    // Store full data count
  }
}
```

**Type Inference Logic:**

```typescript
// Sample data to detect types
// Check if all values parse as number, date, etc.
// Default to string if mixed types
```

**Database Storage:**

```typescript
processing_result: {
  headers: string[]
  sample_data: any[][] (first 20 rows)
  row_count: number
  column_types: object
  delimiter: string (for CSV)
  encoding: string
}
```

**Large File Handling:**

- Stream large CSVs (don't load entire file in memory)
- For Excel, process sheet by sheet
- Store summary + sample instead of full data
- Option to re-parse on demand

**What to Learn:**

- CSV format edge cases (quotes, escapes, multiline)
- Excel file formats (.xls vs .xlsx binary vs XML)
- Streaming file processing in Node.js
- Data type inference algorithms
- Character encoding detection
- Memory-efficient data handling

**Best Practices:**

- Auto-detect delimiter (comma, tab, semicolon)
- Handle CSV edge cases (quoted fields, embedded newlines)
- Limit stored data (sample only)
- Infer types from multiple rows
- Support multiple sheets in Excel
- Handle empty cells gracefully
- Provide download of full parsed data

**Pitfalls to Avoid:**

- Loading entire CSV into memory
- Not handling different encodings (UTF-8, Latin1)
- Missing quoted field handling
- Assuming first row is always headers
- Not validating Excel file structure
- Missing error handling for corrupted files
- Not supporting both .xls and .xlsx

---

#### Ticket 2.6: File Management and Retrieval

**Technical Plan:**

**Backend:**

```
src/files/
├── files.controller.ts
├── files.service.ts
└── dto/
    └── file-query.dto.ts
```

**API Endpoints:**

```typescript
GET /files?page=1&limit=20&type=pdf&status=completed&sort=uploadedAt:desc&search=report

Response: {
  data: File[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

GET /files/:id
Response: {
  id, name, type, size, uploadedAt,
  processingResult, status, thumbnail
}
```

**Query DTO:**

```typescript
class FileQueryDto {
  page?: number = 1;
  limit?: number = 20;
  type?: string; // pdf, image, csv, excel
  status?: string; // pending, processing, completed, failed
  sort?: string; // field:direction (e.g., 'uploadedAt:desc')
  search?: string; // partial name match
  dateFrom?: Date;
  dateTo?: Date;
}
```

**Service Implementation:**

```typescript
class FilesService {
  async findAll(userId: string, query: FileQueryDto) {
    // Build query with filters
    // Apply pagination
    // Apply sorting
    // Execute and return results + metadata
  }

  async findOne(id: string, userId: string) {
    // Check ownership
    // Return file with full processing result
  }
}
```

**Query Building (TypeORM example):**

```typescript
const queryBuilder = repository
  .createQueryBuilder('file')
  .where('file.userId = :userId', { userId });

if (query.type) {
  queryBuilder.andWhere('file.mimeType LIKE :type', {
    type: `%${query.type}%`,
  });
}

if (query.search) {
  queryBuilder.andWhere('file.originalName LIKE :search', {
    search: `%${query.search}%`,
  });
}

// Add pagination
queryBuilder.skip((query.page - 1) * query.limit);
queryBuilder.take(query.limit);

// Add sorting
const [field, direction] = query.sort.split(':');
queryBuilder.orderBy(`file.${field}`, direction.toUpperCase());
```

**Frontend:**

```tsx
components/files/
├── FileTable.tsx
├── FileFilters.tsx
├── SearchBar.tsx
├── FileCard.tsx (mobile view)
└── Pagination.tsx
```

**State Management:**

- React Query for data fetching
- Query params in URL for filters
- Debounced search input
- Optimistic updates

**UI Features:**

- Table view (desktop) / Card view (mobile)
- Column sorting (click headers)
- Filter dropdown/chips
- Search bar with debounce
- Pagination controls
- Row selection (for bulk actions)

**What to Learn:**

- Query builder patterns
- SQL pagination (OFFSET/LIMIT)
- Efficient filtering and indexing
- React Query (useQuery, useMutation)
- URL state management (next/navigation)
- Debounce techniques
- Responsive tables/cards
- Virtual scrolling (for large lists)

**Best Practices:**

- Index frequently filtered/sorted columns
- Use cursor-based pagination for better performance
- Validate and sanitize query parameters
- Return total count for pagination
- Cache query results
- Implement search indexing (full-text search)
- Optimize N+1 queries (eager loading)

**Pitfalls to Avoid:**

- SQL injection via unsanitized sort fields
- Missing authorization checks
- Not limiting max page size
- Loading all data at once
- Not handling empty results
- Missing indexes on filtered columns
- Over-fetching related data

---

### Epic 3: Dashboard and Analytics

#### Ticket 3.1: User Dashboard with Metrics

**Technical Plan:**

**Backend:**

```
src/analytics/
├── analytics.module.ts
├── analytics.controller.ts
└── analytics.service.ts
```

**API Endpoint:**

```typescript
GET /analytics/dashboard

Response: {
  totalFiles: number
  filesByType: { [type: string]: number }
  processingStats: {
    completed: number
    failed: number
    pending: number
  }
  storageUsed: number (bytes)
  recentActivity: Activity[]
  errorRate: number (percentage)
  trendsOverTime: TimeSeriesData[]
}
```

**Analytics Service:**

```typescript
class AnalyticsService {
  async getDashboardStats(userId: string) {
    // Aggregate queries
    const totalFiles = await this.filesRepo.count({ userId });
    const filesByType = await this.filesRepo
      .createQueryBuilder()
      .select('mimeType')
      .addSelect('COUNT(*)', 'count')
      .where('userId = :userId', { userId })
      .groupBy('mimeType')
      .getRawMany();

    // More aggregations...
    return {
      totalFiles,
      filesByType,
      // ...
    };
  }
}
```

**Frontend:**

```tsx
app/dashboard/
└── page.tsx

components/dashboard/
├── StatsCards.tsx
├── FileTypePieChart.tsx
├── ActivityTimeline.tsx
├── ErrorRateChart.tsx
└── RecentFiles.tsx
```

**Chart Components:**

1. **Stats Cards:**

   - Total Files (number)
   - Success Rate (percentage)
   - Storage Used (formatted size)
   - Processing (live count)

2. **Pie Chart:**

   - File types distribution
   - Interactive (click to filter)
   - Color-coded by type

3. **Activity Timeline:**

   - Recent uploads
   - Processing events
   - Errors

4. **Error Rate Line Chart:**
   - Success/failure over time
   - Last 7 days

**Chart Libraries:**

- Recharts (React + D3)
- Chart.js with react-chartjs-2
- Victory (React Native compatible)

**Data Fetching:**

```typescript
const { data, isLoading } = useQuery({
  queryKey: ['dashboard', userId],
  queryFn: fetchDashboardData,
  refetchInterval: 30000, // Refresh every 30s
});
```

**What to Learn:**

- SQL aggregate functions (COUNT, GROUP BY, SUM)
- Chart library APIs (Recharts recommended)
- Data visualization best practices
- Real-time data updates
- Responsive chart design
- Color theory for data viz

**Best Practices:**

- Cache dashboard data (1-5 min TTL)
- Optimize aggregation queries with indexes
- Use materialized views for complex metrics
- Lazy load charts on scroll
- Provide export functionality
- Show loading skeletons
- Format numbers (1.2K, 3.4M)

**Pitfalls to Avoid:**

- Running expensive queries on every request
- Not handling zero/null data gracefully
- Overwhelming users with too many metrics
- Charts not responsive on mobile
- Missing loading states
- Not considering colorblind users

---

#### Ticket 3.2: Admin Dashboard

**Technical Plan:**

**Backend:**

```typescript
GET /admin/dashboard (requires admin role)

Response: {
  systemStats: {
    totalUsers: number
    totalFiles: number
    totalStorage: number
  }
  topUsers: User[]
  recentActivity: Activity[]
  queueHealth: {
    waiting: number
    active: number
    failed: number
  }
}

GET /admin/users (paginated, filterable)
PUT /admin/users/:id/status (enable/disable)
```

**Admin Service:**

```typescript
class AdminService {
  async getSystemStats() {
    // System-wide aggregations
  }

  async getTopUsers(limit: number) {
    // Users with most uploads
  }

  async disableUser(userId: string) {
    // Soft delete or disable flag
  }
}
```

**Frontend:**

```tsx
app/admin/
├── dashboard/
│   └── page.tsx
└── users/
    └── page.tsx

components/admin/
├── SystemStatsCards.tsx
├── UserManagementTable.tsx
├── QueueMonitor.tsx
└── ActivityLog.tsx
```

**Features:**

- System-wide metrics
- User management table
- View any user's files (read-only)
- Disable/enable user accounts
- Queue health monitoring
- System activity log

**What to Learn:**

- Admin UI patterns
- User management UX
- System monitoring dashboards
- Role-based component rendering

**Best Practices:**

- Clearly distinguish admin UI (different color scheme)
- Audit all admin actions
- Require re-authentication for sensitive actions
- Provide bulk actions
- Export capabilities

**Pitfalls to Avoid:**

- Admin routes accessible to non-admins
- Missing audit logging
- Allowing user deletion (use soft delete)
- Not testing with large datasets

---

### Epic 4: Audit Logs and Real-Time Features

#### Ticket 4.1: Audit Logging System

**Technical Plan:**

**Backend:**

```
src/audit/
├── audit.module.ts
├── audit.service.ts
├── audit.interceptor.ts
└── entities/
    └── audit-log.entity.ts
```

**Audit Log Entity:**

```typescript
{
  id: UUID
  user_id: UUID
  action: string (login, upload, delete, etc.)
  resource_type: string (file, user, etc.)
  resource_id: string
  ip_address: string
  user_agent: string
  status: string (success, failure)
  error_message: string (nullable)
  metadata: JSON (additional context)
  timestamp: timestamp
}
```

**Audit Interceptor:**

```typescript
@Injectable()
export class AuditInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const action = this.extractAction(context);

    return next.handle().pipe(
      tap(() =>
        this.auditService.log({
          userId: user.id,
          action,
          status: 'success',
          ipAddress: request.ip,
          userAgent: request.headers['user-agent'],
        }),
      ),
      catchError((err) => {
        this.auditService.log({
          userId: user?.id,
          action,
          status: 'failure',
          errorMessage: err.message,
          ipAddress: request.ip,
        });
        throw err;
      }),
    );
  }
}
```

**API Endpoints:**

```typescript
GET /audit/logs?page=1&action=upload&dateFrom=2024-01-01
// Returns user's own logs (or all logs for admin)
```

**Frontend:**

```tsx
components/audit/
├── AuditLogTable.tsx
└── AuditLogFilters.tsx
```

**What to Learn:**

- NestJS Interceptors
- IP address extraction
- User agent parsing
- Log retention strategies
- GDPR compliance for logging

**Best Practices:**

- Log asynchronously (don't block request)
- Rotate logs (archive old logs)
- Index timestamp for fast queries
- Sanitize sensitive data (no passwords)
- Include request ID for correlation
- Use log levels (info, warning, error)

**Pitfalls to Avoid:**

- Logging sensitive data (passwords, tokens)
- Blocking requests to write logs
- Not handling log write failures
- Infinite log storage (implement retention)
- Missing timezone handling

---

#### Ticket 4.2: Real-Time Processing Updates

**Technical Plan:**

**Backend:**

```
src/websocket/
├── websocket.module.ts
├── websocket.gateway.ts
└── events/
    └── processing-events.ts
```

**WebSocket Gateway:**

```typescript
@WebSocketGateway({
  cors: { origin: '*' },
})
export class ProcessingGateway {
  @WebSocketServer()
  server: Server;

  notifyProcessingUpdate(userId: string, data: any) {
    this.server.to(`user:${userId}`).emit('processing-update', data);
  }

  @SubscribeMessage('join')
  handleJoin(client: Socket, userId: string) {
    client.join(`user:${userId}`);
  }
}
```

**Emit from Processor:**

```typescript
// In queue processor
@OnQueueProgress()
async onProgress(job: Job, progress: number) {
  this.processingGateway.notifyProcessingUpdate(job.data.userId, {
    fileId: job.data.fileId,
    status: 'processing',
    progress
  })
}

@OnQueueCompleted()
async onCompleted(job: Job, result: any) {
  this.processingGateway.notifyProcessingUpdate(job.data.userId, {
    fileId: job.data.fileId,
    status: 'completed',
    result
  })
}
```

**Frontend:**

```tsx
// WebSocket hook
const useProcessingUpdates = () => {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    const socket = io('http://localhost:3000');

    socket.emit('join', userId);

    socket.on('processing-update', (data) => {
      setUpdates((prev) => [...prev, data]);
      toast.success(`File ${data.fileId} ${data.status}`);
    });

    return () => socket.disconnect();
  }, [userId]);

  return updates;
};
```

**Notification UI:**

- Toast/Snackbar for updates
- Progress indicator in file list
- Badge count for pending files

**What to Learn:**

- WebSocket protocol
- Socket.IO (client + server)
- Room-based event emission
- Reconnection handling
- Next.js WebSocket integration
- Toast notification libraries (react-hot-toast, sonner)

**Best Practices:**

- Use rooms for user-specific events
- Authenticate WebSocket connections
- Handle reconnection gracefully
- Throttle frequent updates
- Clean up listeners on unmount
- Provide fallback (polling) if WebSocket unavailable

**Pitfalls to Avoid:**

- Broadcasting to all clients (use rooms)
- Not authenticating WebSocket connections
- Memory leaks from unremoved listeners
- Sending large payloads over WebSocket
- Not handling connection failures
- CORS issues with WebSocket

---

### Epic 5: Quality and Deployment

#### Ticket 5.1: Error Handling and Validation

**Technical Plan:**

**Backend:**

```
src/common/
├── filters/
│   └── http-exception.filter.ts
├── pipes/
│   └── validation.pipe.ts
└── exceptions/
    └── custom-exceptions.ts
```

**Global Exception Filter:**

```typescript
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Internal server error';

    // Log error
    this.logger.error(exception);

    // Return user-friendly response
    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
```

**Validation Pipe:**

```typescript
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }),
);
```

**Custom Exceptions:**

```typescript
export class FileNotFoundError extends NotFoundException {
  constructor(fileId: string) {
    super(`File with ID ${fileId} not found`);
  }
}

export class FileTooLargeError extends BadRequestException {
  constructor(size: number, maxSize: number) {
    super(`File size ${size} exceeds maximum ${maxSize}`);
  }
}
```

**DTO Validation:**

```typescript
export class UploadFileDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsEnum(FileType)
  type?: FileType;
}
```

**Frontend Error Boundary:**

```tsx
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    // Log to error tracking service
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

**What to Learn:**

- Exception filters in NestJS
- class-validator decorators
- Error handling patterns
- React Error Boundaries
- Error tracking (Sentry)
- HTTP status codes

**Best Practices:**

- Use specific exception classes
- Log all errors with context
- Return consistent error format
- Never expose stack traces in production
- Validate all user inputs
- Use error boundaries in React
- Provide actionable error messages

**Pitfalls to Avoid:**

- Generic error messages ("Something went wrong")
- Exposing sensitive information in errors
- Not logging errors
- Inconsistent error response format
- Missing validation on inputs
- Unhandled promise rejections

---

#### Ticket 5.2: Testing Suite

**Technical Plan:**

**Backend Tests:**

```
src/
├── auth/
│   ├── auth.service.spec.ts
│   └── auth.controller.spec.ts
├── files/
│   ├── files.service.spec.ts
│   └── files.controller.spec.ts
└── test/
    ├── app.e2e-spec.ts
    └── helpers/
        └── test-utils.ts
```

**Unit Test Example:**

```typescript
describe('AuthService', () => {
  let service: AuthService;
  let usersRepo: Repository<User>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getRepositoryToken(User), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should hash password on register', async () => {
    const password = 'password123';
    const result = await service.register({ email: 'test@test.com', password });
    expect(result.password).not.toBe(password);
  });
});
```

**Integration Test Example:**

```typescript
describe('Files API (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    // Setup test app
    // Login to get token
  });

  it('/files (GET) should return user files', () => {
    return request(app.getHttpServer())
      .get('/files')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toBeInstanceOf(Array);
      });
  });
});
```

**Frontend Tests:**

```typescript
// Component test
describe('FileUpload', () => {
  it('should upload file on drop', async () => {
    const { getByTestId } = render(<FileUpload />)
    const dropzone = getByTestId('dropzone')

    const file = new File(['content'], 'test.pdf', { type: 'application/pdf' })
    fireEvent.drop(dropzone, { dataTransfer: { files: [file] } })

    await waitFor(() => {
      expect(mockUpload).toHaveBeenCalledWith(file)
    })
  })
})
```

**E2E Test Example (Playwright):**

```typescript
test('complete upload flow', async ({ page }) => {
  await page.goto('/login');
  await page.fill('input[name="email"]', 'test@test.com');
  await page.fill('input[name="password"]', 'password');
  await page.click('button[type="submit"]');

  await page.goto('/files');
  await page.setInputFiles('input[type="file"]', 'test.pdf');
  await page.waitForSelector('text=Upload complete');

  await expect(page.locator('text=test.pdf')).toBeVisible();
});
```

**What to Learn:**

- Jest testing framework
- NestJS testing utilities
- React Testing Library
- Supertest for API tests
- Playwright/Cypress for E2E
- Mocking strategies
- Test coverage tools

**Best Practices:**

- Follow AAA pattern (Arrange, Act, Assert)
- Use test databases (separate from dev)
- Mock external dependencies
- Test edge cases and errors
- Aim for 70%+ coverage
- Run tests in CI/CD
- Use factories for test data

**Pitfalls to Avoid:**

- Testing implementation details
- Not cleaning up test data
- Slow tests (optimize with mocks)
- Flaky E2E tests
- Not testing error cases
- Over-mocking (test real integration when possible)

---

#### Ticket 5.3: Dockerization and Deployment

**Technical Plan:**

**Backend Dockerfile:**

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/main"]
```

**Frontend Dockerfile:**

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
EXPOSE 3000
CMD ["npm", "start"]
```

**Docker Compose:**

```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - '3001:3000'
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/fileapp
      - REDIS_URL=redis://redis:6379
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - db
      - redis
    volumes:
      - ./uploads:/app/uploads

  frontend:
    build: ./frontend
    ports:
      - '3000:3000'
    environment:
      - NEXT_PUBLIC_API_URL=http://backend:3001
    depends_on:
      - backend

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=fileapp
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
    volumes:
      - postgres-data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    volumes:
      - redis-data:/data

volumes:
  postgres-data:
  redis-data:
```

**Environment Variables:**

```bash
# .env.example
DATABASE_URL=postgresql://user:pass@localhost:5432/fileapp
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key
JWT_EXPIRATION=1h
MAX_FILE_SIZE=10485760
UPLOAD_DIR=./uploads
```

**What to Learn:**

- Docker basics (images, containers, volumes)
- Multi-stage builds
- Docker Compose orchestration
- Environment variable management
- Volume mounts for persistence
- Docker networking
- Container health checks

**Best Practices:**

- Use multi-stage builds (smaller images)
- Use alpine images for smaller size
- Don't run as root user
- Use .dockerignore
- Pin image versions
- Implement health checks
- Use volumes for persistent data
- Separate dev and prod configs

**Pitfalls to Avoid:**

- Storing secrets in Dockerfile
- Not using .dockerignore (slow builds)
- Missing volume for uploads (data loss)
- Large image sizes
- Not handling database migrations
- Hardcoded environment variables

---

#### Ticket 5.4: API Documentation

**Technical Plan:**

**Swagger Setup:**

```typescript
// main.ts
const config = new DocumentBuilder()
  .setTitle('File Processing API')
  .setDescription('API for file upload and processing')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api/docs', app, document);
```

**Decorators on Controllers:**

```typescript
@ApiTags('files')
@Controller('files')
export class FilesController {
  @Post('upload')
  @ApiOperation({ summary: 'Upload files' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Files uploaded successfully' })
  @ApiBearerAuth()
  uploadFiles(@UploadedFiles() files) {}
}
```

**DTO Documentation:**

```typescript
export class LoginDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', minLength: 8 })
  @IsString()
  @MinLength(8)
  password: string;
}
```

**What to Learn:**

- OpenAPI specification
- Swagger UI
- API documentation best practices
- @nestjs/swagger decorators

**Best Practices:**

- Document all endpoints
- Provide examples
- Include authentication requirements
- Document error responses
- Keep docs up to date
- Export Postman collection

**Pitfalls to Avoid:**

- Outdated documentation
- Missing error response examples
- No authentication docs
- Incomplete parameter descriptions

---

#### Ticket 5.5: Responsive Design Implementation

**Technical Plan:**

**Tailwind Configuration:**

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
  },
};
```

**Responsive Patterns:**

```tsx
// Desktop table, mobile cards
<div className="hidden md:block">
  <Table /> {/* Desktop */}
</div>
<div className="md:hidden">
  <CardList /> {/* Mobile */}
</div>

// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <Card />
</div>

// Responsive navigation
<nav className="hidden md:flex">Desktop Nav</nav>
<button className="md:hidden">Hamburger Menu</button>
```

**Mobile Optimizations:**

- Touch targets ≥ 44x44px
- Readable font sizes (≥ 16px base)
- Adequate spacing for touch
- Avoid hover-only interactions
- Optimize images for mobile

**What to Learn:**

- CSS media queries
- Flexbox and Grid
- Mobile-first design philosophy
- Touch event handling
- Responsive images (srcset)
- Viewport meta tag

**Best Practices:**

- Mobile-first approach
- Test on real devices
- Use responsive units (rem, %, vh/vw)
- Optimize for performance on mobile
- Provide touch-friendly UI
- Consider thumb zones

**Pitfalls to Avoid:**

- Designing desktop-first
- Small touch targets
- Not testing on mobile
- Fixed widths
- Tiny fonts on mobile
- Horizontal scrolling

---

## PART 3: LEARNING ROADMAP

---

### Phase 1: Fundamentals (Prerequisites)

#### 1.1 Backend Core

**Time Estimate: 1-2 weeks**

**Topics:**

- **Node.js Fundamentals:**
  - Event loop and async programming
  - Streams and buffers
  - File system operations
  - Error handling patterns
- **NestJS Framework:**
  - Modules, Controllers, Services (MVC pattern)
  - Dependency Injection
  - Middleware, Guards, Interceptors, Pipes
  - Exception filters
  - Configuration management
- **TypeScript:**
  - Type system (interfaces, types, generics)
  - Decorators
  - Advanced types (union, intersection, utility types)

**Resources:**

- NestJS official documentation
- "Node.js Design Patterns" book
- NestJS Fundamentals course (Udemy)

#### 1.2 Frontend Core

**Time Estimate: 1-2 weeks**

**Topics:**

- **React:**
  - Hooks (useState, useEffect, useContext, useMemo, useCallback)
  - Component composition
  - Performance optimization
  - Error boundaries
- **Next.js:**
  - App Router
  - Server Components vs Client Components
  - API routes
  - Middleware
  - Image optimization
- **TypeScript in React:**
  - Component typing
  - Props interfaces
  - Generic components

**Resources:**

- Next.js documentation
- React official docs (react.dev)
- "Full Stack React" book

#### 1.3 Database & ORM

**Time Estimate: 1 week**

**Topics:**

- **SQL Fundamentals:**
  - CRUD operations
  - Joins
  - Aggregations (GROUP BY, COUNT, SUM)
  - Indexes
  - Transactions
- **TypeORM or Prisma:**
  - Entity definition
  - Migrations
  - Query builder
  - Relations
  - Repository pattern

**Resources:**

- PostgreSQL tutorial
- TypeORM documentation
- Prisma documentation

---

### Phase 2: Authentication & Security

**Time Estimate: 1 week**

**Topics:**

- **JWT Authentication:**
  - Token structure
  - Signing and verification
  - Token refresh strategy
  - Storage (cookies vs localStorage)
- **Password Security:**
  - Bcrypt hashing
  - Salt rounds
  - Password policies
- **Authorization:**
  - Role-based access control (RBAC)
  - Guard implementation
  - Route protection
- **Security Best Practices:**
  - OWASP Top 10
  - XSS prevention
  - CSRF protection
  - Rate limiting
  - Input validation

**Resources:**

- NestJS authentication docs
- JWT.io
- OWASP guidelines

---

### Phase 3: File Handling & Processing

**Time Estimate: 2 weeks**

**Topics:**

- **File Upload:**
  - Multer middleware
  - Multipart form data
  - File validation
  - Stream handling
  - Progress tracking
- **PDF Processing:**
  - pdf-parse or pdf-lib
  - Text extraction
  - Metadata extraction
  - Preview generation
- **Image Processing:**
  - Tesseract OCR
  - Sharp for image manipulation
  - Image preprocessing
  - EXIF data handling
- **CSV/Excel Parsing:**
  - Papaparse for CSV
  - xlsx for Excel
  - Streaming large files
  - Data type inference

**Resources:**

- Multer documentation
- Tesseract.js documentation
- Sharp documentation
- File handling in Node.js tutorials

---

### Phase 4: Async Processing & Queues

**Time Estimate: 1 week**

**Topics:**

- **Redis Basics:**
  - Data structures
  - Pub/Sub
  - Connection management
- **Bull Queue:**
  - Queue creation
  - Job processors
  - Progress tracking
  - Retry strategies
  - Event handling
  - Concurrency control
- **Background Jobs:**
  - Job patterns
  - Error handling
  - Monitoring

**Resources:**

- Bull documentation
- Redis documentation
- NestJS Bull module

---

### Phase 5: Real-Time Features

**Time Estimate: 1 week**

**Topics:**

- **WebSocket:**
  - WebSocket protocol
  - Connection lifecycle
  - Room-based messaging
- **Socket.IO:**
  - Client and server setup
  - Event emission
  - Namespaces and rooms
  - Authentication
- **NestJS Gateways:**
  - @WebSocketGateway
  - @SubscribeMessage
  - Broadcasting

**Resources:**

- Socket.IO documentation
- NestJS WebSocket docs

---

### Phase 6: Frontend Advanced

**Time Estimate: 1-2 weeks**

**Topics:**

- **State Management:**
  - React Query / SWR
  - Caching strategies
  - Optimistic updates
  - Context API
- **UI Libraries:**
  - Material-UI or Tailwind CSS
  - Component patterns
  - Theming
- **Data Visualization:**
  - Recharts or Chart.js
  - Responsive charts
  - Accessibility
- **Forms:**
  - react-hook-form
  - Validation (zod, yup)
  - File upload forms
- **Drag and Drop:**
  - react-dropzone
  - Progress indicators

**Resources:**

- TanStack Query documentation
- Tailwind CSS documentation
- Recharts documentation

---

### Phase 7: Testing

**Time Estimate: 1-2 weeks**

**Topics:**

- **Unit Testing:**
  - Jest fundamentals
  - Mocking strategies
  - Test-driven development (TDD)
- **Backend Testing:**
  - NestJS testing utilities
  - Supertest for API tests
  - Test databases
- **Frontend Testing:**
  - React Testing Library
  - User-centric testing
  - Mock service worker (MSW)
- **E2E Testing:**
  - Playwright or Cypress
  - Page object pattern
  - Test selectors

**Resources:**

- Jest documentation
- React Testing Library docs
- Playwright documentation

---

### Phase 8: DevOps & Deployment

**Time Estimate: 1 week**

**Topics:**

- **Docker:**
  - Dockerfile syntax
  - Multi-stage builds
  - Docker Compose
  - Volumes and networks
- **Environment Management:**
  - dotenv
  - Configuration patterns
  - Secrets management
- **Deployment:**
  - PM2 for Node.js
  - Nginx reverse proxy
  - SSL/TLS certificates
  - Cloud platforms (AWS, Heroku, Vercel)

**Resources:**

- Docker documentation
- Docker for Node.js tutorial

---

### Phase 9: Monitoring & Optimization

**Time Estimate: 1 week**

**Topics:**

- **Performance:**
  - Query optimization
  - Caching strategies (Redis)
  - Lazy loading
  - Code splitting
- **Monitoring:**
  - Logging (Winston, Pino)
  - Error tracking (Sentry)
  - APM tools
- **Database Optimization:**
  - Indexing strategies
  - Query performance
  - Connection pooling

---

### Recommended Learning Order

**Week 1-2:** Phase 1 (Fundamentals)
**Week 3:** Phase 2 (Authentication)
**Week 4-5:** Phase 3 (File Handling)
**Week 6:** Phase 4 (Queues)
**Week 7:** Phase 5 (Real-Time)
**Week 8-9:** Phase 6 (Frontend Advanced)
**Week 10-11:** Phase 7 (Testing)
**Week 12:** Phase 8 (DevOps)
**Week 13:** Phase 9 (Monitoring)

---

### Key Design Patterns to Master

1. **Repository Pattern:** Data access abstraction
2. **Dependency Injection:** Loose coupling
3. **Factory Pattern:** Object creation
4. **Observer Pattern:** Event-driven architecture
5. **Middleware Pattern:** Request processing pipeline
6. **Strategy Pattern:** Algorithm selection (file processors)
7. **Decorator Pattern:** Adding behavior (NestJS decorators)

---

### Essential Tools & Libraries

**Backend:**

- `@nestjs/core`, `@nestjs/common`, `@nestjs/platform-express`
- `typeorm` or `prisma`
- `@nestjs/jwt`, `@nestjs/passport`, `bcrypt`
- `multer`, `pdf-parse`, `tesseract.js`, `xlsx`, `papaparse`
- `bull`, `ioredis`
- `@nestjs/websockets`, `socket.io`
- `class-validator`, `class-transformer`
- `winston` or `pino`

**Frontend:**

- `next`, `react`, `react-dom`
- `@tanstack/react-query`
- `axios`
- `react-hook-form`, `zod`
- `react-dropzone`
- `recharts` or `chart.js`
- `tailwindcss` or `@mui/material`
- `socket.io-client`
- `react-hot-toast` or `sonner`

**Testing:**

- `jest`, `@nestjs/testing`
- `supertest`
- `@testing-library/react`, `@testing-library/jest-dom`
- `playwright` or `cypress`

**DevOps:**

- `docker`, `docker-compose`
- `dotenv`

---

### Common Pitfalls Summary

1. **Security:** Never store passwords in plain text, always validate input
2. **Performance:** Don't block the event loop, use queues for heavy processing
3. **Error Handling:** Always handle errors, provide user-friendly messages
4. **Testing:** Test early and often, don't skip error cases
5. **Database:** Use indexes, avoid N+1 queries, use transactions
6. **Files:** Validate types and sizes, sanitize names, use streams
7. **Authentication:** Use httpOnly cookies, implement refresh tokens
8. **Real-Time:** Use rooms, handle reconnection, don't broadcast to all
9. **Deployment:** Use environment variables, don't commit secrets
10. **Code Quality:** Follow SOLID principles, keep functions small, use TypeScript

---

### Success Metrics

**Before Starting Each Epic:**

- Read relevant documentation
- Set up development environment
- Create test data and scenarios

**During Development:**

- Write tests alongside code
- Review code against best practices
- Refactor as you learn better patterns

**After Completing Each Epic:**

- Test all features thoroughly
- Document any deviations from plan
- Review security and performance
- Get feedback if possible

---

### Final Tips

1. **Don't Rush:** Quality over speed, especially for security-critical features
2. **Read Documentation:** Official docs are your best friend
3. **Test Everything:** Automated tests save time in the long run
4. **Ask for Help:** Use Stack Overflow, Discord communities, GitHub issues
5. **Learn by Doing:** Build small prototypes for new concepts
6. **Keep Security First:** Never compromise on security
7. **Stay Organized:** Use git commits, branch naming conventions
8. **Document as You Go:** Future you will thank present you
9. **Performance Matters:** Profile before optimizing
10. **User Experience:** Think from the user's perspective

---

## END OF DOCUMENT
