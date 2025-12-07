import express from 'express';
import bodyParser from 'body-parser';
import { db } from './db.js';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Serve HTML pages
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'register.html')));
app.get('/signin', (req, res) => res.sendFile(path.join(__dirname, 'public', 'signin.html')));

// Register user
app.post('/register', (req, res) => {
  const { username, password, birthdate } = req.body;
  if (!username || !password || !birthdate) return res.send('All fields are required.');

  const sql = 'INSERT INTO users (username, password, birthdate) VALUES (?, ?, ?)';
  db.query(sql, [username, password, birthdate], (err) => {
    if (err) {
      if(err.code === 'ER_DUP_ENTRY') return res.send('Username already exists.');
      return res.send('Error registering user.');
    }
    res.send('Registration successful! <a href="/signin">Sign in here</a>');
  });
});

// Sign in user
app.post('/signin', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.send('All fields are required.');

  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, results) => {
    if (err) return res.send('Error signing in.');
    if (results.length > 0) {
      res.send(`Welcome, ${username}!`);
    } else {
      res.send('Invalid username or password.');
    }
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));