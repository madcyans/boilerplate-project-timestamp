// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get('/api/:date?', (req, res) => {
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

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
