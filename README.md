# 🏬 Locomate Backend

Enterprise-grade Indoor Mall Navigation, Offers & Rewards Platform

## 📋 Overview

Locomate is a comprehensive backend system for indoor mall navigation, offering management, rewards programs, and parking services. Built with modern technologies and designed for scalability, it provides both mobile app APIs and admin CRM functionality.

## ✨ Key Features

### Mobile App Features
- 📱 **OTP-based Authentication** - Secure phone number verification
- 🗺️ **Indoor Navigation** - Real-time pathfinding within malls
- 🏪 **Store Discovery** - Browse and search stores by category
- 🎁 **Offers & Rewards** - Claim and redeem exclusive deals
- 💾 **Saved Items** - Bookmark favorite stores and offers
- 🅿️ **Parking Management** - Track parking sessions and charges
- 💬 **Push Messaging** - Receive targeted notifications
- 📊 **Navigation History** - Track visited stores

### Admin CRM Features
- 🔐 **Role-based Access Control** - Granular permissions system
- 👥 **User Management** - Monitor and manage app users
- 🏢 **Mall & Store Management** - Complete CRUD operations
- 🎯 **Offer Management** - Create and track promotional campaigns
- 📈 **Analytics Dashboard** - Business insights and metrics
- 📝 **Activity Logging** - Comprehensive audit trails

## 🛠️ Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Fastify (high-performance web framework)
- **Database**: MySQL with Prisma ORM
- **Cache**: Redis (session management & rate limiting)
- **Authentication**: JWT (separate tokens for mobile & admin)
- **Validation**: Zod schemas
- **Security**: Helmet, CORS, Rate Limiting
- **Logging**: Pino (structured logging)
- **Testing**: Vitest

## 📦 Installation

### Prerequisites

- Node.js 18+ 
- MySQL 8+
- Redis 6+
- npm or yarn

### Setup Steps

1. **Clone the repository**
```bash
git clone https://github.com/LOCOMATEAPP/locomate-backend.git
cd locomate-backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Setup database**
```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed database with sample data
npx tsx prisma/seed.ts
```

5. **Start the server**
```bash
# Development mode with hot reload
npm run dev

# Production build
npm run build
npm start
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `3000` |
| `DATABASE_URL` | MySQL connection string | - |
| `REDIS_HOST` | Redis host | `localhost` |
| `REDIS_PORT` | Redis port | `6379` |
| `MOBILE_JWT_ACCESS_SECRET` | Mobile JWT access secret | - |
| `MOBILE_JWT_REFRESH_SECRET` | Mobile JWT refresh secret | - |
| `ADMIN_JWT_ACCESS_SECRET` | Admin JWT access secret | - |
| `ADMIN_JWT_REFRESH_SECRET` | Admin JWT refresh secret | - |
| `JWT_ACCESS_EXPIRY` | Access token expiry | `15m` |
| `JWT_REFRESH_EXPIRY` | Refresh token expiry | `7d` |
| `OTP_EXPIRY_SECONDS` | OTP validity duration | `300` |
| `PARKING_RATE_PER_HOUR` | Parking charge rate | `50` |

See `.env.example` for complete configuration options.

## 🚀 API Documentation

### Base URL
```
http://localhost:3000
```

### Authentication

#### Mobile App - OTP Login
```bash
# 1. Send OTP
POST /api/mobile/auth/send-otp
{
  "phone": "+1234567890"
}

# 2. Verify OTP
POST /api/mobile/auth/verify-otp
{
  "phone": "+1234567890",
  "otp": "123456"
}
```

#### Admin - Email/Password Login
```bash
POST /api/admin/auth/login
{
  "email": "admin@locomate.com",
  "password": "admin123"
}
```

### Mobile API Endpoints

| Category | Endpoint | Method | Description |
|----------|----------|--------|-------------|
| **Auth** | `/api/mobile/auth/send-otp` | POST | Send OTP to phone |
| | `/api/mobile/auth/verify-otp` | POST | Verify OTP & login |
| | `/api/mobile/auth/refresh-token` | POST | Refresh access token |
| | `/api/mobile/auth/logout` | POST | Logout user |
| **Profile** | `/api/mobile/users/profile` | GET | Get user profile |
| | `/api/mobile/users/profile` | PUT | Update profile |
| **Malls** | `/api/mobile/malls` | GET | List all malls |
| | `/api/mobile/malls/:id` | GET | Get mall details |
| | `/api/mobile/malls/:id/floors` | GET | Get mall floors |
| | `/api/mobile/malls/:id/stores` | GET | Get stores in mall |
| **Navigation** | `/api/mobile/navigation/route` | POST | Calculate route |
| | `/api/mobile/navigation/history` | GET | Navigation history |
| **Offers** | `/api/mobile/offers` | GET | List active offers |
| | `/api/mobile/offers/:id` | GET | Get offer details |
| **Rewards** | `/api/mobile/rewards/claim` | POST | Claim offer reward |
| | `/api/mobile/rewards/my-claims` | GET | My claimed rewards |
| | `/api/mobile/rewards/redeem` | POST | Redeem reward code |
| **Saved** | `/api/mobile/saved` | GET | Get saved items |
| | `/api/mobile/saved/store` | POST | Save store |
| | `/api/mobile/saved/offer` | POST | Save offer |
| | `/api/mobile/saved/:id` | DELETE | Remove saved item |
| **Parking** | `/api/mobile/parking/start` | POST | Start parking |
| | `/api/mobile/parking/active` | GET | Active session |
| | `/api/mobile/parking/end` | POST | End parking |
| | `/api/mobile/parking/history` | GET | Parking history |
| **Messages** | `/api/mobile/messages` | GET | Get messages |
| | `/api/mobile/messages/:id/read` | POST | Mark as read |

