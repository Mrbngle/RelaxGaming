
# iGaming Leaderboard

This is a full-stack mini iGaming leaderboard application.

## Tech Stack

*   **Frontend:** React, TypeScript, Redux Toolkit, Bootstrap
*   **Backend:** Node.js, Express, TypeScript
*   **Testing:** Jest

## Setup

### Backend

1.  Navigate to the `backend` directory.
2.  Run `npm install` to install the dependencies.
3.  Run `npm run dev` to start the development server.

### Frontend

1.  Navigate to the `frontend` directory.
2.  Run `npm install` to install the dependencies.
3.  Run `npm start` to start the development server.

## Design Decisions

*   **In-Memory Storage:** For simplicity, the backend uses in-memory storage. This means that the data will be lost when the server is restarted.
*   **Basic Validation:** The application implements basic input validation. For a production application, more robust validation would be required.

## Known Limitations

*   **No Authentication:** The admin dashboard is not protected by authentication.
*   **No Real-time Updates:** The leaderboard does not update in real-time.
