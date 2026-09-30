Smart Attendance System

1. Project Title

Smart Attendance System

---

2. Problem Statement

The Smart Attendance System is a web-based application developed to manage student attendance digitally.

The system helps administrators and teachers manage classes, subjects, students, attendance records, attendance percentages, and attendance reports.

It reduces manual attendance work and makes attendance information easier to maintain and view.

---

3. Assigned Feature Set

Feature Set C

1. Login and Role Management
2. Class and Subject Management
3. Mark Attendance
4. Attendance Percentage
5. Attendance Report

---

4. Features Implemented

1. Login and Role Management

- Admin login
- Teacher login
- Password authentication
- Role-based access
- Logout functionality

2. Class and Subject Management

- Add new classes
- View classes
- Delete classes
- Add subjects
- View subjects
- Assign subjects to classes

3. Student Management

- Add students
- Enter student register number
- Assign students to classes
- View student details

4. Mark Attendance

- Select student
- Select subject
- Select date
- Mark Present or Absent
- Store attendance in the database

5. Attendance Percentage

- Calculate total attendance
- Calculate present days
- Calculate absent days
- Calculate attendance percentage

6. Attendance Report

- Display student attendance
- Display subject
- Display total classes
- Display present and absent count
- Display attendance percentage

---

5. Technologies Used

Frontend

- HTML
- CSS
- JavaScript

Backend

- Node.js
- Express.js

Database

- SQLite

Authentication

- bcryptjs
- JSON Web Token (JWT)

Development Tool

- Visual Studio Code

---

6. Database

The project uses SQLite to store application data.

The database contains tables for:

- Users
- Classes
- Subjects
- Students
- Attendance

The database file is automatically created when the application is run.

---

7. AI Tools Used

AI Tool: ChatGPT

AI was used as an assistance tool during development.

AI was used for:

- Understanding project requirements
- Planning the project structure
- Generating initial code
- Understanding Node.js and Express.js
- Debugging installation and runtime errors
- Understanding SQLite database operations
- Testing and improving the application
- Creating project documentation
- Preparing the README file

---

8. Important AI Prompts / AI Usage

Some prompts used during development include:

- "Give me steps to create a Smart Attendance System."
- "Give me Node.js and Express.js backend code."
- "Use SQLite database for the project."
- "Help me fix npm installation errors."
- "Explain how to run the project in VS Code."
- "Help me create the README.md file."
- "How can I test the attendance report?"
- "How can I add screenshots to README.md?"

The generated code was reviewed, tested, and modified during project development.

---

9. Project Structure

Smart-Attendance-System/
│
├── server.js
├── package.json
├── package-lock.json
├── attendance.db
├── README.md
│
├── screenshots/
│   ├── login.png
│   ├── dashboard.png
│   ├── class-management.png
│   ├── subject-management.png
│   ├── student-management.png
│   ├── mark-attendance.png
│   └── attendance-report.png
│
└── public/
    ├── index.html
    ├── style.css
    └── app.js

---

10. Instructions to Run

Step 1: Install Node.js

Make sure Node.js is installed on your computer.

Check the installation:

node -v
npm -v

Step 2: Open the Project

Open the "Smart-Attendance-System" folder in Visual Studio Code.

Step 3: Install Dependencies

Open the VS Code terminal and run:

npm install

If packages need to be installed separately:

npm install express
npm install sqlite3
npm install bcryptjs
npm install jsonwebtoken

Step 4: Start the Server

Run:

node server.js

The server will start at:

http://localhost:3000

Step 5: Open the Application

Open a browser and enter:

http://localhost:3000

---

11. Default Login

Admin

Email: admin@gmail.com
Password: admin123

Teacher

Email: teacher@gmail.com
Password: teacher123

---

12. How to Test the Project

1. Login to the application.
2. Add a class.
3. Add a subject.
4. Add students.
5. Select a student and subject.
6. Mark attendance as Present or Absent.
7. Mark attendance for different dates.
8. Open the Attendance Report.
9. Check total attendance.
10. Check present and absent count.
11. Check the calculated attendance percentage.

---

13. Attendance Percentage Formula

The attendance percentage is calculated using:

Attendance Percentage =
(Present Classes / Total Classes) × 100

Example

If a student is present for 8 classes out of 10:

(8 / 10) × 100 = 80%

Therefore, the attendance percentage is 80%.

---

14. Screenshots

Login Page

"Login Page" (screenshots/login.png)

Dashboard

"Dashboard" (screenshots/dashboard.png)

Class Management

"Class Management" (screenshots/class-management.png)

Subject Management

"Subject Management" (screenshots/subject-management.png)

Student Management

"Student Management" (screenshots/student-management.png)

Mark Attendance

"Mark Attendance" (screenshots/mark-attendance.png)

Attendance Report

"Attendance Report" (screenshots/attendance-report.png)

---

15. Conclusion

The Smart Attendance System provides a simple digital solution for managing student attendance.

The project implements login and role management, class and subject management, student management, attendance marking, attendance percentage calculation, and attendance reporting.

The system demonstrates the use of frontend technologies, Node.js, Express.js, SQLite, and authentication in a web application.

---

16. Academic Integrity

This project was developed as an individual academic assignment. AI tools were used for understanding, planning, coding assistance, debugging, testing, and documentation. The project was reviewed and tested during development.
