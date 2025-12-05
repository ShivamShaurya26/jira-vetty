# Angular Mini-Jira Board

A client-side Kanban board application built with Angular 17+, Tailwind CSS, and Angular CDK.

## Features
- **Authentication**: Login with dummy credentials (`admin@test.com` / `admin123`).
- **Board**: 4-column Kanban board (To Do, In Progress, Need Review, Completed).
- **Task Management**: Create tasks, Drag and Drop tasks between columns.
- **Persistence**: Data saved to `localStorage`.

## Prerequisities
- Node.js (v18+)
- npm

## Setup & Run

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Start Development Server**
    ```bash
    npm start
    # or
    ng serve
    ```
    Navigate to `http://localhost:4200/`.

3.  **Build**
    ```bash
    npm run build
    ```

## Project Structure
- `src/app/pages`: Main pages (Login, Board).
- `src/app/components`: Reusable UI components (Sidebar, BoardColumn, TaskCard, Modals).
- `src/app/services`: State management and logic (AuthService, BoardService).
- `src/app/models`: TypeScript interfaces.

## Credentials
- **Email**: `admin@test.com`
- **Password**: `admin123`
