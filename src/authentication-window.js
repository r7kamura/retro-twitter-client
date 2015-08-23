import BrowserWindow from 'browser-window'
import Twitter from 'node-twitter-api'

export default class AuthenticationWindow {
  /**
   * @param {Object} twitter
   * @param {String} url
   */
  constructor(callback) {
    const twitter = new Twitter({
      callback: 'http://example.com',
      consumerKey: 'KAR2eM09o2GCddFfHUXz7vFKV',
      consumerSecret: '8MoozYzEzkstemW4fagnm5qlGMVELIxuWBTcBOz0BpUDIpDWqY'
    });

    twitter.getRequestToken((error, requestToken, requestTokenSecret) => {
      const url = twitter.getAuthUrl(requestToken);
      this.window = new BrowserWindow({ width: 800, height: 600 });
      this.window.webContents.on('will-navigate', (event, url) => {
        let matched;
        if (matched = url.match(/\?oauth_token=([^&]*)&oauth_verifier=([^&]*)/)) {
          twitter.getAccessToken(requestToken, requestTokenSecret, matched[2], (error, accessToken, accessTokenSecret) => {
            callback({
              accessToken: accessToken,
              accessTokenSecret: accessTokenSecret
            });
          });
        }
        event.preventDefault();
        setTimeout(() => {
          this.window.close();
        }, 0);
      });
      this.window.loadUrl(url);
    });
  }
}
