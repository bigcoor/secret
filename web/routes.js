var index = require('./controllers/index');

module.exports = function(app) {
  app.get('/', index.index);
  app.post('/notified.json', index.notified);
};