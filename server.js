const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");

const app = express();
const PORT = 3000;
const SECRET = "smart_attendance_secret";

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const db = new sqlite3.Database("./attendance.db");

// ================= DATABASE =================

db.serialize(() => {

    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role TEXT NOT NULL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS classes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS subjects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            class_id INTEGER NOT NULL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            register_no TEXT UNIQUE NOT NULL,
            class_id INTEGER NOT NULL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS attendance (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_id INTEGER NOT NULL,
            subject_id INTEGER NOT NULL,
            date TEXT NOT NULL,
            status TEXT NOT NULL
        )
    `);

    // Create default admin
    const password = bcrypt.hashSync("admin123", 10);

    db.run(
        `INSERT OR IGNORE INTO users
        (name,email,password,role)
        VALUES (?,?,?,?)`,
        ["Admin", "admin@gmail.com", password, "admin"]
    );
});


// ================= LOGIN =================

app.post("/api/login", (req, res) => {

    const { email, password } = req.body;

    db.get(
        "SELECT * FROM users WHERE email=?",
        [email],
        (err, user) => {

            if (err)
                return res.status(500).json({ error: err.message });

            if (!user)
                return res.status(401).json({
                    error: "Invalid email or password"
                });

            const valid = bcrypt.compareSync(
                password,
                user.password
            );

            if (!valid)
                return res.status(401).json({
                    error: "Invalid email or password"
                });

            const token = jwt.sign(
                {
                    id: user.id,
                    role: user.role
                },
                SECRET,
                { expiresIn: "2h" }
            );

            res.json({
                token,
                user: {
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });
        }
    );
});


// ================= CLASSES =================

// Add class
app.post("/api/classes", (req, res) => {

    const { name } = req.body;

    db.run(
        "INSERT INTO classes(name) VALUES(?)",
        [name],
        function (err) {

            if (err)
                return res.status(500).json({
                    error: err.message
                });

            res.json({
                message: "Class added",
                id: this.lastID
            });
        }
    );
});

// Get classes
app.get("/api/classes", (req, res) => {

    db.all(
        "SELECT * FROM classes",
        [],
        (err, rows) => {

            if (err)
                return res.status(500).json({
                    error: err.message
                });

            res.json(rows);
        }
    );
});

// Delete class
app.delete("/api/classes/:id", (req, res) => {

    db.run(
        "DELETE FROM classes WHERE id=?",
        [req.params.id],
        function (err) {

            if (err)
                return res.status(500).json({
                    error: err.message
                });

            res.json({
                message: "Class deleted"
            });
        }
    );
});


// ================= SUBJECTS =================

// Add subject
app.post("/api/subjects", (req, res) => {

    const { name, class_id } = req.body;

    db.run(
        "INSERT INTO subjects(name,class_id) VALUES(?,?)",
        [name, class_id],
        function (err) {

            if (err)
                return res.status(500).json({
                    error: err.message
                });

            res.json({
                message: "Subject added",
                id: this.lastID
            });
        }
    );
});

// Get subjects
app.get("/api/subjects", (req, res) => {

    const sql = `
        SELECT subjects.id,
               subjects.name,
               classes.name AS class_name
        FROM subjects
        JOIN classes
        ON subjects.class_id = classes.id
    `;

    db.all(sql, [], (err, rows) => {

        if (err)
            return res.status(500).json({
                error: err.message
            });

        res.json(rows);
    });
});


// ================= STUDENTS =================

// Add student
app.post("/api/students", (req, res) => {

    const {
        name,
        register_no,
        class_id
    } = req.body;

    db.run(
        `INSERT INTO students
        (name,register_no,class_id)
        VALUES(?,?,?)`,
        [name, register_no, class_id],
        function (err) {

            if (err)
                return res.status(500).json({
                    error: err.message
                });

            res.json({
                message: "Student added",
                id: this.lastID
            });
        }
    );
});

// Get students
app.get("/api/students", (req, res) => {

    const sql = `
        SELECT students.id,
               students.name,
               students.register_no,
               classes.name AS class_name
        FROM students
        JOIN classes
        ON students.class_id = classes.id
    `;

    db.all(sql, [], (err, rows) => {

        if (err)
            return res.status(500).json({
                error: err.message
            });

        res.json(rows);
    });
});


// ================= ATTENDANCE =================

// Mark attendance
app.post("/api/attendance", (req, res) => {

    const {
        student_id,
        subject_id,
        date,
        status
    } = req.body;

    db.run(
        `INSERT INTO attendance
        (student_id,subject_id,date,status)
        VALUES(?,?,?,?)`,
        [
            student_id,
            subject_id,
            date,
            status
        ],
        function (err) {

            if (err)
                return res.status(500).json({
                    error: err.message
                });

            res.json({
                message: "Attendance marked"
            });
        }
    );
});


// ================= REPORT =================

app.get("/api/report", (req, res) => {

    const sql = `
        SELECT
            students.name AS student,
            students.register_no,
            subjects.name AS subject,

            COUNT(attendance.id) AS total,

            SUM(
                CASE
                WHEN attendance.status='Present'
                THEN 1
                ELSE 0
                END
            ) AS present

        FROM attendance

        JOIN students
        ON attendance.student_id = students.id

        JOIN subjects
        ON attendance.subject_id = subjects.id

        GROUP BY students.id, subjects.id
    `;

    db.all(sql, [], (err, rows) => {

        if (err)
            return res.status(500).json({
                error: err.message
            });

        const result = rows.map(row => {

            const percentage =
                row.total > 0
                    ? ((row.present / row.total) * 100).toFixed(2)
                    : 0;

            return {
                ...row,
                absent: row.total - row.present,
                percentage
            };
        });

        res.json(result);
    });
});


// ================= SERVER =================

app.listen(PORT, () => {

    console.log(
        `Smart Attendance System running at http://localhost:${PORT}`
    );

});