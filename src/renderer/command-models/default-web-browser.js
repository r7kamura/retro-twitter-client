import { openExternal } from 'shell'
import store from '../singletons/store'

export default class DefaultWebBrowser {
  openUrl(url) {
    openExternal(url);
    store.dispatch({
      type: 'URL_OPENED',
      url
    });
  }
}
