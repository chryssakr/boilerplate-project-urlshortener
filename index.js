require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use('/public', express.static(`${process.cwd()}/public`));
app.use(express.json());

app.use(express.urlencoded({extended:true}))

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}
let counter = 1;
const urlDatabase = {};

// POST request handler
app.post('/api/shorturl', (req, res) => {
  const url = req.body.url;
  console.log('Received URL:', url);
  
  if (isValidURL(url)) {
    const shortUrl = counter;
    counter++;
    res.json({
      original_url: url,
      short_url: shortUrl
    });
  } else {
    console.log('Invalid URL:', url);
    res.status(400).json({ error: 'Invalid URL' });
  }
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
