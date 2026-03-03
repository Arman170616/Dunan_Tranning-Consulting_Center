# Dunant Institute — Training & Consulting Center

A full-stack web application for the **Dunant Institute for Consulting and Training**, featuring a Next.js frontend and a Django REST API backend with SQLite database.

---

## Project Structure

```
Duran-Traning Project/
├── frontend/          # Next.js 16 (React 19, Tailwind CSS, TypeScript)
└── backend/           # Django 6 REST API (SQLite database)
```

---

## Tech Stack

| Layer     | Technology                              |
|-----------|-----------------------------------------|
| Frontend  | Next.js 16, React 19, TypeScript        |
| Styling   | Tailwind CSS v4, Radix UI, shadcn/ui    |
| Backend   | Django 6, Django REST Framework         |
| Database  | SQLite                                  |
| CORS      | django-cors-headers                     |

---

## Features

- **Trainer Registration Form** — Collects name, nationality, country, city, specialization, and document upload (CV + training material). Data saved to SQLite via Django REST API.
- **Contact Form** — Collects name, email, subject, and message. Data saved to SQLite via Django REST API.
- **Django Admin Panel** — View and manage all registrations and contact messages at `/admin/`.
- **File Uploads** — Uploaded documents stored in `backend/media/documents/`.
- **Arabic RTL Support** — Full right-to-left layout for Arabic content.

---

## API Endpoints

| Method | Endpoint           | Description                        |
|--------|--------------------|------------------------------------|
| POST   | `/api/register/`   | Submit trainer registration        |
| GET    | `/api/register/`   | List all trainer registrations     |
| POST   | `/api/contact/`    | Submit a contact message           |
| GET    | `/api/contact/`    | List all contact messages          |

---

## Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+
- pnpm

---

### Backend Setup

```bash
cd backend

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate        # macOS/Linux
# venv\Scripts\activate         # Windows

# Install dependencies
pip install django djangorestframework django-cors-headers pillow

# Run migrations
python manage.py migrate

# (Optional) Create admin superuser
python manage.py createsuperuser

# Start the server
python manage.py runserver
```

Backend runs at: **http://localhost:8000**
Admin panel: **http://localhost:8000/admin/**

---

### Frontend Setup

```bash
cd frontend

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

Frontend runs at: **http://localhost:3000**

---

## Environment

Both servers must run simultaneously:

| Service  | URL                        |
|----------|----------------------------|
| Frontend | http://localhost:3000       |
| Backend  | http://localhost:8000       |
| Admin    | http://localhost:8000/admin |

---

## Database

SQLite database is located at `backend/db.sqlite3`.

**Tables:**
- `api_trainerregistration` — Trainer registration submissions
- `api_contactmessage` — Contact form submissions

---

## Deployment Notes

- Set `DEBUG = False` in `backend/config/settings.py` for production
- Replace `SECRET_KEY` with a secure value
- Update `CORS_ALLOWED_ORIGINS` and `ALLOWED_HOSTS` with your production domain
- Use PostgreSQL instead of SQLite for production
- Serve media files via a CDN or object storage (e.g., AWS S3)
