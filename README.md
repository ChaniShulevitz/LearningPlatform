# AI-Powered Learning Platform

A production-grade, AI-powered learning platform designed to generate educational content and lessons using specialized artificial intelligence models. The system features a robust, tiered category architecture, secure user management, and automated history tracking.

---

## Architecture and Design Approach

The application is built using a highly modular **Layered Architecture (N-Tier Architecture)** to ensure clean separation of concerns, scalability, and ease of testing. The core layers include:

* **Routes Layer:** Handles incoming HTTP requests and maps them to the controllers.
* **Middlewares Layer:** Intercepts requests for authentication (JWT), input validation, and global error handling.
* **Controllers Layer:** Manages application workflow logic, orchestrates service calls, and prepares HTTP responses.
* **Services Layer:** Contains the core business logic and handles integrations with external AI models.
* **Models Layer:** Defines data schemas and structures database entities for MongoDB.

---

## Core Technologies and Libraries

### Backend Stack
* **Node.js & Express:** Scalable runtime environment and minimalist web framework.
* **TypeScript:** Strong typing to reduce compilation and runtime errors.
* **MongoDB & Mongoose:** Document-based NoSQL database and object modeling.
* **Docker & Docker Compose:** Containerization platform used to seamlessly spin up the database.

### Security & Infrastructure
* **JSON Web Tokens (JWT):** Cryptographic token standard used to enforce secure user authentication.
* **bcryptjs:** Secure password hashing function designed to guard user credentials.
* **Dotenv:** Configuration management via environmental variables.

### Testing & Documentation
* **Jest:** Comprehensive JavaScript testing utility used for executing tests.
* **Supertest:** Library used for executing automated HTTP integration testing.
* **Swagger UI (OpenAPI 3.0):** Interactive API description and visualization tool available at `/api-docs`.

---

## Advanced Implemented Features (Bonus Criteria Covered)

* **Robust Architecture:** Complete decoupling of routes, controllers, services, and models.
* **Advanced TypeScript Integration:** Full type definitions used across both the backend and frontend components.
* **Secure JWT-Based Authentication:** All core AI pathways are fully locked down using a custom state verification middleware.
* **Pagination and Filtering:** Implemented advanced server-side data pagination and filtering within dashboards to handle high-volume query responses efficiently.
* **Interactive API Documentation:** Embedded Swagger specification rendering system configurations live at the `/api-docs` endpoint.
* **Automated Integration Testing:** Comprehensive test suites validating route blockades and middleware error handling using Jest and Supertest.

---

## Architectural Assumptions Made

During the development process, the following key assumptions were made:
1. **Pre-seeded Category Core:** The primary subject categories are assumed to be structural components managed chiefly by administrative users rather than created dynamically by regular clients.
2. **Stateless AI Processing:** Prompt queries submitted to the external AI engine are treated as atomic transactions; context history preservation relies on stored historical database entries.
3. **Stateless Auth Integrity:** User authentication relies strictly on token verification without necessitating redundant validation queries to the core database on every single protected resource fetch.

---

## Configuration Variables Setup

The system relies on specific environment settings. A replica template is provided inside `backend/.env.example`.

To set up your local system variables, create a `.env` file in the root of the backend directory and configure the following parameters:

PORT=5000
MONGO_URI=mongodb://localhost:27017/ai-learning-platform
JWT_SECRET=your_secure_jwt_random_secret_string
OPENAI_API_KEY=your_official_openai_integration_key

---

## How to Run the Project Locally

Follow these exact steps to launch the entire ecosystem locally on your machine.

### Step 1: Database Initialization via Docker
The database is containerized for seamless execution. Ensure Docker Desktop is active on your machine, open your terminal in the main project root directory, and run the following command:

docker compose up -d

Note: This command spins up an isolated MongoDB instance mapped to port 27017, using persistent local volumes so your data remains saved even when the container stops.

### Step 2: Running the Backend Server
1. Open a terminal instance and navigate to the backend folder:
cd backend

2. Install the necessary system dependencies:
npm install

3. Boot up the server in development mode:
npm run dev

The backend server will initialize successfully, and the interactive API documentation console will become live immediately at: http://localhost:5000/api-docs

### Step 3: Running the Frontend Client
1. Open a new, separate terminal instance and navigate to the frontend folder:
cd frontend

2. Install the frontend interface packages:
npm install

3. Run the local application development server:
npm run dev

Open your browser and navigate to the local URL provided in the terminal (usually http://localhost:5173 or http://localhost:3000) to view the application interface.

---

## Automated Integration Testing Suite

The application includes automated integration testing configurations built using Jest and Supertest to programmatically ensure endpoint security and core middleware validation.

### Test Coverage Objective
The framework runs automated end-to-end simulation validations directly against the live server instance without mocking the express routing pipeline. The default tests validate that the custom authMiddleware blocks illegal access requests to sensitive prompt generation vectors (/api/prompts) by throwing accurate structured exceptions and responding with appropriate error states when tokens are missing or structurally invalid.

### Running the Test Suite
To execute the integration tests, clear any running backend local processes, navigate to the backend subdirectory, and run the following terminal script command:

npm test
