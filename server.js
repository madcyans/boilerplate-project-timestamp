const express = require('express');
const app = express();

app.get('/api/timestamp/:date?', (req, res) => {
  // Retrieve the parameter. It might be a date string or a Unix timestamp.
  let { date } = req.params;
  let dateObj;

  // If no date parameter is provided, use the current date/time.
  if (!date) {
    dateObj = new Date();
  } else {
    // If the date string consists only of digits, treat it as a Unix timestamp in milliseconds.
    if (/^\d+$/.test(date)) {
      dateObj = new Date(parseInt(date));
    } else {
      // Otherwise, let new Date() try to parse the string.
      dateObj = new Date(date);
    }
  }

  // If the date is invalid, return the error JSON.
  if (dateObj.toString() === 'Invalid Date') {
    return res.json({ error: "Invalid Date" });
  }

  // Build the response JSON with the Unix timestamp (in milliseconds) and the formatted UTC string.
  return res.json({
    unix: dateObj.getTime(),
    utc: dateObj.toUTCString()
  });
});

// Optional: A simple root route so testing "/" doesn't give an error.
app.get('/', (req, res) => {
  res.send("Welcome to the Timestamp API! Use /api/:date? to get timestamp data.");
});

// Set the port (defaulting to 3000) and start the server.
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Timestamp API is running on port ${PORT}`);
});