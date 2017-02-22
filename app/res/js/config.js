var fs = require('fs');
var config = {};

if (fs.existsSync(__dirname + '\\config-private.js')) {
  console.log('Using private configuration file...');
  config = require('./config-private');
} else {
  loadDefaults();
}

function loadDefaults() {
  // Zephyr server
  config.zephyrServerBase = process.env.ZEPHYR_SERVER_BASE || 'ZEPHYR_SERVER_BASE';
  config.zephyrApiKey = process.env.ZEPHYR_API_KEY || 'ZEPHYR_API_KEY';
  config.zephyrAppId = process.env.ZEPHYR_APP_ID || 0;
}

module.exports = config;