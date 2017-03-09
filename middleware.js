// express server
const express = require('express');
const port = process.env.PORT || 4008;
const ip = process.env.IP || '127.0.0.1';

const app = express();

// ========== Middleware ========== //


// ========== END Middleware ========== //

app.get('/', (request, response) => {
  response.send('Hello world!');
});

app.listen(port, ip, () => {
  console.log('Server listening on ip:port - ' + ip + ':' + port);
});