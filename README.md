# AI-Powered Learning Platform

A production-grade, AI-powered learning platform designed to generate educational content and lessons using specialized artificial intelligence models. The system features a robust, tiered category architecture, secure user management, and automated history tracking.

---

## Architecture and Design Approach

The application is built using a highly modular **Layered Architecture (N-Tier Architecture)** to ensure clean separation of concerns, scalability, and ease of testing. The core layers include:

* **Routes Layer:** Handles incoming HTTP requests and maps them to the appropriate controller actions.
* **Middlewares Layer:** Intercepts requests for centralized cross-cutting concerns such as authentication, input validation, and global error handling.
* **Controllers Layer:** Manages application workflow logic, orchestrates service calls, and prepares HTTP responses.
* **Services Layer (Core Business Logic):** Contains the primary business logic, handles complex computational workflows, and manages integrations with external AI models.
* **Models Layer:** Defines data schemas, structures database entities, and handles direct interactions with MongoDB.

---

## Core Technologies and Libraries

### Backend Stack
* **Node.js & Express:** Scalable runtime environment and fast minimalist web framework.
* **TypeScript:** Strong typing and advanced object-oriented features to reduce compilation errors.
* **MongoDB & Mongoose:** Document-based NoSQL database coupled with programmatic object modeling.
* **Docker & Docker Compose:** Containerization platform used to seamlessly spin up and manage isolated database environments.

### Security & Infrastructure
* **JSON Web Tokens (JWT):** Cryptographic token standard used to enforce stateless user authentication.
* **bcryptjs:** Secure password hashing function designed to guard credentials against brute-force attacks.
* **Dotenv:** Decentralized configuration management via environmental variables.

### Testing & Documentation
* **Jest:** Comprehensive JavaScript testing utility used for structural evaluation and code execution testing.
* **Supertest:** High-level abstraction library used for executing automated HTTP integration testing.
* **Swagger UI (OpenAPI 3.0):** Interactive API description and visualization tool accessible directly via the browser.

---

## Advanced Implemented Features (Bonus Criteria Covered)

* **Robust Architecture:** Complete decoupling of routes, controllers, services, and models.
* **Advanced TypeScript Integration:** Full type definitions used across both the backend and frontend components.
* **Secure JWT-Based Authentication:** All administrative and core AI pathways are fully locked down using a customs state verification middleware.
* **Pagination and Filtering:** Implemented advanced server-side data pagination and filtering within administrative dashboards to handle high-volume query responses efficiently.
* **Interactive API Documentation:** Embedded Swagger specification rendering system configurations live at the `/api-docs` endpoint.
* **Automated Integration Testing:** Comprehensive test suites validating route blockades and middleware error handling.

---

## Architectural Assumptions Made

During the development process, the following key assumptions were made to streamline system workflows:
1. **Pre-seeded Category Core:** The primary subject categories are assumed to be structural components managed chiefly by administrative users rather than created dynamically by regular clients.
2. **Stateless AI Processing:** Prompt queries submitted to the external AI engine are treated as atomic transactions; context history preservation relies on stored historical database entries rather than ongoing system memory states.
3. **Stateless Auth Integrity:** User authentication relies strictly on token verification without necessitating redundant validation queries to the core database on every single protected resource fetch.

---

## Configuration Variables Setup

The system relies on specific environment settings. A replica template is provided inside `src/backend/.env.example`.

To set up your local system variables, create a `.env` file in the root of the backend directory and configure the following parameters:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/ai-learning-platform
JWT_SECRET=your_secure_jwt_random_secret_string
OPENAI_API_KEY=your_official_openai_integration_key
