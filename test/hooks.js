var Application = require('spectron').Application;
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var electron = require('electron');

global.before(function () {
  chai.should();
  chai.use(chaiAsPromised);
});

beforeEach(function () {
  this.timeout(10000);

  this.app = new Application({
    path: electron,
    args: ['app']
  });

  return this.app.start();
});

beforeEach(function () {
  chaiAsPromised.transferPromiseness = this.app.transferPromiseness;
});

afterEach(function () {
  if (this.app && this.app.isRunning()) {
    return this.app.stop();
  }
});