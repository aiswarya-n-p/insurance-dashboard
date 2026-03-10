# Insurance Coverage Breakdown Dashboard

## Overview

The *Insurance Coverage Breakdown Dashboard* is a full-stack web application built using *Python Flask and MySQL*.
It provides policyholders with a clear and interactive overview of their insurance coverage, claims usage, and remaining balance.

The system aggregates coverage data from multiple policies and presents it using visual cards, charts, and filtering tools. This allows users to easily understand how much of their insurance coverage has been used and how much remains available.

The project demonstrates backend API development, database integration, and interactive frontend dashboard design.

---

## Features

### Coverage Dashboard

* Displays *coverage cards* for each insurance policy.
* Shows:

  * Total Coverage Limit
  * Used Amount (approved claims)
  * Remaining Balance
* Includes *color-coded progress bars*:

  * Green – less than 50% used
  * Yellow – 50–80% used
  * Red – more than 80% used

### Expandable Policy Details

Each coverage card contains an expandable section displaying:

* Recent Claims (date, amount, status)
* Policy Sub-limits (e.g., maternity coverage)
* Active Riders or add-ons

### Interactive Filtering and Sorting

Users can interactively:

* Filter policies by *category*

  * Personal
  * Business
* Sort policies by

  * Policy name
  * Remaining balance

All filtering and sorting operations are handled on the *client side using JavaScript*.

### Real-Time Data Updates

The dashboard automatically refreshes coverage data every *5 seconds* using a polling mechanism to ensure the remaining balance reflects newly approved claims.

### Analytics Visualization

A coverage analytics chart displays:

* Used coverage
* Remaining coverage

This provides a quick visual overview of policy utilization.

### Login Interface

The application includes a simple login interface where users authenticate using their name and password before accessing the dashboard.

---

## Technology Stack

### Backend

* Python
* Flask
* SQLAlchemy
* MySQL

### Frontend

* HTML
* Bootstrap 5
* JavaScript
* Chart.js

### Database

* MySQL relational database

---

## Project Structure


insurance_dashboard_project
│
├── app.py                # Flask application and API routes
├── models.py             # Database models and queries
│
├── templates
│   ├── base.html         # Base layout template
│   ├── dashboard.html    # Main dashboard page
│   └── policy_card.html  # Reusable coverage card component
│
├── static
│   └── dashboard.js      # Frontend logic (filtering, sorting, polling)
│
└── schema.sql            # Database initialization script


---

## Database Setup

Create the database in MySQL:

sql
CREATE DATABASE insurance_dashboard;
USE insurance_dashboard;


Run the schema file:


schema.sql


This script creates the required tables:

* policies
* claims
* sub_limits
* riders

It also inserts sample data for testing.

---

## Installation

### 1. Clone the repository


git clone https://github.com/yourusername/insurance-dashboard.git
cd insurance-dashboard


### 2. Create a virtual environment


python -m venv venv


Activate it:

Windows


venv\Scripts\activate


Mac/Linux


source venv/bin/activate


### 3. Install dependencies


pip install flask
pip install flask_sqlalchemy
pip install pymysql


---

## Database Configuration

Update the MySQL connection string in *app.py*:
Replace the username or password if necessary.

---

## Running the Application

Start the Flask server:


python app.py


Open the application in your browser:


http://127.0.0.1:5000


---

## Demo Login


Id: 123
Password: 123


After login the dashboard will load policy coverage data.

---

## API Endpoints

### Get all policies


GET /api/policies


Returns policy data including:

* policy details
* claim history
* sub-limits
* riders
* calculated remaining balance

Remaining balance is calculated on the backend as:


Remaining Balance = Total Limit − Sum of Approved Claims


---

## Browser Compatibility

Tested on:

* Google Chrome
* Microsoft Edge
* Mozilla Firefox

---

## Future Improvements

Potential enhancements for production use:

* Secure authentication using Flask sessions
* Role-based access control
* WebSocket updates instead of polling
* Advanced analytics dashboards
* Customer profile management

---

## Author

Aiswarya N P

This project was developed as part of a technical assessment to demonstrate full-stack development skills using Python, Flask, MySQL, and modern frontend techniques.
