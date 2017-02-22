onload = () => {
  var fs = require('fs');
  var config = require('./res/js/config');

  const zephyrBaseUrl = config.zephyrServerBase;
  const zephyrAuthHeader = 'Authorization:' + config.zephyrApiKey;
  const webview = document.getElementById('login-webview');

  var loaded = false;

  const startLoad = () => {
    if (!loaded) {
      webview.loadURL(zephyrBaseUrl + '/api/v2/' + config.zephyrAppId, {
        extraHeaders: zephyrAuthHeader
      });
    }
  };

  const stopLoad = () => {
    if (webview.getURL() == zephyrBaseUrl + '/api/v2/' + config.zephyrAppId) {
      $("#reset-btn").show();
      loaded = true;
    }
  };

  const willNavigate = (e) => {
    if (e.url.includes(zephyrBaseUrl)) {
      webview.loadURL(e.url, {
        extraHeaders: zephyrAuthHeader
      });
    }
  };

  const didNavigate = (e) => {
    if (e.url.includes('/api/v2/' + config.zephyrAppId + '/result')) {
      webview.getWebContents().savePage('token.json', 'HTMLOnly', (error) => {
        if (!error) {
          console.log('Auth token saved successfully!');

          var token = JSON.parse(fs.readFileSync('token.json', 'utf8'));

          $("#hello-subtitle").text('Hello, ' + token.name + '!');

          $(".login-stage").hide();
          $(".logged-in-stage").show();
        }
      });
    }
  };

  webview.addEventListener('did-start-loading', startLoad);
  webview.addEventListener('did-stop-loading', stopLoad);
  webview.addEventListener('will-navigate', willNavigate);
  webview.addEventListener('did-navigate', didNavigate);

  $('#reset-btn').click(function() {
    webview.loadURL(zephyrBaseUrl + '/api/v2/' + config.zephyrAppId, {
        extraHeaders: zephyrAuthHeader
    });
  });
}