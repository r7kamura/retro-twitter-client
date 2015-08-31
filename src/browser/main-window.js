import BrowserWindow from 'browser-window'

export default class MainWindow {
  constructor() {
    this.window = new BrowserWindow({ width: 1200, height: 800 });
    this.window.loadUrl(`file://${__dirname}/../renderer/index.html`);
    this.window.on('closed', () => {
      this.window = null;
    });
  }

  /**
   * This is a public interface to connect to window.webContents.send.
   * The reason why this method exists is to hide the internal window property from others.
   */
  send(...args) {
    this.window.webContents.send(...args);
  }
}
