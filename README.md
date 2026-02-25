# LOCOMATE Backend

Enterprise-grade Indoor Mall Navigation, Offers & Rewards Platform

## Features

### Mobile App Backend
- OTP-based authentication with JWT
- User profile management
- Multi-mall support with floor navigation
- Indoor navigation with Dijkstra algorithm
- Offers and rewards system
- Saved items (stores & offers)
- Brand messaging
- Parking management with charge calculation

### Admin CRM Backend
- Role-based access control (RBAC)
- Mall, floor, and store management
- Offer and reward management
- User management
- Analytics dashboard
- Admin activity logs
- Messaging system

## Tech Stack

- Node.js (LTS)
- TypeScript
- Fastify
- MySQL
- Prisma ORM
- Redis
- JWT Authentication
- Zod Validation
- Pino Logger
- Docker & Docker Compose

## Getting Started

### Prerequisites

- Node.js 20+
- MySQL 8.0+
- Redis 7+
- Docker & Docker Compose (optional)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd locomate-backend
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Generate Prisma client
```bash
npm run prisma:generate
```

5. Run database migrations
```bash
npm run prisma:migrate
```

6. Start development server
```bash
npm run dev
```

### Using Docker

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## API Documentation

### Mobile API Endpoints

#### Authentication
- `POST /api/mobile/auth/send-otp` - Send OTP
- `POST /api/mobile/auth/verify-otp` - Verify OTP and login
- `POST /api/mobile/auth/refresh-token` - Refresh access token
- `POST /api/mobile/auth/logout` - Logout

#### User Profile
- `GET /api/mobile/users/profile` - Get profile
- `PUT /api/mobile/users/profile` - Update profile

#### Malls & Stores
- `GET /api/mobile/malls` - List malls
- `GET /api/mobile/malls/:id` - Get mall details
- `GET /api/mobile/malls/:mallId/floors` - Get floors
- `GET /api/mobile/malls/:mallId/stores` - Get stores
- `GET /api/mobile/malls/:mallId/stores/search` - Search stores
- `GET /api/mobile/malls/stores/:id` - Get store details

#### Navigation
- `POST /api/mobile/navigation/route` - Calculate route
- `GET /api/mobile/navigation/history` - Get navigation history

#### Offers & Rewards
- `GET /api/mobile/offers` - List offers
- `GET /api/mobile/offers/:id` - Get offer details
- `POST /api/mobile/rewards/claim` - Claim offer
- `GET /api/mobile/rewards/my-claims` - Get my claims
- `POST /api/mobile/rewards/redeem` - Redeem reward

#### Saved Items
- `POST /api/mobile/saved/store` - Save store
- `POST /api/mobile/saved/offer` - Save offer
- `DELETE /api/mobile/saved/:id` - Remove saved item
- `GET /api/mobile/saved` - Get saved items

#### Messaging
- `GET /api/mobile/messages` - Get messages
- `POST /api/mobile/messages/:id/read` - Mark as read

#### Parking
- `POST /api/mobile/parking/start` - Start parking
- `GET /api/mobile/parking/active` - Get active session
- `POST /api/mobile/parking/end` - End parking
- `GET /api/mobile/parking/history` - Get parking history

### Admin API Endpoints

#### Authentication
- `POST /api/admin/auth/login` - Admin login
- `POST /api/admin/auth/refresh-token` - Refresh token
- `POST /api/admin/auth/logout` - Logout

## Database Schema

The system uses Prisma ORM with MySQL. Key models include:

- User
- Admin
- Role & Permission
- Mall, Floor, Store
- Offer, RewardClaim
- SavedItem
- RouteHistory
- Message
- ParkingSession
- RefreshToken
- AdminLog

## Security Features

- Helmet for security headers
- Rate limiting
- CORS configuration
- Input validation with Zod
- JWT authentication (separate for mobile & admin)
- Password hashing with bcrypt
- OTP stored in Redis with expiry
- Server-side offer expiry validation
- Reward code validation

## Performance Optimizations

- Database indexing
- Redis caching for popular offers
- Pagination support
- Lazy loading
- Optimized queries with Prisma

## Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## Production Deployment

1. Build the application
```bash
npm run build
```

2. Start production server
```bash
npm start
```

3. Or use Docker
```bash
docker-compose -f docker-compose.yml up -d
```

## Environment Variables

See `.env.example` for all required environment variables.

## License

MIT
