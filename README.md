# E-commerce Admin Backend

Administrative backend for an e-commerce system with multi-company support (whitelabel).

## 🚀 Features

### Main Modules

- **Authentication**

  - JWT Login
  - Google Authentication
  - Session Management
  - Password Recovery

- **Users**

  - User CRUD
  - Profile and Permission Management
  - Data Validation

- **Customers**

  - Customer Registration and Management
  - Purchase History
  - Contact and Address Information

- **Products**

  - Product Registration
  - Categorization
  - Stock Management
  - Pricing and Promotions

- **Orders**

  - Order Creation and Tracking
  - Order Status
  - Transaction History

- **Promotions**

  - Coupon Creation
  - Special Discounts
  - Promotion Rules

- **Shipping**

  - Shipping Calculation
  - Carrier Integration
  - Delivery Rules

- **Company**

  - Company Settings
  - Registration Data
  - Customization

- **File Storage**

  - Image Upload
  - AWS S3 Integration
  - Media Management

- **Email**
  - Transactional Email Sending
  - Customizable Templates
  - Automatic Notifications

## 🛠️ Technologies

- Node.js 16+
- TypeScript
- Express.js
- TypeORM
- PostgreSQL
- AWS S3
- JWT
- Docker

## 📋 Prerequisites

- Node.js 16+
- Docker and Docker Compose
- PostgreSQL
- AWS S3 (for file storage)

## 🔧 Installation

1. Clone the repository

```bash
git clone [repository-url]
```

2. Install dependencies

```bash
yarn install
```

3. Configure environment variables

```bash
cp .env.example .env
```

Edit the `.env` file with your configurations

4. Run database migrations

```bash
yarn migration:run
```

5. Start the server

```bash
yarn dev
```

## 🐳 Docker

The project includes Docker configuration for development:

```bash
docker-compose up
```

## 📦 Available Scripts

- `yarn dev`: Starts the server in development mode
- `yarn test`: Runs tests
- `yarn build`: Compiles the project for production
- `yarn start`: Starts the server in production
- `yarn migration:create`: Creates a new migration
- `yarn migration:run`: Runs pending migrations
- `yarn migration:down`: Reverts the last migration

## 🔐 Authentication

The API uses JWT for authentication. To access protected endpoints, include the token in the header:

```
Authorization: Bearer your-jwt-token
```

## 📝 API Documentation

Complete API documentation is available at [API-DOCUMENTATION-URL]

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
