const Application = require('spectron').Application;
const path = require('path');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

// Setup Chai
chai.should();
chai.use(chaiAsPromised);

// Get path to Electron
var electronPath = path.join(__dirname, '..', 'node_modules', '.bin', 'electron');

if (process.platform === 'win32') {
  electronPath += '.cmd';
}

var app = new Application({
  path: electronPath,
  args: ['app']
});

describe('Application launch', function () {
  this.timeout(5000);

  beforeEach(function () {
    this.app = new Application({
      path: electronPath,
      args: ['app']
    });

    return this.app.start();
  })

  afterEach(function () {
      if (this.app && this.app.isRunning()) {
        return this.app.stop();
      }
  });

  it ('opens a window', function () {
    return this.app.client.waitUntilWindowLoaded()
      .getWindowCount().should.eventually.equal(2);
  });

  it ('has the correct title', function () {
    return this.app.client.waitUntilWindowLoaded()
      .getTitle().should.eventually.equal('Zephyr');
  });

  it ('isn\'t minimized', function () {
    return this.app.client.waitUntilWindowLoaded()
      .browserWindow.isMinimized().should.eventually.be.false;
  });

  it ('has dev tools closed', function () {
    return this.app.client.waitUntilWindowLoaded()
      .browserWindow.isDevToolsOpened().should.eventually.be.false;
  });

  it ('is visible', function () {
    return this.app.client.waitUntilWindowLoaded()
      .browserWindow.isVisible().should.eventually.be.true;
  });

  it ('is the correct size', function () {
    const bounds = this.app.client.waitUntilWindowLoaded().browserWindow.getBounds();
    return bounds.should.eventually.have.property('width').and.equal(800) &&
      bounds.should.eventually.have.property('height').and.equal(600);
  });
});