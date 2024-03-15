require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use('/public', express.static(`${process.cwd()}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//app.use(express.urlencoded({extended:true}))

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

function isValidURL(url) {
  // Regular expression to match URL format
  var urlPattern = new RegExp(
      '^(https?:\\/\\/)' +           // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +  // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +  // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' +  // query string
      '(\\#[-a-z\\d_]*)?$', 'i');  // fragment locator
  return urlPattern.test(url);
}

let counter = 1;
const urlDatabase = {};

// POST request handler
app.post('/api/shorturl', (req, res) => {
  const url = req.body.url;
  
  if (isValidURL(url)) {
    const shortUrl = counter;
    urlDatabase[shortUrl] = url;
    counter++;
    res.json({
      original_url: url,
      short_url: shortUrl
    });
  } else {
    res.json({ error: 'invalid url' });
  }
});

app.get('/api/shorturl/:short_url', function(req, res) {
  const shortUrlParam = req.params.short_url;
  const url = urlDatabase[shortUrlParam];
  res.redirect(url);
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
