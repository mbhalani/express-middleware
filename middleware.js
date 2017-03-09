// express server
const express = require('express');
const port = process.env.PORT || 4008;
const ip = process.env.IP || '127.0.0.1';
const jwt = require('jwt-simple');
const app = express();

// ========== Middleware ========== //
// The idea behind middleware is that every request that comes to a
// server gets passed through each middleware function in order.
// These functions might check for authentication, format the
// response to the client, or log information about the request.

// Access middleware through app.use. It takes a callback  function,
// which takes the client’s request object, the server’s response
// object, and another callback function as arguments.
app.use( (request, response, callback) => {
  console.log('request.method: ', request.method, ' request.url: ', request.url);
    callback();
});

// ========== END Middleware ========== //

// unauthenticated route
app.get('/', (request, response) => {
  response.send('Hello world!');
});

// Applying middleware to a particular route
// authenticated route
app.get('/secret', [middlewareAuthenticator], (request, response) => {
  response.status(200).send('The secret is 42');
});

app.listen(port, ip, () => {
  console.log('Server listening on ip:port - ' + ip + ':' + port);
});


// Here we have a function, middlewareAuthenticator which will check
// any requests to the /secret route, and make sure that they have a
// valid authentication token. You can pass as many callback
// functions as you need in an array as the second argument to an
// app.get, app.post, etc., and each piece of middleware will run on
// the request.
function middlewareAuthenticator(request, response, callback) {
  var token = request.header.authorization;

  if (!token) {
    callback(new Error('No Authentication Token'));
  } else {
    var user = jwt.decode(token, 'secret phrase');

    if (user) {
      callback();
    } else {
      response.status(401).send('Authentication failed');
    }
  }
}
