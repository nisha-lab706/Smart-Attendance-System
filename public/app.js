let token = "";

let classes = [];
let subjects = [];
let students = [];


// ================= LOGIN =================

async function login() {

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    const response = await fetch("/api/login", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            email,
            password
        })

    });

    const data = await response.json();

    if (!response.ok) {

        document.getElementById("loginMessage")
            .textContent = data.error;

        return;
    }

    token = data.token;

    document.getElementById("loginPage")
        .style.display = "none";

    document.getElementById("dashboard")
        .style.display = "block";

    document.getElementById("welcome")
        .textContent = "Welcome " + data.user.name;

    document.getElementById("role")
        .textContent = "Role: " + data.user.role;

    loadAll();

}


// ================= LOGOUT =================

function logout() {

    token = "";

    document.getElementById("dashboard")
        .style.display = "none";

    document.getElementById("loginPage")
        .style.display = "block";

}


// ================= LOAD ALL =================

async function loadAll() {

    await loadClasses();

    await loadSubjects();

    await loadStudents();

    loadReport();

}


// ================= CLASSES =================

async function addClass() {

    const name =
        document.getElementById("className").value;

    if (!name) {
        alert("Enter class name");
        return;
    }

    await fetch("/api/classes", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({ name })

    });

    document.getElementById("className").value = "";

    loadClasses();
}


async function loadClasses() {

    const response =
        await fetch("/api/classes");

    classes = await response.json();

    let html = "";

    classes.forEach(c => {

        html += `
            <div class="item">
                ${c.id} - ${c.name}

                <button
                    onclick="deleteClass(${c.id})">
                    Delete
                </button>
            </div>
        `;

    });

    document.getElementById("classes")
        .innerHTML = html;


    const select =
        document.getElementById("subjectClass");

    const studentSelect =
        document.getElementById("studentClass");

    select.innerHTML =
        `<option value="">Select Class</option>`;

    studentSelect.innerHTML =
        `<option value="">Select Class</option>`;

    classes.forEach(c => {

        select.innerHTML += `
            <option value="${c.id}">
                ${c.name}
            </option>
        `;

        studentSelect.innerHTML += `
            <option value="${c.id}">
                ${c.name}
            </option>
        `;

    });

}


async function deleteClass(id) {

    if (!confirm("Delete this class?"))
        return;

    await fetch(`/api/classes/${id}`, {
        method: "DELETE"
    });

    loadClasses();
}


// ================= SUBJECTS =================

async function addSubject() {

    const name =
        document.getElementById("subjectName").value;

    const class_id =
        document.getElementById("subjectClass").value;

    if (!name || !class_id) {

        alert("Enter subject and class");

        return;
    }

    await fetch("/api/subjects", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            name,
            class_id
        })

    });

    document.getElementById("subjectName")
        .value = "";

    loadSubjects();
}


async function loadSubjects() {

    const response =
        await fetch("/api/subjects");

    subjects = await response.json();

    let html = "";

    subjects.forEach(s => {

        html += `
            <div class="item">
                ${s.name}
                - ${s.class_name}
            </div>
        `;

    });

    document.getElementById("subjects")
        .innerHTML = html;


    const select =
        document.getElementById("attendanceSubject");

    select.innerHTML =
        `<option value="">Select Subject</option>`;

    subjects.forEach(s => {

        select.innerHTML += `
            <option value="${s.id}">
                ${s.name} - ${s.class_name}
            </option>
        `;

    });

}


// ================= STUDENTS =================

async function addStudent() {

    const name =
        document.getElementById("studentName").value;

    const register_no =
        document.getElementById("registerNo").value;

    const class_id =
        document.getElementById("studentClass").value;

    if (!name || !register_no || !class_id) {

        alert("Fill all student details");

        return;
    }

    const response =
        await fetch("/api/students", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name,
                register_no,
                class_id
            })

        });

    const data = await response.json();

    if (!response.ok) {

        alert(data.error);

        return;
    }

    document.getElementById("studentName")
        .value = "";

    document.getElementById("registerNo")
        .value = "";

    loadStudents();
}


async function loadStudents() {

    const response =
        await fetch("/api/students");

    students = await response.json();

    let html = "";

    students.forEach(s => {

        html += `
            <div class="item">
                ${s.register_no}
                -
                ${s.name}
                -
                ${s.class_name}
            </div>
        `;

    });

    document.getElementById("students")
        .innerHTML = html;


    const select =
        document.getElementById("attendanceStudent");

    select.innerHTML =
        `<option value="">Select Student</option>`;

    students.forEach(s => {

        select.innerHTML += `
            <option value="${s.id}">
                ${s.register_no} - ${s.name}
            </option>
        `;

    });

}


// ================= ATTENDANCE =================

async function markAttendance() {

    const student_id =
        document.getElementById(
            "attendanceStudent"
        ).value;

    const subject_id =
        document.getElementById(
            "attendanceSubject"
        ).value;

    const date =
        document.getElementById(
            "attendanceDate"
        ).value;

    const status =
        document.getElementById(
            "attendanceStatus"
        ).value;


    if (
        !student_id ||
        !subject_id ||
        !date
    ) {

        alert("Select all attendance details");

        return;
    }


    const response =
        await fetch("/api/attendance", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                student_id,
                subject_id,
                date,
                status
            })

        });


    const data =
        await response.json();

    alert(data.message);

    loadReport();
}


// ================= REPORT =================

async function loadReport() {

    const response =
        await fetch("/api/report");

    const data =
        await response.json();

    let html = `
        <div class="report">

        <table>

        <tr>
            <th>Student</th>
            <th>Register No</th>
            <th>Subject</th>
            <th>Total</th>
            <th>Present</th>
            <th>Absent</th>
            <th>Percentage</th>
        </tr>
    `;


    data.forEach(row => {

        html += `

        <tr>

            <td>${row.student}</td>

            <td>${row.register_no}</td>

            <td>${row.subject}</td>

            <td>${row.total}</td>

            <td>${row.present}</td>

            <td>${row.absent}</td>

            <td>
                <strong>
                    ${row.percentage}%
                </strong>
            </td>

        </tr>

        `;

    });


    html += `
        </table>
        </div>
    `;

    document.getElementById("report")
        .innerHTML = html;
}