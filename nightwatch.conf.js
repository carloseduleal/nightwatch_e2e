const faker = require('faker')

module.exports = (function(settings) {
  process.env.USERNAME = 64429;
  process.env.PASSWORD = 'VIVIAN1';

  settings.test_workers = false;
  return settings;
})(require('./nightwatch.json'));
