# GV Trucking

Laravel app with **React** (Inertia.js + Vite), **Breeze** auth, **roles & permissions**, **API REST** (Sanctum), and optional **Microsoft sign-in**. Default database: **MySQL** (also supports PostgreSQL or SQLite).

## Requirements

- PHP 8.2+, Composer
- Node.js 18+, npm
- Database: MySQL (default), PostgreSQL, or SQLite
- (Optional) PHP `zip` extension

## Install

```bash
cp .env.example .env
php artisan key:generate
# Set DB_* in .env (MySQL by default)

composer install
php artisan migrate

npm install
npm run build
```

## Run

```bash
# Backend
php artisan serve

# Frontend (dev with hot reload) — in another terminal
npm run dev
```

- App: **http://127.0.0.1:8000**
- API: **http://127.0.0.1:8000/api**

## Config (.env)

| Key | Purpose |
|-----|---------|
| `DB_*` | MySQL connection (`DB_CONNECTION=mysql`, port `3306`) |
| `APP_URL` | Base URL (e.g. `http://localhost:8000`) |
| `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET` | Optional Microsoft sign-in |
| `MAIL_*` | Mail (e.g. password reset) |

## Seed (admin users)

```bash
php artisan db:seed --class=RoleSeeder
php artisan db:seed --class=AdminUserSeeder
```

Default admin passwords: **`admin`**. Change in production.

## Testing

```bash
php artisan test
```

The project includes comprehensive tests:
- **Feature tests**: Admin controllers (Users, Roles, Permissions), API endpoints
- **Unit tests**: Models (User, Role, Permission)
- **89+ tests** covering CRUD operations, validations, authorization, and security

## Deploy

```bash
git clone <repo> . && cd .
cp .env.example .env && php artisan key:generate
# Edit .env (DB_*, APP_URL)

composer install --no-dev --optimize-autoloader
php artisan migrate --force
php artisan db:seed --class=RoleSeeder
php artisan db:seed --class=AdminUserSeeder

npm ci && npm run build
php artisan config:cache && php artisan route:cache && php artisan view:cache
```

## Stack

- Laravel 12, Inertia.js 2, React 18, Tailwind CSS
- Laravel Breeze (auth), Sanctum (API)
- Roles & permissions (custom)
