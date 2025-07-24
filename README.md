# iGaming Leaderboard

This is a full-stack mini iGaming leaderboard application.

## Tech Stack

*   **Frontend:** React, TypeScript, Redux Toolkit, Bootstrap
*   **Backend:** Node.js, Express, TypeScript, Prisma, PostgreSQL
*   **Testing:** Jest
*   **Containerization:** Docker, Docker Compose

## Setup

1.  **Prerequisites:**
    *   Docker and Docker Compose installed.
    *   A PostgreSQL database running and accessible. Update the `DATABASE_URL` in `backend/.env` with your database connection string (e.g., `postgresql://USER:PASSWORD@HOST:PORT/relaxgaming?schema=public`).

2.  **Database Migration (First Time Setup):**
    *   Navigate to the `backend` directory:
        ```bash
        cd backend
        ```
    *   Run the Prisma migration to create the database schema:
        ```bash
        npx prisma migrate dev --name init
        ```

3.  **Build and Run with Docker Compose:**
    *   From the root directory of the project (`/home/walter/Projects/Assesments/RelaxGaming`), run:
        ```bash
        docker compose up --build
        ```
    *   This will build the Docker images for both frontend and backend, start the PostgreSQL service (if defined in `docker-compose.yml`), and then start the backend and frontend services.

4.  **Access the Application:**
    *   The frontend application will be available at `http://localhost:3000`.

## Design Decisions

*   **PostgreSQL with Prisma:** The backend now uses PostgreSQL as a persistent data store, managed by Prisma ORM for type-safe database interactions.
*   **Containerization:** The application is containerized using Docker and Docker Compose for consistent environments and simplified deployment.
*   **Basic Validation:** The application implements basic input validation. For a production application, more robust validation would be required.

## Known Limitations

*   **No Authentication:** The admin dashboard is not protected by authentication.
*   **No Real-time Updates:** The leaderboard does not update in real-time.