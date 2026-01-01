# Design: Dockerize Web App

## Architecture

The web application is a static React SPA built with Vite. The Dockerization strategy focuses on building these static assets and serving them efficiently.

### Dockerfile Strategy

A multi-stage build will be used:

1.  **Build Stage (`node:20-alpine`)**:
    - Install dependencies using `npm ci`.
    - Run `npm run build` to generate the `dist/` directory.
2.  **Production Stage (`nginx:stable-alpine`)**:
    - Copy the `dist/` directory from the build stage to `/usr/share/nginx/html`.
    - Provide a custom Nginx configuration to handle client-side routing (redirecting all requests to `index.html`).
    - Expose port 80.

### Docker Compose

A `docker-compose.yml` file will be provided to:

- Build the image locally.
- Map port 8080 on the host to port 80 in the container.
- Allow for easy startup with `docker compose up`.

### File Structure

- `Dockerfile`: Root directory.
- `nginx.conf`: Root directory (or a subdirectory if preferred, but root is simpler for this project).
- `docker-compose.yml`: Root directory.
- `.dockerignore`: Root directory.

## Trade-offs

- **Image Size**: Using `alpine` variants for both Node and Nginx keeps the image size minimal.
- **Build Time**: Multi-stage builds can be slightly slower than single-stage if not cached properly, but the benefits in image size and security outweigh this.
- **Complexity**: Adds a few configuration files to the root, but significantly improves portability.

## Security Considerations

- The production image will not contain the source code or build tools.
- Nginx will run as a non-root user if possible (using `nginxinc/nginx-unprivileged` or similar, though standard `nginx:alpine` is often acceptable for simple apps). For now, we'll stick to standard `nginx:alpine` for simplicity unless higher security is required.
