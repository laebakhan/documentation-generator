import { ProjectInput, GeneratedDocumentation, ProjectAnalysis, GeneratedDocSections, LanguageStat, FeatureItem, FileItem } from '../types/project';

// Color map for common languages
const LANGUAGE_COLORS: Record<string, string> = {
  Java: '#b07219',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  SQL: '#e38c00',
  MySQL: '#00758f',
  PostgreSQL: '#336791',
  MongoDB: '#13aa52',
  'C++': '#f34b7d',
  'C#': '#178600',
  Go: '#00ADD8',
  Rust: '#dea584',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  Shell: '#89e051',
  Docker: '#384d54',
};

export function analyzeProjectInput(input: ProjectInput): ProjectAnalysis {
  const rawTech = (input.techStack || '').toLowerCase();
  const rawDesc = (input.description || '').toLowerCase();
  const rawFeatures = (input.features || '').toLowerCase();
  const rawCode = (input.codeDetails || '').toLowerCase();
  const combined = `${rawTech} ${rawDesc} ${rawFeatures} ${rawCode}`;

  // 1. Detect Languages
  const knownLangs = [
    { name: 'Java', pattern: /\bjava\b|\bjdbc\b|\bservlet\b|\bspring\b|\bmaven\b/ },
    { name: 'JavaScript', pattern: /\bjavascript\b|\bjs\b|\bnode\b|\bexpress\b/ },
    { name: 'TypeScript', pattern: /\btypescript\b|\bts\b|\bnestjs\b/ },
    { name: 'Python', pattern: /\bpython\b|\bflask\b|\bfastapi\b|\bdjango\b/ },
    { name: 'HTML', pattern: /\bhtml\b|\bhtml5\b|\bjsp\b|\bejs\b/ },
    { name: 'CSS', pattern: /\bcss\b|\btailwind\b|\bbootstrap\b|\bsass\b/ },
    { name: 'SQL', pattern: /\bsql\b|\bmysql\b|\bpostgresql\b|\bsqlite\b/ },
    { name: 'Go', pattern: /\bgolang\b|\bgo\b/ },
    { name: 'Rust', pattern: /\brust\b|\bcargo\b/ },
    { name: 'C++', pattern: /\bc\+\+\b|\bcpp\b/ },
    { name: 'C#', pattern: /\bc#\b|\bdotnet\b|\b\.net\b/ },
    { name: 'PHP', pattern: /\bphp\b|\blaravel\b/ },
  ];

  const matchedLangs: { name: string; weight: number }[] = [];
  knownLangs.forEach(lang => {
    let weight = 0;
    if (lang.pattern.test(rawTech)) weight += 50;
    if (lang.pattern.test(rawCode)) weight += 30;
    if (lang.pattern.test(rawDesc)) weight += 15;
    if (lang.pattern.test(rawFeatures)) weight += 10;
    if (weight > 0) {
      matchedLangs.push({ name: lang.name, weight });
    }
  });

  if (matchedLangs.length === 0) {
    matchedLangs.push({ name: 'JavaScript', weight: 45 }, { name: 'HTML', weight: 30 }, { name: 'CSS', weight: 25 });
  }

  const totalWeight = matchedLangs.reduce((acc, curr) => acc + curr.weight, 0);
  const detectedLanguages: LanguageStat[] = matchedLangs.map(l => ({
    name: l.name,
    percentage: Math.round((l.weight / totalWeight) * 100),
    color: LANGUAGE_COLORS[l.name] || '#6366f1',
  }));

  // Ensure 100% total
  const sumPerc = detectedLanguages.reduce((sum, item) => sum + item.percentage, 0);
  if (sumPerc !== 100 && detectedLanguages.length > 0) {
    detectedLanguages[0].percentage += (100 - sumPerc);
  }

  // 2. Frameworks & Libraries
  const frameworks: string[] = [];
  const libraries: string[] = [];
  const database: string[] = [];
  const tools: string[] = [];

  const frameworkRules = [
    { name: 'React', test: /\breact\b/ },
    { name: 'Vue.js', test: /\bvue\b/ },
    { name: 'Next.js', test: /\bnext\.?js\b/ },
    { name: 'Angular', test: /\bangular\b/ },
    { name: 'Express.js', test: /\bexpress\b/ },
    { name: 'Spring Boot', test: /\bspring(\s?boot)?\b/ },
    { name: 'FastAPI', test: /\bfastapi\b/ },
    { name: 'Django', test: /\bdjango\b/ },
    { name: 'Flask', test: /\bflask\b/ },
    { name: 'Apache Tomcat', test: /\btomcat\b/ },
    { name: 'Java Servlets / JSP', test: /\bservlet\b|\bjsp\b/ },
    { name: 'Bootstrap', test: /\bbootstrap\b/ },
    { name: 'Tailwind CSS', test: /\btailwind\b/ },
  ];

  frameworkRules.forEach(rule => {
    if (rule.test.test(combined)) frameworks.push(rule.name);
  });

  const dbRules = [
    { name: 'MySQL', test: /\bmysql\b/ },
    { name: 'PostgreSQL', test: /\bpostgres(ql)?\b/ },
    { name: 'MongoDB', test: /\bmongo(db)?\b/ },
    { name: 'SQLite', test: /\bsqlite\b/ },
    { name: 'Redis', test: /\bredis\b/ },
    { name: 'JDBC', test: /\bjdbc\b/ },
  ];
  dbRules.forEach(rule => {
    if (rule.test.test(combined)) database.push(rule.name);
  });

  const toolRules = [
    { name: 'Git & GitHub', test: /\b(git|github)\b/ },
    { name: 'Docker', test: /\bdocker\b/ },
    { name: 'Maven', test: /\bmaven\b/ },
    { name: 'Gradle', test: /\bgradle\b/ },
    { name: 'Vite', test: /\bvite\b/ },
    { name: 'Webpack', test: /\bwebpack\b/ },
    { name: 'Postman', test: /\bpostman\b|\brest api\b/ },
    { name: 'npm / Yarn', test: /\b(npm|yarn|pnpm)\b/ },
  ];
  toolRules.forEach(rule => {
    if (rule.test.test(combined)) tools.push(rule.name);
  });

  if (frameworks.length === 0) frameworks.push('Native DOM APIs', 'Custom MVC Architecture');
  if (database.length === 0) database.push(matchedLangs.some(l => l.name === 'Java') ? 'MySQL' : 'Local Storage / In-Memory Store');
  if (tools.length === 0) tools.push('Git', 'Visual Studio Code / IntelliJ');

  // 3. Project Type & Architecture
  let projectType = 'Full-Stack Web Application';
  let architecturePattern = 'Model-View-Controller (MVC)';

  if (/api\b|microservice|restful/i.test(combined)) {
    projectType = 'RESTful API / Microservice';
    architecturePattern = 'Layered Service-Repository Pattern';
  } else if (/cli\b|command line|tool/i.test(combined)) {
    projectType = 'CLI Developer Utility';
    architecturePattern = 'Modular Command Pattern';
  } else if (/mobile|android|ios|flutter/i.test(combined)) {
    projectType = 'Mobile Application';
    architecturePattern = 'MVVM (Model-View-ViewModel)';
  } else if (/dashboard|portal|management system/i.test(combined)) {
    projectType = 'Enterprise Web Portal & Management System';
    architecturePattern = 'MVC (Model-View-Controller) with DAO Pattern';
  }

  // 4. Feature Parsing
  const featureLines = (input.features || '')
    .split('\n')
    .map(l => l.replace(/^[-*•\d.]+\s*/, '').trim())
    .filter(l => l.length > 2);

  const mainFeatures: FeatureItem[] = featureLines.length > 0
    ? featureLines.map((f, i) => ({
        id: `feat-${i + 1}`,
        title: f.length > 40 ? f.substring(0, 38) + '...' : f,
        description: f,
        category: i % 4 === 0 ? 'security' : i % 4 === 1 ? 'data' : i % 4 === 2 ? 'ui' : 'core',
      }))
    : [
        { id: 'feat-1', title: 'User Authentication & Authorization', description: 'Role-based access control with secure credential validation.', category: 'security' },
        { id: 'feat-2', title: 'Data Management & Record Tracking', description: 'Centralized database storage for lifecycle updates and reporting.', category: 'data' },
        { id: 'feat-3', title: 'Responsive User Interface', description: 'Clean interface optimized across desktop and mobile browsers.', category: 'ui' },
        { id: 'feat-4', title: 'Reporting & Analytics', description: 'Automated summaries, exports, and status dashboards.', category: 'core' },
      ];

  // 5. Important Files / Modules
  const isJava = matchedLangs.some(l => l.name === 'Java');
  const isPython = matchedLangs.some(l => l.name === 'Python');
  const isNode = matchedLangs.some(l => l.name === 'JavaScript' || l.name === 'TypeScript') && !isJava;

  const importantFiles: FileItem[] = isJava
    ? [
        { path: 'src/main/java/com/app/controller/StudentServlet.java', purpose: 'Handles HTTP requests, parameter extraction, and route dispatching', type: 'backend' },
        { path: 'src/main/java/com/app/dao/StudentDAO.java', purpose: 'Encapsulates JDBC database connection, SQL queries, and transactional updates', type: 'database' },
        { path: 'src/main/java/com/app/model/Student.java', purpose: 'JavaBean entity model representing the database schema state', type: 'backend' },
        { path: 'src/main/webapp/WEB-INF/views/dashboard.jsp', purpose: 'Presentation layout template for administrative records and data tables', type: 'frontend' },
        { path: 'src/main/webapp/css/style.css', purpose: 'Custom styling rules for tables, navigation bar, and modal dialogues', type: 'frontend' },
        { path: 'src/main/resources/database.properties', purpose: 'Database connection configuration (JDBC URL, username, password)', type: 'config' },
        { path: 'pom.xml (or web.xml)', purpose: 'Deployment descriptor and Maven dependency declarations', type: 'config' },
      ]
    : isPython
    ? [
        { path: 'main.py', purpose: 'Application entry point and router initialization', type: 'entry' },
        { path: 'app/models.py', purpose: 'Database ORM models and schema declarations', type: 'database' },
        { path: 'app/routers/api.py', purpose: 'Endpoint definitions, request validation, and responses', type: 'backend' },
        { path: 'requirements.txt', purpose: 'Declared Python package dependencies', type: 'config' },
        { path: '.env.example', purpose: 'Environment variable definitions template', type: 'config' },
      ]
    : [
        { path: 'src/index.ts (or server.js)', purpose: 'Server initialization, middleware setup, and port listening', type: 'entry' },
        { path: 'src/routes/index.ts', purpose: 'API endpoints and router controller bindings', type: 'backend' },
        { path: 'src/models/schema.ts', purpose: 'Data validation schemas and database model definitions', type: 'database' },
        { path: 'package.json', purpose: 'Node package dependencies, scripts, and build metadata', type: 'config' },
        { path: 'public/index.html', purpose: 'Client HTML entry layout and font declarations', type: 'frontend' },
      ];

  // 6. Complexity & Estimate
  const complexityScore = (mainFeatures.length > 5 || database.length > 1) ? 'Intermediate' : 'Beginner';
  const estimatedDevTime = mainFeatures.length > 6 ? '3 - 4 Weeks' : '1 - 2 Weeks';

  const keyHighlights = [
    `Engineered using modern ${detectedLanguages.map(l => l.name).join(' & ')} principles`,
    `Structured with clean ${architecturePattern} separation of concerns`,
    `Ready-to-deploy schema and clear run scripts for seamless onboarding`,
    `Production-grade documentation with complete API & structure breakdowns`,
  ];

  return {
    detectedLanguages,
    frameworks,
    libraries,
    database,
    tools,
    projectType,
    architecturePattern,
    mainFeatures,
    importantFiles,
    complexityScore,
    estimatedDevTime,
    keyHighlights,
  };
}

export function generateDocumentationSuite(input: ProjectInput): GeneratedDocumentation {
  const analysis = analyzeProjectInput(input);
  const projectName = input.name.trim() || 'Student Management System';
  const description = input.description.trim() || 'A centralized web portal designed for educational institutions to streamline student registration, academic records, attendance management, and automated performance reporting.';
  const author = input.authorName?.trim() || 'Project Contributors';
  const license = input.license || 'MIT';
  const isJava = analysis.detectedLanguages.some(l => l.name === 'Java');
  const isPython = analysis.detectedLanguages.some(l => l.name === 'Python');

  // Section 1: Project Overview
  const overview = `### 📌 Executive Summary
**${projectName}** is a robust, modular ${analysis.projectType} architected to deliver high efficiency, reliability, and an intuitive user experience. Built with a core stack of **${analysis.detectedLanguages.map(l => l.name).join(', ')}**, it provides an organized solution for modern workflows.

${description}

#### 🎯 Motivation & Goals
- **Eliminate Redundancy**: Automate manual bookkeeping, spreadsheet drift, and error-prone administrative tasks.
- **Data Integrity & Consistency**: Enforce strict validation rules and centralized relational storage.
- **Role-Based Security**: Provide appropriate privilege levels so each user only sees authorized data.
- **Rapid Extensibility**: Implement modular architecture (${analysis.architecturePattern}) to simplify maintenance and future feature additions.`;

  // Section 2: Problem Statement
  const problemStatement = `### ❗ The Challenge
In traditional and un-automated workflows, managing complex domain workflows (such as records, scheduling, communications, and state tracking) presents significant bottlenecks:

1. **Information Silos**: Data scattered across disparate spreadsheets, paper files, or disconnected single-user tools creates discrepancies and versioning conflicts.
2. **Operational Delay**: Manual updates require excessive administrative overhead and introduce human error into calculations (e.g. GPA, fee balances, or status logs).
3. **Audit & Traceability Gaps**: Without structured database transactional controls, tracking which user executed changes, modifications, or approvals is difficult.
4. **Lack of Instant Visibility**: Stakeholders struggle to obtain accurate, real-time summaries and analytics without manual collation.

### 💡 The Solution: ${projectName}
**${projectName}** resolves these challenges by introducing a unified, centralized web-based platform. By leveraging **${analysis.database.join(', ')}** alongside a responsive interface and structured server-side handlers, it converts chaotic multi-step manual processes into deterministic, verifiable digital workflows.`;

  // Section 3: Features
  const featuresList = analysis.mainFeatures.map(f => `- **${f.title}**: ${f.description}`).join('\n');
  const features = `### ✨ Core Features & Capabilities

${featuresList}

#### 🛡️ System Highlights
- **Validation Engine**: Real-time client-side checks supplemented by strict server-side defensive validation.
- **Session Management**: Secure user state tracking with expiration and protection against unauthorized access.
- **Responsive Layout**: Designed to adapt seamlessly across desktop workstations, tablets, and mobile devices.
- **Data Export & Reporting**: Quick export options for audit trails, tabular summaries, and print-ready views.`;

  // Section 4: Technology Stack
  const techStack = `### 🛠️ Technology Stack & Dependencies

| Category | Technologies & Tools | Purpose |
| :--- | :--- | :--- |
| **Primary Languages** | ${analysis.detectedLanguages.map(l => `${l.name} (${l.percentage}%)`).join(', ')} | Core business logic and interface rendering |
| **Frameworks / Runtimes** | ${analysis.frameworks.join(', ')} | Application foundation and routing |
| **Database & Persistence** | ${analysis.database.join(', ')} | Relational schema, queries, and data longevity |
| **Tooling & Build** | ${analysis.tools.join(', ')} | Dependency management, bundling, and deployment |
| **Architecture Pattern** | ${analysis.architecturePattern} | Clean decoupling of UI, business services, and database layers |`;

  // Section 5: Installation
  const gitUrl = input.githubUrl || `https://github.com/developer/${projectName.toLowerCase().replace(/\s+/g, '-')}.git`;
  const installation = isJava
    ? `### 📥 Prerequisites
Before installing **${projectName}**, ensure the following development tools are installed:
- **Java Development Kit (JDK 17+)**
- **Apache Tomcat 9.0+ / 10.0+** (or embedded servlet container)
- **MySQL Server 8.0+**
- **Git CLI**
- Optional: Apache Maven 3.8+ or Eclipse / IntelliJ IDEA

---

### ⚙️ Step-by-Step Installation

#### 1. Clone the Repository
\`\`\`bash
git clone ${gitUrl}
cd ${projectName.toLowerCase().replace(/\s+/g, '-')}
\`\`\`

#### 2. Database Setup (MySQL)
1. Launch MySQL CLI or MySQL Workbench:
\`\`\`bash
mysql -u root -p
\`\`\`
2. Create the project database:
\`\`\`sql
CREATE DATABASE ${projectName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_db;
USE ${projectName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_db;
\`\`\`
3. Import the initial database schema (e.g. \`schema.sql\` or provided tables):
\`\`\`sql
-- Run provided SQL script located in /database/schema.sql
SOURCE database/schema.sql;
\`\`\`

#### 3. Configure Database Credentials
Open \`src/main/resources/database.properties\` (or the DB utility file) and configure your MySQL connection details:
\`\`\`properties
db.url=jdbc:mysql://localhost:3306/${projectName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_db?useSSL=false&serverTimezone=UTC
db.user=root
db.password=your_password_here
db.driver=com.mysql.cj.jdbc.Driver
\`\`\``
    : isPython
    ? `### 📥 Prerequisites
- **Python 3.10+**
- **Pip & Virtualenv**
- **Git**

---

### ⚙️ Step-by-Step Installation

\`\`\`bash
# 1. Clone the repository
git clone ${gitUrl}
cd ${projectName.toLowerCase().replace(/\s+/g, '-')}

# 2. Create and activate a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows use: venv\\Scripts\\activate

# 3. Install required dependencies
pip install -r requirements.txt

# 4. Configure Environment Variables
cp .env.example .env
# Edit .env with your local settings
\`\`\``
    : `### 📥 Prerequisites
- **Node.js 18.x or 20.x LTS**
- **npm** (or **pnpm** / **yarn**)
- **Git**

---

### ⚙️ Step-by-Step Installation

\`\`\`bash
# 1. Clone the repository
git clone ${gitUrl}
cd ${projectName.toLowerCase().replace(/\s+/g, '-')}

# 2. Install dependencies
npm install

# 3. Environment configuration
cp .env.example .env
# Update environment variables in .env as needed
\`\`\``;

  // Section 6: How to Run
  const howToRun = isJava
    ? `### 🚀 Running the Application

#### Option A: Using Eclipse or IntelliJ IDEA (Recommended)
1. Open Eclipse / IntelliJ and select **File → Open Project from File System...**
2. Choose the cloned root folder.
3. Right-click the project folder → **Run As → Run on Server**.
4. Select your configured **Apache Tomcat** server and click **Finish**.
5. The application will be deployed and accessible in your browser at:
   \`\`\`
   http://localhost:8080/${projectName.toLowerCase().replace(/\s+/g, '-')}/
   \`\`\`

#### Option B: Deploying WAR to Apache Tomcat Manually
1. Build the \`.war\` archive:
   \`\`\`bash
   mvn clean package
   # OR compile classes into /WEB-INF/classes and pack with jar/war
   \`\`\`
2. Copy the resulting \`${projectName.toLowerCase().replace(/\s+/g, '-')}.war\` into your Tomcat \`webapps/\` directory.
3. Start Tomcat:
   \`\`\`bash
   # On macOS / Linux:
   ./bin/startup.sh

   # On Windows:
   bin\\startup.bat
   \`\`\`
4. Open \`http://localhost:8080/${projectName.toLowerCase().replace(/\s+/g, '-')}/\``
    : isPython
    ? `### 🚀 Running the Application

\`\`\`bash
# Development server:
uvicorn main:app --reload --port 8000
# OR: python main.py

# Open your browser:
http://localhost:8000
\`\`\``
    : `### 🚀 Running the Application

\`\`\`bash
# Run local development server:
npm run dev

# The server will start at:
http://localhost:3000

# Build for production:
npm run build

# Preview production build:
npm run preview
\`\`\``;

  // Section 7: How to Use
  const howToUse = `### 📖 User Guide & Walkthrough

#### 1. Authentication & Role Selection
- Access the login gateway at the root URL.
- Log in using your designated account credentials or demo profiles (e.g. \`admin@institution.edu\` / \`faculty@institution.edu\`).
- The system directs you automatically to your role-specific dashboard.

#### 2. Managing Primary Records
- Navigate to the **Management** tab from the top navigation bar.
- Click **Add New Record** to open the creation modal.
- Fill in the required fields (inputs are dynamically validated with immediate inline feedback).
- Click **Save / Submit** to persist records directly to MySQL.

#### 3. Searching, Filtering & Editing
- Use the quick search bar in the table header to filter by name, registration ID, or status.
- Click the **Edit (✏️)** action button to modify existing details.
- To archive or remove an entry, click **Delete (🗑️)** with safe two-step confirmation.

#### 4. Exporting Reports
- Click **Export Data** at the top right of the records table.
- Select your preferred output format (CSV, Excel, or formatted PDF printable view).`;

  // Section 8: Project Structure
  const projectStructure = isJava
    ? `### 📂 Directory & File Architecture

\`\`\`text
${projectName.toLowerCase().replace(/\s+/g, '-')}/
├── .gitignore                      # Git ignored files and build artifacts
├── README.md                       # High-level project documentation
├── pom.xml                         # Maven dependencies & build configuration
├── database/
│   ├── schema.sql                  # MySQL table creation scripts & constraints
│   └── seed_data.sql               # Initial sample demo records
└── src/
    └── main/
        ├── java/
        │   └── com/
        │       └── app/
        │           ├── controller/  # Servlets / Request dispatchers
        │           │   ├── AuthServlet.java
        │           │   └── StudentServlet.java
        │           ├── dao/         # Data Access Objects (JDBC queries & connection)
        │           │   ├── DBConnection.java
        │           │   └── StudentDAO.java
        │           └── model/       # Data transfer objects & entity models
        │               ├── Student.java
        │               └── User.java
        ├── resources/
        │   └── database.properties # DB connection credentials & driver settings
        └── webapp/
            ├── index.jsp           # Landing page / redirection entry point
            ├── css/                # Stylesheets and custom responsive rules
            │   └── style.css
            ├── js/                 # Client-side validation & dynamic UI logic
            │   └── main.js
            └── WEB-INF/
                ├── web.xml         # Servlet mappings & deployment descriptor
                └── views/          # Protected server-rendered JSP templates
                    ├── login.jsp
                    └── dashboard.jsp
\`\`\``
    : `### 📂 Directory & File Architecture

\`\`\`text
${projectName.toLowerCase().replace(/\s+/g, '-')}/
├── .env.example           # Template for environment variables
├── .gitignore             # Standard git exclusions
├── package.json           # Project manifest, scripts, and dependencies
├── README.md              # Project documentation
├── public/                # Static public assets
└── src/
    ├── api/               # API clients or route controllers
    ├── components/        # Reusable user interface components
    ├── models/            # Data schemas, interfaces, and entity types
    ├── utils/             # Helper utilities, formatters, and validators
    ├── main.ts            # Application bootstrapping and startup
    └── index.css          # Global styling rules and design tokens
\`\`\``;

  // Section 9: API / Module Information
  const apiModules = isJava
    ? `### 🔌 API Endpoints & Servlet Mappings

The backend exposes clean servlet URL patterns handling standard HTTP methods with parameter parsing and response dispatch:

| Endpoint Pattern | Method | Handler Class | Description |
| :--- | :--- | :--- | :--- |
| \`/login\` | \`POST\` | \`AuthServlet.java\` | Validates user session credentials and establishes auth cookie |
| \`/logout\` | \`GET\` | \`AuthServlet.java\` | Invalidates session and clears credentials |
| \`/students\` | \`GET\` | \`StudentServlet.java\` | Retrieves list of students with optional query filter |
| \`/students/add\` | \`POST\` | \`StudentServlet.java\` | Validates and inserts a new student record into MySQL |
| \`/students/edit\` | \`POST\` | \`StudentServlet.java\` | Updates existing student attributes by ID |
| \`/students/delete\` | \`POST / GET\` | \`StudentServlet.java\` | Safely removes or archives student records |
| \`/reports/export\` | \`GET\` | \`ReportServlet.java\` | Streams tabular CSV/PDF report output |

#### Data Model Specification (\`Student.java\`)
\`\`\`java
public class Student {
    private int id;
    private String enrollmentNo;
    private String firstName;
    private String lastName;
    private String email;
    private String department;
    private int yearOfStudy;
    private String status;

    // Constructors, getters, and setters
}
\`\`\``
    : `### 🔌 API Endpoints & Module Architecture

| Endpoint | Method | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| \`/api/auth/login\` | \`POST\` | Authenticate user credentials and return session token | No |
| \`/api/records\` | \`GET\` | Fetch paginated list of project records | Yes |
| \`/api/records\` | \`POST\` | Create a new record with validation | Yes |
| \`/api/records/:id\` | \`PUT\` | Update an existing record by identifier | Yes |
| \`/api/records/:id\` | \`DELETE\` | Archive or remove a record | Yes (Admin) |`;

  // Section 10: Future Scope
  const futureScope = `### 🚀 Future Roadmap & Enhancement Scope

- [ ] **Mobile Native Companion App**: Build cross-platform Android & iOS applications for student and faculty notifications.
- [ ] **AI-Powered Analytics**: Implement predictive early-warning metrics for student attendance drop-off and academic assistance needs.
- [ ] **Automated Payment Gateway Integration**: Connect Razorpay / Stripe for paperless tuition and exam fee collection.
- [ ] **Push Notification Services**: Automatic WhatsApp and Email SMS triggers for emergency alerts and schedule shifts.
- [ ] **Multi-Campus Support**: Architecture scaling for multi-tenant institutional branching and federated single sign-on (SSO).`;

  const sections: GeneratedDocSections = {
    overview,
    problemStatement,
    features,
    techStack,
    installation,
    howToRun,
    howToUse,
    projectStructure,
    apiModules,
    futureScope,
  };

  // Synthesize standard GitHub README.md
  const readmeMarkdown = `# ${projectName}

[![License: ${license}](https://img.shields.io/badge/License-${license}-blue.svg)](https://opensource.org/licenses/${license})
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen.svg)]()
[![Stack](https://img.shields.io/badge/Stack-${encodeURIComponent(analysis.detectedLanguages.map(l => l.name).join('%20|%20'))}-orange.svg)]()
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)]()

> ${description}

---

## 📑 Table of Contents
- [Project Overview](#-project-overview)
- [Problem Statement](#-problem-statement)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [Installation Guide](#-installation-guide)
- [How to Run](#-how-to-run)
- [User Walkthrough](#-user-walkthrough)
- [Project Structure](#-project-structure)
- [API & Module Reference](#-api--module-reference)
- [Roadmap & Future Scope](#-roadmap--future-scope)
- [Contributing](#-contributing)
- [License](#-license)

---

## 📌 Project Overview
${overview}

---

## ❗ Problem Statement
${problemStatement}

---

## ✨ Key Features
${features}

---

## 🛠️ Technology Stack
${techStack}

---

## 📥 Installation Guide
${installation}

---

## 🚀 How to Run
${howToRun}

---

## 📖 User Walkthrough
${howToUse}

---

## 📂 Project Structure
${projectStructure}

---

## 🔌 API & Module Reference
${apiModules}

---

## 🔮 Roadmap & Future Scope
${futureScope}

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!
1. Fork the Project (\`https://github.com/developer/${projectName.toLowerCase().replace(/\s+/g, '-')}/fork\`)
2. Create your Feature Branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your Changes (\`git commit -m 'feat: Add some AmazingFeature'\`)
4. Push to the Branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

---

## 📄 License
This project is licensed under the **${license} License** - see the [LICENSE](LICENSE) file for details.

Developed with pride by **${author}**.
`;

  return {
    id: `doc-${Date.now()}`,
    createdAt: new Date().toISOString(),
    projectName,
    summary: description.slice(0, 150) + (description.length > 150 ? '...' : ''),
    sections,
    readmeMarkdown,
    analysis,
    rawInput: input,
    generationSource: 'heuristic',
  };
}
