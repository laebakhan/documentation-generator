import { ProjectInput } from '../types/project';

export const SAMPLE_PROJECTS: { id: string; label: string; tag: string; data: ProjectInput }[] = [
  {
    id: 'student-mgmt',
    label: 'Student Management System',
    tag: 'Core Demo (Java/MySQL)',
    data: {
      name: 'Student Management System',
      description: 'A comprehensive academic portal engineered for colleges and universities to manage student records, course enrollment, fee tracking, attendance logs, and automated grade card generation with role-based access for administrators, faculty, and students.',
      techStack: 'Java, MySQL, HTML, CSS, JavaScript, JDBC, Apache Tomcat, Bootstrap',
      features: `- Secure Multi-Role Authentication (Admin, Faculty, Student)
- Student Enrollment & Profile Lifecycle Management
- Course Registration & Semester Timetable Allocation
- Daily Attendance Tracking with Monthly Reports & Export to CSV/PDF
- Internal Assessment & Semester Exam Marks Entry
- Dynamic GPA / CGPA Calculation & Automated Grade Card Generation
- Fee Payment Status Tracking & Due Date Alerts
- Database Backup & Audit Logs for Admin Operations`,
      githubUrl: 'https://github.com/example/student-management-system',
      codeDetails: `// Database Schema Snippet:
CREATE TABLE students (
  student_id INT AUTO_INCREMENT PRIMARY KEY,
  enrollment_no VARCHAR(20) UNIQUE NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  department VARCHAR(50),
  year_of_study INT,
  status ENUM('Active', 'Alumni', 'Suspended') DEFAULT 'Active'
);

CREATE TABLE courses (
  course_id VARCHAR(10) PRIMARY KEY,
  course_name VARCHAR(100) NOT NULL,
  credits INT NOT NULL,
  faculty_id INT
);

// Sample Controller: StudentServlet.java handles /students endpoints with JDBC queries
// View templates in /webapp/WEB-INF/views/`,
      docStyle: 'comprehensive',
      targetAudience: 'developers',
      license: 'MIT',
      authorName: 'Academic Engineering Team'
    }
  },
  {
    id: 'ecommerce-api',
    label: 'Modern E-Commerce REST API',
    tag: 'Node.js / Express',
    data: {
      name: 'Modern E-Commerce REST API',
      description: 'A scalable, production-ready RESTful backend API powering headless e-commerce platforms. Features JWT authentication, Stripe payment intent integration, inventory management with atomic stock reservation, and real-time order lifecycle webhooks.',
      techStack: 'Node.js, Express.js, TypeScript, MongoDB, Mongoose, Redis, Stripe SDK, Docker, Jest',
      features: `- High-performance RESTful API endpoints for catalog, cart, and orders
- JWT-based authentication with refresh token rotation and RBAC
- Product inventory locking during checkout flow to prevent overselling
- Integrated Stripe Payment Intents with webhook verification
- Redis cache layer for popular category listings and search queries
- Comprehensive validation using Joi/Zod and structured error responses
- Dockerized container workflow for development and CI/CD pipelines`,
      githubUrl: 'https://github.com/example/ecommerce-rest-api',
      codeDetails: `// Routes:
POST /api/v1/auth/login
POST /api/v1/cart/checkout
GET  /api/v1/products?category=electronics&page=1
POST /api/v1/webhooks/stripe

// Stack: Express 4.x, TypeScript, Mongoose 8.x, Redis 7.x`,
      docStyle: 'standard',
      targetAudience: 'developers',
      license: 'Apache-2.0',
      authorName: 'Cloud Commerce Labs'
    }
  },
  {
    id: 'ai-doc-hub',
    label: 'DevPulse Cloud Dashboard',
    tag: 'React / FastAPI',
    data: {
      name: 'DevPulse Cloud Dashboard',
      description: 'An observability and infrastructure monitoring dashboard that aggregates microservice metrics, Kubernetes cluster health, and alert notifications in real-time with customizable widget layouts.',
      techStack: 'React, TypeScript, Tailwind CSS, FastAPI, Python, PostgreSQL, Prometheus, WebSockets',
      features: `- Real-time telemetry streaming via WebSocket connections
- Interactive time-series visual charts for CPU, RAM, and network I/O
- Multi-cluster Kubernetes pod health inspection and status badges
- Configurable alert thresholds with Slack and PagerDuty webhooks
- Dark/Light developer-first theme with keyboard shortcuts`,
      githubUrl: 'https://github.com/example/devpulse-dashboard',
      codeDetails: `// Metrics collector daemon: python -m devpulse.collector --port 8000
// Frontend dev: vite --port 3000`,
      docStyle: 'hackathon',
      targetAudience: 'developers',
      license: 'MIT',
      authorName: 'Observability Core Team'
    }
  }
];
