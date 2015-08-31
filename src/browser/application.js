import app from 'app'
import AuthenticationWindow from './authentication-window'
import crashReporter from 'crash-reporter'
import globalShortcut from 'global-shortcut'
import MainWindow from './main-window'

export default class Application {
  constructor() {
    this.accessToken = null;
    this.accessTokenSecret = null;
    this.consumerKey = 'KAR2eM09o2GCddFfHUXz7vFKV';
    this.consumerSecret = '8MoozYzEzkstemW4fagnm5qlGMVELIxuWBTcBOz0BpUDIpDWqY';
    this.mainWindow = null;
  }

  onAuthenticationSucceeded({ accessToken, accessTokenSecret }) {
    this.accessToken = accessToken;
    this.accessTokenSecret = accessTokenSecret;
    this.openMainWindow();
  }

  onReady() {
    this.openAuthenicationWindow();
    this.registerGlobalShortcuts();
  }

  openAuthenicationWindow() {
    new AuthenticationWindow({
      consumerKey: this.consumerKey,
      consumerSecret: this.consumerSecret,
    }).on(
      'authentication-succeeded',
      this.onAuthenticationSucceeded.bind(this)
    );
  }

  openMainWindow() {
    this.mainWindow = new MainWindow();
  }

  registerApplicationCallbacks() {
    app.on('window-all-closed', () => {});
    app.on('ready', this.onReady.bind(this));
  }

  registerGlobalShortcuts() {
    globalShortcut.register('Alt+Down', this.selectNextChannel.bind(this));
    globalShortcut.register('Alt+Up', this.selectPreviousChannel.bind(this));
  }

  run() {
    this.startCrashReporter();
    this.registerApplicationCallbacks();
  }

  selectNextChannel() {
    this.mainWindow.send('select-next-channel-requested');
  }

  selectPreviousChannel() {
    this.mainWindow.send('select-previous-channel-requested');
  }

  startCrashReporter() {
    crashReporter.start();
  }
}
