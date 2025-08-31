-- Drop and recreate database
DROP DATABASE IF EXISTS blood_organ_donation;
CREATE DATABASE blood_organ_donation;
USE blood_organ_donation;

-- Users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admins table
CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Donors table
CREATE TABLE donors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    actor_type ENUM('user','admin') NOT NULL,
    actor_id INT NOT NULL,
    blood_group VARCHAR(5) NOT NULL,
    organ VARCHAR(50),
    availability ENUM('yes','no') DEFAULT 'yes',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Requests table
CREATE TABLE requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    actor_type ENUM('user','admin') NOT NULL,
    actor_id INT NOT NULL,
    blood_group VARCHAR(5),
    organ VARCHAR(50),
    status ENUM('pending','approved','rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Messages table (from Contact Page)
CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -- Insert a sample admin
-- INSERT INTO admins (name, email, password)
-- VALUES ('Super Admin', 'admin@example.com', '$2y$10$N4yQo5AqU6Mhu2D5bEyNvOc2Yf3zPtK.0t6ah6HJeDDsufUHuV5qG'); 
-- -- Password: admin123

-- -- Insert a sample user
-- INSERT INTO users (name, email, password)
-- VALUES ('Test User', 'user@example.com', '$2y$10$Vw1B1x3bNHvK7zQ4RZAbwuQnT0Jm2lqU0t2jaGZVzXe2tDU5yX0O2');
-- -- Password: user123
