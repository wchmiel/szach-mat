//------------------------------------------------------------
// All auth middlewares goes here
//------------------------------------------------------------

/*jshint esversion: 6 */

const expressJwt = require('express-jwt'),
      fs = require('fs');

const RSA_PUBLIC_KEY = fs.readFileSync('./constants/public-key/key.pem', 'utf8');

const middlewareObj = {
  // JWT validation middleware using express-jwt
  checkIfAuthenticated: expressJwt({
      secret: RSA_PUBLIC_KEY
  }),

  // JWT errors handling middleware
  handleTokenErrors: function(err, req, res, next) {
    err = (typeof err !== 'undefined') ? err : false;
    if (err && err.name === 'UnauthorizedError') {
      res.status(401).send(err);
    } else {
      // console.log('token ok from middleware');
      return next();
    }
  }
};

module.exports = middlewareObj;
