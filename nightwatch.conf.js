const faker = require('faker')

module.exports = (function(settings) {
  process.env.USERNAME = 63830;
  process.env.PASSWORD = 'teste';

  settings.test_workers = false;
  return settings;
})(require('./nightwatch.json'));
