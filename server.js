const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');

// Create Express app
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));
app.use(
  session({
    secret: 'station-secret-key',
    resave: false,
    saveUninitialized: true,
  })
);

// Mock Database
let users = []; // Store users temporarily in-memory
let classrooms = []; // Store classrooms temporarily in-memory

// Serve HTML pages
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'home.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'login.html')));
app.get('/signup', (req, res) => res.sendFile(path.join(__dirname, 'signup.html')));
app.get('/classroom', (req, res) => res.sendFile(path.join(__dirname, 'classroom.html')));
app.get('/teacher', (req, res) => {
  if (req.session.user && req.session.user.role === 'teacher') {
    res.sendFile(path.join(__dirname, 'teacher.html'));
  } else {
    res.redirect('/login');
  }
});

// User Signup
app.post('/signup', (req, res) => {
  const { name, email, password, role } = req.body;

  // Validate role
  if (role !== 'student' && role !== 'teacher') {
    return res.status(400).send('Invalid role selected.');
  }

  // Check if email is already registered
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).send('Email already registered.');
  }

  // Add user to mock database
  const newUser = { id: Date.now(), name, email, password, role };
  users.push(newUser);

  res.redirect('/login');
});

// User Login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Find user
  const user = users.find((user) => user.email === email && user.password === password);

  if (!user) {
    return res.status(400).send('Invalid email or password.');
  }

  // Save user session
  req.session.user = { id: user.id, name: user.name, role: user.role };
  if (user.role === 'teacher') {
    res.redirect('/teacher');
  } else {
    res.redirect('/classroom');
  }
});

// Logout
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Error logging out.');
    }
    res.redirect('/');
  });
});

// Create Classroom (Teacher Only)
app.post('/create-classroom', (req, res) => {
  const { classroomName, studentLimit } = req.body;

  if (req.session.user && req.session.user.role === 'teacher') {
    // Create new classroom
    const newClassroom = {
      id: Date.now(),
      name: classroomName,
      limit: parseInt(studentLimit, 10),
      teacher: req.session.user.name,
      students: [],
    };

    classrooms.push(newClassroom);
    res.redirect('/teacher');
  } else {
    res.status(403).send('Unauthorized');
  }
});

// Join Classroom (Student Only)
app.post('/join-classroom', (req, res) => {
  const { classroomId } = req.body;

  if (req.session.user && req.session.user.role === 'student') {
    const classroom = classrooms.find((c) => c.id === parseInt(classroomId, 10));

    if (!classroom) {
      return res.status(404).send('Classroom not found.');
    }

    if (classroom.limit <= classroom.students.length) {
      return res.status(400).send('Classroom is full.');
    }

    // Add student to classroom
    classroom.students.push(req.session.user.name);
    res.redirect('/classroom');
  } else {
    res.status(403).send('Unauthorized');
  }
});

// Fetch Classrooms for Display
app.get('/classrooms', (req, res) => {
  res.json(classrooms);
});

// Fetch Current User Info
app.get('/user', (req, res) => {
  if (req.session.user) {
    res.json(req.session.user);
  } else {
    res.status(401).send('Not logged in.');
  }
});

// Server Start
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});