# Food Delivery Microservice Backend

This repository hosts the backend for a food delivery platform, developed with NestJS using a monorepo architecture.

## Key Features

- **HTTP API Gateway**
- **Microservices**: User, Auth, Admin, Restaurant, Order, and Delivery Agent functionalities
- **Data Storage**: PostgreSQL
- **Inter-service Communication**: Docker and NATS
- **CI/CD**: GitHub Actions
- **Monitoring and Logging**: Prometheus, Grafana,

## Future Plans

- **Kubernetes (K8s)**: Integration for enhanced orchestration and scalability
- **Consul**: Service discovery, configuration, and segmentation management
- **Notification service**:
- **Analytics**:

## About

This setup ensures scalable, maintainable, and efficient service delivery, supporting robust performance and easy monitoring.

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/Jayabrata18/Food-delivery-app-microservice-backend
   ```
2. **Navigate to the project directory**
   ```bash
   cd Food-delivery-app-microservice-backend
   ```
3. **Install dependencies**
   ```bash
   yan install
   ```
4. **Add env**
   ```   
NODE_ENV= development
NATS_URI=nats://nats
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=postgres
HTTP_PORT=3000
    ```
5. **Run the application**
   ```bash
   docker compose up --build -V
   ```

## Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

# ALL THE NECESSARY COMAMDS

1. nest new odering-app
2. nest new generate app orders
3. nest new g app users
4. docker volume create postgres-data
5. nest generate app delivery-partners
   6.docker system prune -a -f --volumes
