
# iGaming Leaderboard

This is a full-stack mini iGaming leaderboard application.

## Tech Stack

*   **Frontend:** React, TypeScript, Redux Toolkit, React-Bootstrap, React-Toastify
*   **Backend:** Node.js, Express, TypeScript, Prisma, PostgreSQL, JWT, bcryptjs
*   **Testing:** Jest
*   **Containerization:** Docker, Docker Compose

## Setup

1.  **Prerequisites:**
    *   Docker and Docker Compose installed.

2.  **Database Setup and Migration:**
    *   First, ensure your Docker daemon is running.
    *   From the root directory of the project, run the database migration command within the backend service:
        ```bash
        docker compose run --rm backend npx prisma migrate dev --name init
        ```
        This command will:
        *   Start the `db` service (PostgreSQL) if it's not already running.
        *   Run the `npx prisma migrate dev --name init` command inside a temporary `backend` container.
        *   Apply the database schema changes.
        *   The `--rm` flag ensures the temporary container is removed after execution.

3.  **Build and Run the Application:**
    *   From the root directory of the project (`/home/walter/Projects/Assesments/RelaxGaming`), run:
        ```bash
        docker compose up --build
        ```
    *   This will build the Docker images for both frontend and backend, start the PostgreSQL service, and then start the backend and frontend services.

4.  **Access the Application:**
    *   The frontend application will be available at `http://localhost:3000`.

## Admin Access

*   **Default Admin Credentials:**
    *   **Username:** `admin`
    *   **Password:** `adminpassword`
    *   These credentials are automatically created on the first successful backend startup if no admin user exists.

## Design Decisions

*   **PostgreSQL with Prisma:** The backend uses PostgreSQL as a persistent data store, managed by Prisma ORM for type-safe database interactions.
*   **Containerization:** The application is containerized using Docker and Docker Compose for consistent environments and simplified deployment.
*   **Authentication (JWT):** Admin routes are protected using JSON Web Tokens (JWT) for secure access.
*   **Centralized API Calls:** Frontend API interactions are centralized in a dedicated `api` directory with a custom `apiClient` for consistent error handling.
*   **Redux Hooks:** Redux state management is exposed via custom hooks (`useLeaderboard`) for cleaner component logic.
*   **Improved Admin Dashboard:** The Admin Dashboard UI has been enhanced with Bootstrap styling, proper forms, player selection dropdowns, and toast notifications for user feedback.

## Known Limitations

*   **No Real-time Updates:** The leaderboard does not update in real-time (requires WebSockets).
*   **Basic Validation:** The application implements basic input validation. For a production application, more robust validation would be required.
