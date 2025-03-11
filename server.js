

//  // echo \"Error: no test specified\" && exit 1
require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Endpoint לשלוף את השירותים ב-Render
app.get('/services', async (req, res) => {
  try {
    // קריאה ל-API של Render עם ה-API Key
    const response = await axios.get('https://api.render.com/v1/services?includePreviews=true&limit=20', {
      headers: {
        'Authorization': `Bearer ${process.env.RENDER_API_KEY}`,
        'Accept': 'application/json',
      },
    });

    // החזרת התשובה מה-API של Render
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch services from Render' });
  }
});

// התחלת השרת
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

