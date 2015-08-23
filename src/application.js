import app from 'app'
import AuthenticationWindow from './authentication-window'
import crashReporter from 'crash-reporter'
import MainWindow from './main-window'

export default class Application {
  constructor() {
    this.credentials = null;
    this.mainWindow = null;
    this.windows = [];
    this.startCrashReporter();
    this.registerApplicationCallbacks();
  }

  onAuthenticationSucceeded(credentials) {
    this.credentials = credentials;
    this.openMainWindow();
  }

  onReady() {
    this.openAuthenicationWindow();
  }

  onWindowAllClosed() {
    if (process.platform != 'darwin') {
      app.quit();
    }
  }

  openAuthenicationWindow() {
    new AuthenticationWindow((credentials) => {
      this.onAuthenticationSucceeded(credentials);
    });
  }

  openMainWindow() {
    this.windows.push(new MainWindow());
  }

  registerApplicationCallbacks() {
    app.on('window-all-closed', () => {
      this.onWindowAllClosed();
    });
    app.on('ready', () => {
      this.onReady();
    });
  }

  startCrashReporter() {
    crashReporter.start();
  }
}
