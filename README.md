# Hotel Management System

A full-stack Hotel Booking and Management System built with a React frontend and a Django REST Framework backend, powered by a PostgreSQL database.

## 🏨 Features

- **Room Browsing**: View various types of rooms (Suites, Deluxe, Standard).
- **Image Slider**: High-quality room images with an interactive slider.
- **Real-time Availability**: Select dates to filter available rooms.
- **Booking System**: Secure room booking for registered users.
- **My Bookings**: Personalized dashboard to track your booking history and grouped by month/room.
- **Responsive Design**: Modern UI that works across all devices.

## 🛠️ Tech Stack

### Frontend
- **React 18** (Vite)
- **React Router** (Navigation)
- **Context API** (State Management)
- **CSS** (Custom Styling)

### Backend
- **Django 5.1** & **Django REST Framework**
- **PostgreSQL** (Primary Database)
- **Token Authentication** (Security)
- **psycopg2** & **dj-database-url**

---

## 🚀 Getting Started

### Prerequisites
- Node.js & npm
- Python 3.x
- PostgreSQL

### 1. Backend Setup (Django)
```bash
cd Booking-App-Backend-main/Booking-App-Backend-main
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements_utf8.txt
```

**Database Configuration:**
Create a `.env` file in the backend directory:
```env
DATABASE_URL=postgres://USER:PASSWORD@localhost:5433/hotel_db
DEBUG=True
SECRET_KEY=your_secret_key
```

Run Migrations:
```bash
python manage.py migrate
python add_images.py  # To populate initial room data
python manage.py runserver
```

### 2. Frontend Setup (React)
```bash
cd Booking-App-main (1)/Booking-App-main
npm install
npm run dev
```

The application will be available at `http://localhost:5173/`.

---

## 📸 Database Management
You can manage the system via the Django Admin at `http://127.0.0.1:8000/admin/` or via **pgAdmin** on port 5433.

## 📄 License
This project is for educational purposes.
