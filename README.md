# LifeConnect-Blood-Organ-Donation-Management-System-React.js-PHP

# 🩸 Blood & Organ Donation Platform

A full-stack **Blood & Organ Donation Website** built with **React.js, PHP, MySQL, Bootstrap, and Framer Motion**.  
This platform connects **donors, users, and hospitals** in real-time to save lives.

---

## ✨ Features

### 👤 User Features
- User/Admin **Registration & Login** (JWT + password hashing)
- Submit **Blood/Organ Requests**
- View **My Requests** with status updates (Pending/Approved/Rejected)
- Register as a **Donor**
- Browse **Donor Directory**

### 🛠️ Admin Features
- Admin authentication with separate table
- Manage all requests → **Approve/Reject**
- View Donor list
- Access Contact Messages from users

### 📄 General Pages
- **Home**: Modern responsive dashboard
- **About**: Mission, Vision, Values, Team, Timeline
- **Contact**: Contact form (stored in DB), Google Maps, social info
- **Navbar + Footer**: Responsive, animated, active-page highlighting

---

## 🛠️ Tech Stack

**Frontend:**
- React.js
- React Router DOM
- React Bootstrap
- Framer Motion (animations)

**Backend:**
- PHP (REST APIs)
- MySQL (Database)

**Tools:**
- XAMPP (Apache + MySQL)
- phpMyAdmin
- Node.js (for React)

---

## 📂 Project Structure

blood-organ-donation/
├── backend-php/
│ ├── db.php
│ └── api/
│ ├── register.php
│ ├── login.php
│ ├── donor_register.php
│ ├── request_register.php
│ ├── donors.php
│ ├── manage_requests.php
│ ├── update_request.php
│ ├── my_requests.php
│ └── contact.php
│
├── frontend-react/
│ ├── src/
│ │ ├── components/
│ │ │ ├── Auth.jsx
│ │ │ └── NavBar.jsx
│ │ ├── pages/
│ │ │ ├── Home.jsx
│ │ │ ├── DonorForm.jsx
│ │ │ ├── DonorList.jsx
│ │ │ ├── RequestForm.jsx
│ │ │ ├── MyRequests.jsx
│ │ │ ├── AdminRequests.jsx
│ │ │ ├── About.jsx
│ │ │ └── Contact.jsx
│ │ ├── App.js
│ │ └── index.js
│ └── package.json
│
└── blood_organ_donation.sql




---

## ⚙️ Setup Instructions

### 🗄️ Database
1. Open **phpMyAdmin**
2. Create DB: `blood_organ_donation`
3. Import `blood_organ_donation.sql` (schema + sample admin/user included)

### 🌐 Backend (PHP + MySQL)
1. Copy `backend-php/` → `C:\xampp\htdocs\blood-organ-donation\backend-php`
2. Start **Apache** + **MySQL** in XAMPP
3. Test API:  
http://localhost/blood-organ-donation/backend-php/api/register.php



### 💻 Frontend (React)
```bash
cd frontend-react
npm install
npm start
Open → http://localhost:3000

🧪 Test Accounts

Admin
Email: admin@example.com
Password: admin123

User
Email: user@example.com
Password: user123

💡 Monetization Ideas

Hospital partnerships (subscription access to donor DB)
Premium alerts for users (SMS/email notifications)
Corporate CSR sponsorships
Ethical ads (insurance, hospitals, labs)
Paid API access for hospitals

📸 Screenshots (add your screenshots here)

🏠 Home Page

🔐 Login / Register

📋 Donor Directory

📌 My Requests

📊 Admin Requests

📞 Contact Page

🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

📜 License

This project is licensed under the MIT License.

❤️ Acknowledgements

Built during a Hackathon to save lives with tech.
Thanks to React, PHP, Bootstrap, MySQL, and Open Source community.
