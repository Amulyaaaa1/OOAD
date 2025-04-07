const express = require('express');
const cors = require('cors');
const pool = require('./db'); // Make sure this exports a configured pg Pool

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ✅ ROOT TEST ROUTE
app.get('/', (req, res) => {
  res.send('✅ Backend is running!');
});

// ✅ FETCH ALL RENT ITEMS
app.get('/api/items', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM rent_items ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error('❌ Error fetching items:', err.message);
    res.status(500).send('Server error');
  }
});

// ✅ ADD NEW RENT ITEM
app.post('/api/items', async (req, res) => {
  const { name, price, available } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO rent_items (name, price, available) VALUES ($1, $2, $3) RETURNING *',
      [name, price, available]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('❌ Error inserting item:', err.message);
    res.status(500).send('Server error');
  }
});

// ✅ OWNER LOGIN ROUTE
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
  } catch (err) {
    console.error('❌ Error during owner login:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ✅ TENANT LOGIN ROUTE
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
  } catch (err) {
    console.error('❌ Error during tenant login:', err.message); // Fixed this message
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ✅ START SERVER
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}/`);
});
