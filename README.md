# 📚 College Library Portal - DevOps Project

Welcome to the **College Library Portal**, a full-stack web application designed for students to search, view, and reserve books from their college library. This project also showcases modern DevOps practices such as CI/CD, version control, cloud database integration, and automated deployment.

---

## 🚀 Live Demo

🔗 **Deployed Website:** [[https://college-library-frontend.onrender.com](https://college-library-frontend.onrender.com)](https://library-frontend-eeq1.onrender.com/login.html)

---

## 🧰 Tech Stack

### 👨‍💻 Frontend

* HTML5, CSS3, JavaScript
* Hosted on [Render](https://render.com/) as a static site

### 🛠 Backend

* Node.js + Express.js
* RESTful APIs for login, search, reservation
* Deployed via Render using CI/CD pipeline

### ☁️ Database

* **MongoDB Atlas** (Cloud Database)
* Collections: Users, Books, Reservations

### 🔧 DevOps Tools

* **Git & GitHub**: Version control and code collaboration
* **Render**: CI/CD pipeline for automated deployment
* **MongoDB Atlas**: Persistent, cloud-hosted NoSQL database

---

## 📌 Features (Functionality Summary)

* Student login via USN & DOB
* Search for books by title
* Check availability of hard copies
* Reserve available books (limited to 3 at a time)
* Reservation expires after 1 hour
* Auto-expiry system cleans up stale reservations
* Frontend-to-backend integration using public APIs

---

## 🧪 DevOps Practices Followed

* Git for source control with commit history tracking
* GitHub repository for version management and trigger point
* Render auto-deployment on every `main` branch push
* MongoDB Atlas integration using `.env` secret management
* Manual seeding scripts (`seed.js`, `seedStudent.js`) for DB population

---

## 📁 Project Structure

```
College_Library_Portal/
├── backend/
│   ├── models/              # Mongoose schemas
│   ├── routes/              # API routes (login, search, reserve)
│   ├── seed.js              # Book seeding script
│   ├── seedStudent.js       # User seeding script
│   └── index.js             # Main server file
├── frontend/
│   ├── login.html
│   ├── home.html
│   ├── book.html
│   └── css/                 # Embedded or separate styling
├── .github/workflows/       # GitHub Actions YAML (optional)
└── README.md
```

---

## 🛠 Setup Instructions (Local Development)

1. Clone the repository
2. Run `npm install` inside `/backend`
3. Configure MongoDB URI (Atlas) in `.env`
4. Run `node seed.js` and `node seedStudent.js`
5. Launch server using `node index.js`
6. Open `frontend/login.html` in browser for testing

---

## 📬 Contact / Credits

Developed by: **Tanisha Rani**
GitHub: [TanishaRani-2004](https://github.com/TanishaRani-2004)

---

> "Empowering libraries with technology — built the DevOps way."
