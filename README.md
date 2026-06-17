# AIM Study Circle

Government coaching center application featuring a Spring Boot backend, a MongoDB database, and a static HTML/JS frontend.

## Prerequisites
- **Java 17+** and **Maven** for the backend.
- **Node.js** (for running the frontend locally).
- **MongoDB** running locally on port `27017` with the `aim` database populated.

## Running the Application

### 1. Database
Make sure MongoDB is running locally. The backend connects to:
`mongodb://localhost:27017/aim`

### 2. Backend (Spring Boot)
Open a terminal in the root project directory (`d:\aim`) and run:
```bash
mvnw spring-boot:run
```
The backend will start on `http://localhost:8080`.

### 3. Frontend (Static HTML/JS)
The frontend files are located in `src/main/resources/static`. To serve these files locally, open another terminal in the root directory and run:
```bash
npx serve src/main/resources/static
```
This will start a local server (typically at `http://localhost:3000`).
Open that URL in your browser to view the application.

## Troubleshooting
- **Missing Images**: If faculty or testimonials images are missing, they operate using placeholder UI avatars unless replaced in the `assets/` folder.
- **Connection Refused (Frontend)**: Ensure the backend is actively running on port 8080 so that login, registration, and data fetching work properly.
