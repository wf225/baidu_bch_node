const express = require('express')
const bodyParser = require('body-parser')
// const cors = require('cors')
const compression = require('compression')
const http = require('http');
const path = require('path');

const app = express();
app.use(compression())
// app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const hostname = '127.0.0.1';
const port = 8081;

app.set('port', port);
// set the static files location ./public/index.html
console.log(path.join(__dirname, '../public'));
app.use(express.static(path.join(__dirname, '../public')));

// routes =====================================================================
require('./routes.js')(app);

// listen (start app with 'node server.js') ===================================
app.listen(port, () => {
  console.log("Server listening on port %s", port);
});
