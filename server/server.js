const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// PostgreSQL connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'test',
  password: '1234',
  port: 5432,
});

// Login Route
app.post('/api/owner-login', async (req, res) => {
  const { contact, name } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM owner WHERE contact = $1 AND name = $2',
      [contact, name]
    );

    if (result.rows.length > 0) {
      res.status(200).json({ success: true, message: 'Login successful', user: result.rows[0] });
    } else {
      res.status(401).json({ success: false, message: 'User not found. Please register.' });
    }
  } catch (error) {
    console.error('Error checking owner login:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.post('/api/tenant-login', async (req, res) => {
  const { contact, name } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM tenant WHERE contact = $1 AND name = $2',
      [contact, name]
    );

    if (result.rows.length > 0) {
      res.status(200).json({ success: true, message: 'Login successful', user: result.rows[0] });
    } else {
      res.status(401).json({ success: false, message: 'User not found. Please register.' });
    }
  } catch (error) {
    console.error('Error checking owner login:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
