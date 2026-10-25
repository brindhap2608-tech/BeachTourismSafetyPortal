# 🌊 Interactive Beach Tourism & Safety Information Portal

A complete, working MERN stack project developed for academic presentation and college final review.

---

## 🌟 Key Features Implemented

1. **Home Page (`/`)**: Hero banner, interactive search bar, live system health check (Backend API + MongoDB status), active hazard strip, and featured beaches preview.
2. **Beach Information (`/beaches`)**: Displays all 6 beaches (Marina, Kovalam, Mahabalipuram, Pondicherry, Goa Baga, Puri) with photos, locations, safety levels, and facilities.
3. **Search Beaches (`/beaches?q=...`)**: Real-time filtering by beach name, location, and safety category (Safe, Moderate, Caution).
4. **Beach Details (`/beaches/:id`)**: Comprehensive view of visiting hours, patrolled zones, facility checklists, and tailored safety advisories.
5. **Safety Guidelines (`/safety`)**: Visual guide to Beach Warning Flags (Red, Yellow, Green, Purple, Double Red), Rip Current Survival Steps (Don't panic, swim parallel), and Do’s & Don’ts.
6. **Safety Alerts (`/alerts`)**: Live coastal hazard advisories fetched from backend with severity badges and advice.
7. **Emergency Contacts (`/emergency`)**: Direct-dial helplines for Coast Guard (1554), Police (100 / 112), Ambulance (108), and Coastal Police (1093) + drowning first-aid protocol.
8. **Tourist Reviews & Ratings (`/beaches/:id`)**: Interactive star rating (1–5 stars), community review list, and new review submission form with instant update.
9. **Admin Dashboard (`/admin`)**: Monitoring statistics, registered beaches database, active alerts table with dismiss capability, and a form to broadcast new safety alerts.
10. **Authentication (`/login`, `/register`)**: Simple authentication with one-click demo credentials.

---

## 🛡️ Fail-Safe Demo Mode
All API endpoints include an automatic in-memory fallback. Even if MongoDB is stopped or not running on the presentation computer, **the application will continue working smoothly without crashing**.

---

## 🚀 How to Run the Project for Tomorrow's Review

### Terminal 1: Start Backend
```bash
cd backend
npm run dev
```
- Server starts on: `http://localhost:5000`
- Automatically seeds the 6 beaches, 3 alerts, 4 emergency contacts, and demo accounts.

### Terminal 2: Start Frontend
```bash
cd frontend
npm run dev
```
- Open in browser: `http://localhost:5173`

---

## 🔑 Demo Login Credentials

| Role | Email | Password |
|---|---|---|
| **Tourist** | `tourist@beachtourism.com` | `password` |
| **Admin** | `admin@beachtourism.com` | `admin` |

*(Quick one-click autofill buttons are also provided directly on the Login page and Admin page for instant demonstration.)*

---

## 📡 API Endpoints Summary

- `GET /api/status` - Health check (Express & MongoDB state)
- `GET /api/beaches` - List of all 6 beaches
- `GET /api/beaches/search?q=marina` - Search beaches by keyword
- `GET /api/beaches/:id` - Single beach details
- `GET /api/alerts` - Active safety alerts
- `POST /api/alerts` - Broadcast a new safety alert (Admin)
- `DELETE /api/alerts/:id` - Dismiss an active safety alert (Admin)
- `GET /api/emergency` - Emergency hotlines and helplines
- `GET /api/reviews/:beachId` - Tourist reviews for a beach
- `POST /api/reviews` - Submit a new review & rating
- `POST /api/register` - Create user account
- `POST /api/login` - Authenticate user
