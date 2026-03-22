# 💸 Splitify – Smart Expense Splitter

A clean and minimal expense splitting web app that helps users divide group expenses effortlessly.

Built with a focus on **real-world usability, clean UI, and efficient calculation logic**.

---

## 🚀 Features

### ⚡ Quick Split (No Login Required)

* Add expenses instantly
* Select who paid and who was involved
* Get real-time balance calculation
* No signup needed → fast and simple

---

### 📊 Smart Expense Logic

* Supports **multiple payers**
* Supports **custom participants per expense**
* Automatically calculates:

  * Who **owes**
  * Who **gets**
* Handles real-world messy scenarios (like trips, shared meals, etc.)

---

### 🔁 Individual Settlement System

* Shows exact **who pays whom**
* No over-simplification (transparent calculations)
* Net balance optimization between users

---

### 💾 Save Trips (Local Storage)

* Save trips without login
* Data persists on same device/browser
* Reload and continue anytime

---

### 📁 My Trips Dashboard

* View all saved trips
* Open and continue editing
* Delete trips when not needed

---

## 🧠 How It Works

Each expense contains:

* `amount` → total expense
* `paidBy` → who paid
* `participants` → who shared the expense

### Calculation Flow:

1. Split expense among selected participants
2. Add full amount to payer
3. Subtract individual share from participants
4. Compute final balances
5. Generate settlement (who pays whom)

---

## 🛠 Tech Stack

* **Frontend:** React (Vite)
* **Styling:** Tailwind CSS
* **Animations:** Framer Motion
* **Storage:** LocalStorage (no backend)

---

## 📸 UI Highlights

* Clean, minimal interface
* Card-based layout
* Responsive design (mobile + desktop)
* Smooth interactions & transitions

---

## 📦 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/your-username/splitify.git

# Navigate to project folder
cd splitify

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 🌐 Live Demo

> https://expensesplitify.netlify.app/

---

## 🎯 Future Improvements

* 🔐 Google Authentication
* ☁️ Cloud storage (MongoDB)
* 📊 Expense analytics & charts
* 🌙 Dark mode
* 📱 PWA support

---

## 💡 Inspiration

Inspired by real-world tools like Splitwise, but designed with a **minimal and intuitive UI approach**.

---

## 👩‍💻 Author

**Kashish Gupta**

* UI/UX Designer & Developer
* Passionate about building clean and user-friendly products

---

## ⭐ Show Your Support

If you like this project:

* ⭐ Star the repo
* 🍴 Fork it
* 💬 Share feedback

---

## 📌 Note

This project is designed as a **real-world problem-solving application**, focusing on logic, UX, and clean design.

---