For detailed API examples, see [API_ENDPOINTS.txt](./API_ENDPOINTS.txt)

## 📁 Project Structure

```
locomate-backend/
├── prisma/
│   ├── migrations/          # Database migrations
│   ├── schema.prisma        # Database schema
│   └── seed.ts             # Seed data
├── src/
│   ├── config/             # Configuration files
│   │   ├── database.ts     # Prisma client
│   │   ├── env.ts          # Environment validation
│   │   ├── logger.ts       # Pino logger
│   │   └── redis.ts        # Redis client
│   ├── middleware/         # Custom middleware
│   │   ├── admin-auth.ts   # Admin JWT verification
│   │   ├── mobile-auth.ts  # Mobile JWT verification
│   │   └── error-handler.ts
│   ├── modules/
│   │   ├── admin/          # Admin CRM modules
│   │   │   ├── auth/
│   │   │   ├── analytics/
│   │   │   ├── malls/
│   │   │   ├── offers/
│   │   │   ├── stores/
│   │   │   └── users/
│   │   └── mobile/         # Mobile app modules
│   │       ├── auth/
│   │       ├── malls/
│   │       ├── navigation/
│   │       ├── offers/
│   │       ├── parking/
│   │       ├── rewards/
│   │       ├── saved/
│   │       ├── users/
│   │       └── messaging/
│   ├── plugins/            # Fastify plugins
│   │   ├── cors.ts
│   │   ├── helmet.ts
│   │   └── rate-limit.ts
│   ├── types/              # TypeScript types
│   ├── utils/              # Utility functions
│   │   ├── jwt.ts
│   │   ├── otp.ts
│   │   ├── password.ts
│   │   ├── pagination.ts
│   │   ├── navigation.ts
│   │   ├── reward-code.ts
│   │   └── response.ts
│   ├── app.ts              # Fastify app setup
│   └── server.ts           # Server entry point
├── tests/                  # Test files
├── .env.example            # Environment template
├── docker-compose.yml      # Docker setup
├── Dockerfile              # Container definition
└── package.json
```

## 🧪 Testing

```bash
# Run tests once
npm test

# Watch mode
npm run test:watch
```

## 🐳 Docker Deployment

```bash
# Start all services (MySQL, Redis, App)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 📊 Database Schema

The application uses a comprehensive relational schema with the following main entities:

- **Users** - Mobile app users with phone authentication
- **Admins** - CRM users with role-based permissions
- **Malls** - Shopping mall locations
- **Floors** - Mall floor plans with maps
- **Stores** - Individual stores with coordinates
- **Offers** - Promotional offers and deals
- **RewardClaims** - User-claimed rewards with unique codes
- **SavedItems** - User bookmarks
- **RouteHistory** - Navigation tracking
- **ParkingSessions** - Parking time and charges
- **Messages** - Push notifications
- **Roles & Permissions** - RBAC system

## 🔒 Security Features

- JWT-based authentication with separate tokens for mobile & admin
- Refresh token rotation
- Password hashing with bcrypt
- Rate limiting (100 requests per minute)
- CORS protection
- Helmet security headers
- Input validation with Zod schemas
- SQL injection prevention via Prisma ORM
- Redis-based session management

## 📈 Performance

- Fastify framework (3x faster than Express)
- Redis caching for frequently accessed data
- Database indexing on critical fields
- Pagination for large datasets
- Connection pooling
- Structured logging for monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm test` | Run tests |
| `npm run lint` | Lint code |
| `npm run format` | Format code with Prettier |
| `npm run prisma:generate` | Generate Prisma client |
| `npm run prisma:migrate` | Run database migrations |
| `npm run prisma:studio` | Open Prisma Studio GUI |

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Check MySQL is running
mysql -u root -p

# Verify DATABASE_URL in .env
```

### Redis Connection Issues
```bash
# Check Redis is running
redis-cli ping

# Should return: PONG
```

### Port Already in Use
```bash
# Change PORT in .env file
PORT=3001
```

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

Developed by the Locomate Team

## 📞 Support

For issues and questions:
- Create an issue on GitHub
- Email: support@locomate.com

---

**Built with ❤️ using TypeScript, Fastify, and Prisma**
