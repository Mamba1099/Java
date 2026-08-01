# Auth App

A simple Spring Boot authentication app with JWT login, user registration, H2 in-memory storage, and a small static frontend.

## Tech Stack

- Java 26
- Spring Boot 4
- Spring Security
- Spring Data JPA
- H2 Database
- JWT

## Features

- Register a new user
- Log in and receive a JWT token
- Access a protected dashboard endpoint
- Serve a simple static UI from `src/main/resources/static`

## Run Locally

```bash
mvn clean spring-boot:run
```

Then open:

- `http://localhost:8080/` for the frontend
- `http://localhost:8080/h2-console` for the H2 console

## API Endpoints

- `POST /api/auth/register` - create a new user
- `POST /api/auth/login` - log in and get a JWT
- `GET /api/dashboard` - protected endpoint that requires `Authorization: Bearer <token>`

## Notes

- Data is stored in memory, so it resets when the app restarts.
- The H2 console uses the JDBC URL from `src/main/resources/application.properties`.
