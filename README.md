# HE Commerce Platform

Premium e-commerce platform for Hiciano Esencias - A luxury perfume store.

## Features

- 🛍️ Premium product catalog with 200+ perfumes
- 🔍 Advanced search and filtering
- 🛒 Shopping cart and wishlist
- 💳 Secure checkout with Stripe integration
- 👤 User authentication with Auth.js
- 📊 Admin dashboard with full management
- 📦 Inventory management
- 📈 Analytics and reporting
- 🎨 Modern UI with Tailwind CSS & Framer Motion
- ♿ WCAG accessibility compliant
- 🚀 SEO optimized
- 📱 Fully responsive design

## Tech Stack

- **Monorepo**: Turbo
- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **Forms**: React Hook Form, Zod
- **Database**: PostgreSQL, Prisma ORM
- **Authentication**: Auth.js
- **API**: REST with Next.js

## Project Structure

```
he-commerce-platform/
├── apps/
│   ├── web/              # Customer-facing store
│   └── admin/            # Admin dashboard
├── packages/
│   ├── ui/               # Shared UI components
│   ├── auth/             # Authentication logic
│   ├── database/         # Prisma setup & migrations
│   ├── config/           # Shared configurations
│   ├── types/            # Shared TypeScript types
│   └── utils/            # Shared utilities
└── docs/                 # Documentation
```

## Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- PostgreSQL database
- Git

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/bolivar16-commits/he-commerce-platform.git
cd he-commerce-platform
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Setup environment variables

Copy `.env.example` to `.env.local` in both `apps/web` and `apps/admin`:

```bash
cp apps/web/.env.example apps/web/.env.local
cp apps/admin/.env.example apps/admin/.env.local
```

### 4. Setup database

```bash
pnpm db:push
```

Or with migrations:

```bash
pnpm db:migrate
```

### 5. Run development servers

```bash
pnpm dev
```

- Web app: http://localhost:3000
- Admin app: http://localhost:3001
- Database Studio: http://localhost:5555

## Scripts

- `pnpm dev` - Start all dev servers
- `pnpm build` - Build all applications
- `pnpm start` - Start production servers
- `pnpm lint` - Run linters
- `pnpm format` - Format code
- `pnpm db:push` - Sync database schema
- `pnpm db:migrate` - Create database migration
- `pnpm db:studio` - Open Prisma Studio
- `pnpm clean` - Clean all dependencies and builds

## Environment Variables

See `.env.example` files in each app for required variables.

Key variables:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Secret for NextAuth
- `NEXTAUTH_URL` - Application URL
- `STRIPE_PUBLIC_KEY` - Stripe public key
- `STRIPE_SECRET_KEY` - Stripe secret key

## API Documentation

See `docs/API.md` for complete API documentation.

## Contributing

1. Create a feature branch
2. Make your changes
3. Run `pnpm lint` and `pnpm format`
4. Commit with descriptive messages
5. Push and create a pull request

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.
