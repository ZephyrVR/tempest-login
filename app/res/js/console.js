function setup () {
  var log = require('electron-log');
  log.appName = 'zephyr-login';

  return log;
}


module.exports = {
  setup: setup
}