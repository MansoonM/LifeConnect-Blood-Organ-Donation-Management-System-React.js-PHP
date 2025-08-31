# Backend (PHP) Setup

1) Install XAMPP/WAMP/LAMP and start Apache + MySQL.
2) Import `schema.sql` into MySQL (via phpMyAdmin or CLI).
3) Put the `backend-php/` folder inside your web root (e.g., `htdocs/backend-php`).
4) Update DB credentials in `api/config.php` if needed.
5) Access a test endpoint: `http://localhost/backend-php/api/index.php`

API Endpoints (base: /backend-php/api):
- POST /register.php {name,email,password,role}
- POST /login.php {email,password}
- GET  /me.php
- POST /logout.php
- POST /donors/create.php {blood_group,organ,location,availability,last_donation}
- GET  /donors/list.php?[blood_group=A+&organ=Kidney&location=Bhubaneswar]
- POST /requests/create.php {blood_group,organ,urgency,details}
- GET  /requests/list.php (recipient sees own, admin sees all)
- POST /requests/update_status.php {id,status} (admin only)
- GET  /requests/find_matches.php?[blood_group=&organ=]
