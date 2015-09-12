import { EventEmitter } from 'events'
import BrowserWindow from 'browser-window'
import Twitter from 'node-twitter-api'

export default class AuthenticationWindow extends EventEmitter {
  /**
   * @param {Function} callback
   */
  constructor(callback) {
    super();
    const twitter = new Twitter({
      callback: 'http://example.com',
      consumerKey: 'KAR2eM09o2GCddFfHUXz7vFKV',
      consumerSecret: '8MoozYzEzkstemW4fagnm5qlGMVELIxuWBTcBOz0BpUDIpDWqY'
    });

    twitter.getRequestToken((error, requestToken, requestTokenSecret) => {
      const url = twitter.getAuthUrl(requestToken);
      this.window = new BrowserWindow({ width: 800, height: 600, 'node-integration': false});
      this.getAccessToken(twitter, requestToken, requestTokenSecret, url);
    });
  }

  getAccessToken(twitter, requestToken, requestTokenSecret, url) {
    this.window.webContents.on('will-navigate', (event, url) => {
      let matched;
      if (matched = url.match(/\?oauth_token=([^&]*)&oauth_verifier=([^&]*)/)) {
        twitter.getAccessToken(requestToken, requestTokenSecret, matched[2], (error, accessToken, accessTokenSecret) => {
          this.emit(
            'authentication-succeeded',
            {
              accessToken: accessToken,
              accessTokenSecret: accessTokenSecret
            }
          );
        });
        event.preventDefault();
        setImmediate(() => {
          this.window.close();
        });
      } else if (matched = url.match(/&redirect_after_login_verification=([^&]*)/)) {
        this.window.webContents.on('did-get-redirect-request', (event, oldUrl, newUrl, isMainFrame) => {
          this.getAccessToken(twitter, requestToken, requestTokenSecret, newUrl);
        });
      };
    });
    this.window.loadUrl(url);
  }
}
