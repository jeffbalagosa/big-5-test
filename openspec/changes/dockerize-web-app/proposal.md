# Proposal: Dockerize Web App

## Problem

The Big Five Test application currently requires a local development environment with Node.js and Python installed to run. This makes it harder for new contributors to get started and complicates deployment to different environments.

## Proposed Change

Introduce Docker support for the web application to provide a consistent, containerized environment for both development and production.

### Key Components

1.  **Dockerfile**: A multi-stage Dockerfile for the React frontend.
    - **Build Stage**: Uses Node.js to build the production assets.
    - **Production Stage**: Uses Nginx to serve the static assets.
2.  **docker-compose.yml**: A configuration file to easily spin up the containerized application.
3.  **.dockerignore**: To exclude unnecessary files from the Docker build context.
4.  **Documentation**: Update `README.md` with instructions on how to run the app using Docker.

## Impact

- **Development**: Easier setup for developers who have Docker installed.
- **Deployment**: Simplified deployment process using container images.
- **Consistency**: Ensures the app runs the same way across different machines.

## Alternatives Considered

- **Single-stage Dockerfile**: Larger image size and less secure as it would include build tools in the final image.
- **Dockerizing the Python CLI**: While useful, the primary request is to dockerize the "web app". The Python CLI can be dockerized in a separate effort if needed, or included as a separate service in `docker-compose.yml` if it were a backend API (which it currently isn't).
