require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

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

app.use(bodyParser.json());

// POST request handler
app.post('/shorturl', (req, res) => {
  const url = req.body.url;

  app.get('/api/shorturl', function(req, res) {
  
    if (isValidURL(url)) {
      res.json({
        original_url: url,
        short_url: 1
      });
    } else {
      res.json({ error: 'invalid url' });
    }
  });

  app.get('/api/shorturl/<short_url>', function(req, res) {

  })

  // Send a response back to the client
  res.send('Data received successfully!');
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});



// id: url_input