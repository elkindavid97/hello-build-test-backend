# hello-build-test-backend setup

## Important
**Security Disclaimer**  
For this test project **only**, the `.env.example` file with the GitHub client_id and client_secret are exposed intentionally to facilitate quick setup and testing.  
**In a real production environment, environment variables and sensitive credentials must always be securely managed and never exposed.**

Install dependencies  

    npm i
 

Setup Docker 

    npm run docker-compose

> 
> 
> 
> Recommendation: open docker desktop in your machine and start **hello-build-test-backend** container


Start server 

    npm run dev

> Automatically the migrations will be executed
> You'll see in you bash this log -> INFO [----:--:--]: Server is running on port 3000

---

## Authentication

For security purposes, a **login system was implemented** the password is encrypted using bcrypt.

# API Architecture Overview
## Tech Stack
- **NodeJS** + **TypeScript**
- **Express** as HTTP framework
- **PostgreSQL** as the database
- **Drizzle ORM** for schema and SQL abstraction
- **Zod** for schema validation
- **Awilix** for dependency injection
- **Pino-Pretty** for logging
- **Biome** for linter and format
- **Axios** for github api requests

---

## Project Structure

This API is built using a **Hexagonal Architecture**.

### `src/modules/<entity>`
Each entity has its own folder with the following layers:
- `application`: use cases, DTOs
- `domain`: interfaces, contracts, core logic
- `infrastructure`: controllers, repositories, external services

### `src/core`
Houses shared components and utilities:
- Global configuration
- Reusable middlewares
- Logging, mappers, helpers, validators

---

## Available Endpoints Per Entity

Each entity includes the following pre-defined REST endpoints:

- `POST /<entity>` → Create
- `PUT /<entity>/:id` → Update
- `GET /<entity>` → Get all
- `GET /<entity>/:id` → Get by ID
- `PATCH /<entity>/:id/toggle-status` → Toggle `isActive` status

---


## Data Auditing Per Table

Every database table includes the following fields for consistent data tracking:

- `is_active`: to enable soft deletes or logical deactivation
- `created_at`: timestamp for when the record was created
- `updated_at`: timestamp for the last update

These fields ensure proper auditing and traceability across the entire system.

---

## Testability

The use of **Awilix** for dependency injection allows for fully decoupled and easily testable components.

---

## Project Flow

This is the step-by-step process a user follows when interacting with the application:

1. **Account Creation**  
   The user creates a new account using the **Sign Up** functionality.

2. **Login**  
   After registration, the user logs in with their credentials.

3. **Dashboard Access**  
   Upon successful login, the user is redirected to a **Dashboard** view.

4. **GitHub Authentication**  
   On the Dashboard, the user clicks a button to authenticate via **GitHub OAuth**.  
   The app requests permission to access the user's GitHub repositories.

5. **Repository Listing**  
   After completing OAuth authentication, the user's GitHub repositories and starred repositories are retrieved and displayed.

6. **Repository Search**  
   The user can type into a **search input** to filter the repositories in real time.  
   As each character is typed, only repositories whose names include the typed text are shown.
