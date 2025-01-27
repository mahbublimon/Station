const express = require('express');
const path = require('path');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const bodyParser = require('body-parser');
const connectDB = require('./db');
const User = require('./models/User');

const app = express();
connectDB();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));
app.use(
  session({
    secret: 'station-secret-key',
    resave: false,
    saveUninitialized: true,
  })
);

// Routes for pages
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'login.html')));
app.get('/signup', (req, res) => res.sendFile(path.join(__dirname, 'signup.html')));
app.get('/teacher', (req, res) => {
  if (req.session.user && req.session.user.role === 'teacher') {
    res.sendFile(path.join(__dirname, 'teacher.html'));
  } else {
    res.redirect('/login');
  }
});
app.get('/classroom', (req, res) => {
  if (req.session.user) {
    res.sendFile(path.join(__dirname, 'classroom.html'));
  } else {
    res.redirect('/login');
  }
});

// Signup route
app.post('/signup', async (req, res) => {
  const { fullName, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).send('Email already in use');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ fullName, email, password: hashedPassword, role });
    await user.save();

    res.redirect('/login');
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).send('Error creating account');
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid password');

    req.session.user = { id: user._id, role: user.role };
    res.redirect(user.role === 'teacher' ? '/teacher' : '/classroom');
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send('Error logging in');
  }
});

// Logout route
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).send('Error logging out');
    res.redirect('/');
  });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));