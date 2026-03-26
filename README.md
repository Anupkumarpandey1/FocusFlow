# 🗂️ FocusFlow 

> A Smart Task & Focus Management SaaS (Notion + Pomodoro Hybrid)

Welcome to **FocusFlow**, a productivity application designed to help users manage tasks, run dedicated focus sessions, and track their productivity over time visually. 

## ✨ Core Features
- **JWT-Based Authentication**: Secure user registration and login endpoints utilizing bcrypt hashing and JSON Web Tokens.
- **Task Management API**: Full CRUD capabilities for task tracking. Users can seamlessly create to-dos, strike them out, and delete them.
- **Smart Pomodoro Timer**: A built-in focus timer (25 min default) embedded directly into the dashboard.
- **Session DB Tracking**: The killer feature! Completed timers sync to the backend `FocusSessions` database layer for permanent record.
- **Analytics Dashboard**: Dynamic extraction of completed tasks, total focused hours, and activity streaks synced in real-time.

## 🛠 Tech Stack
| Layer      | Technologies Used |
|------------|-------------------|
| **Frontend** | React, Vite, Tailwind CSS v4, Lucide React |
| **Backend**  | Node.js, Express.js                 |
| **Database** | MongoDB Atlas, Mongoose             |
| **Auth**     | JSON Web Tokens (JWT), bcrypt       |
| **API**      | Axios                               |

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js and MongoDB installed or have a MongoDB URI.

### Environment Setup
Create a `.env` file in the `backend` folder containing:
```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/focusflow
JWT_SECRET=supersecretfocusflowkey2026
```

### Run Locally
Open two terminal windows:

**Terminal 1 (Backend)**
```bash
cd backend
npm install
npm run dev
```

**Terminal 2 (Frontend)**
```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173` to experience the SaaS dashboard.

## 📈 Resume Talking Points
- *"Designed an analytics dashboard visualizing user productivity utilizing React context states."*
- *"Built a decoupled MERN app architecture utilizing Express middleware to handle JWT authorization and strict resource matching."*
- *"Implemented a live-updating Pomodoro timer that synchronizes focus blocks into a complex MongoDB relational schema."*
