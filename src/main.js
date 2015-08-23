import app from 'app'
import BrowserWindow from 'browser-window'
import Twitter from 'node-twitter-api'
import crashReporter from 'crash-reporter'

crashReporter.start()

let mainWindow = null;
let applicationAccessToken;
let applicationAccessTokenSecret;

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({ width: 1200, height: 800 });
  mainWindow.loadUrl(`file://${__dirname}/../public/index.html`);
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const twitter = new Twitter({
    callback: 'http://example.com',
    consumerKey: 'KAR2eM09o2GCddFfHUXz7vFKV',
    consumerSecret: '8MoozYzEzkstemW4fagnm5qlGMVELIxuWBTcBOz0BpUDIpDWqY'
  });

  twitter.getRequestToken((error, requestToken, requestTokenSecret) => {
    console.log(error);
    const url = twitter.getAuthUrl(requestToken);
    const authenticationWindow = new BrowserWindow({ width: 800, height: 600 });
    authenticationWindow.webContents.on('will-navigate', (event, url) => {
      let matched;
      if (matched = url.match(/\?oauth_token=([^&]*)&oauth_verifier=([^&]*)/)) {
        twitter.getAccessToken(requestToken, requestTokenSecret, matched[2], (error, accessToken, accessTokenSecret) => {
          applicationAccessToken = accessToken;
          applicationAccessTokenSecret = accessTokenSecret;
        });
      }
      event.preventDefault();
      setTimeout(() => {
        authenticationWindow.close();
      }, 0);
    });
    authenticationWindow.loadUrl(url);
  });
});
