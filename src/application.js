import app from 'app'
import BrowserWindow from 'browser-window'
import crashReporter from 'crash-reporter'
import MainWindow from './main-window'
import Twitter from 'node-twitter-api'

export default class Application {
  constructor() {
    this.accessToken = null;
    this.accessTokenSecret = null;
    this.mainWindow = null;
    this.windows = [];
    this.startCrashReporter();
    this.registerApplicationCallbacks();
  }

  registerApplicationCallbacks() {
    app.on('window-all-closed', () => {
      if (process.platform != 'darwin') {
        app.quit();
      }
    });

    app.on('ready', () => {
      const twitter = new Twitter({
        callback: 'http://example.com',
        consumerKey: 'KAR2eM09o2GCddFfHUXz7vFKV',
        consumerSecret: '8MoozYzEzkstemW4fagnm5qlGMVELIxuWBTcBOz0BpUDIpDWqY'
      });

      twitter.getRequestToken((error, requestToken, requestTokenSecret) => {
        const url = twitter.getAuthUrl(requestToken);
        const authenticationWindow = new BrowserWindow({ width: 800, height: 600 });
        authenticationWindow.webContents.on('will-navigate', (event, url) => {
          let matched;
          if (matched = url.match(/\?oauth_token=([^&]*)&oauth_verifier=([^&]*)/)) {
            twitter.getAccessToken(requestToken, requestTokenSecret, matched[2], (error, accessToken, accessTokenSecret) => {
              this.accessToken = accessToken;
              this.accessTokenSecret = accessTokenSecret;
            });
          }
          event.preventDefault();
          this.openMainWindow();
          setTimeout(() => {
            authenticationWindow.close();
          }, 0);
        });
        authenticationWindow.loadUrl(url);
      });
    });
  }

  openMainWindow() {
    this.windows.push(new MainWindow());
  }

  startCrashReporter() {
    crashReporter.start();
  }
}
