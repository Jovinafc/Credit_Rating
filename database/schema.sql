CREATE DATABASE IF NOT EXISTS credit_ratings;
USE credit_ratings;

CREATE TABLE IF NOT EXISTS mortgages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    credit_score INT NOT NULL,
    loan_amount FLOAT NOT NULL,
    property_value FLOAT NOT NULL,
    annual_income FLOAT NOT NULL,
    debt_amount FLOAT NOT NULL,
    loan_type ENUM('fixed', 'adjustable') NOT NULL,
    property_type ENUM('single_family', 'condo') NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);