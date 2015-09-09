import { openExternal } from 'shell'
import app from 'app'
import ApplicationMenu from './application-menu'
import AuthenticationWindow from './authentication-window'
import BrowserWindow from 'browser-window'
import crashReporter from 'crash-reporter'
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
    this.setApplicationMenu();
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

  run() {
    this.startCrashReporter();
    this.registerApplicationCallbacks();
  }

  setApplicationMenu() {
    new ApplicationMenu().on('open-dev-tools', () => {
      this.mainWindow.window.toggleDevTools();
    }).on('quit', () => {
      app.quit();
    }).on('reload', () => {
      this.mainWindow.window.reloadIgnoringCache();
    }).on('search', () => {
      this.mainWindow.send('focus-search-box');
    }).on('select-next-channel', () => {
      this.mainWindow.send('select-next-channel');
    }).on('select-previous-channel', () => {
      this.mainWindow.send('select-previous-channel');
    });
  }

  startCrashReporter() {
    crashReporter.start();
  }
}
