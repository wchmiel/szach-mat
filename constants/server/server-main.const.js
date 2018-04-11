/*jshint esversion: 6 */
// main setting for the server

const serverMainConst = {
  SERVER_PORT: process.env.PORT || 3000,
  JWT_EXPIRES_IN: 1440
};

module.exports = serverMainConst;
