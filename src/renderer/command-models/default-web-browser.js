import { openExternal } from 'shell'
import domainEventPublisher from '../singletons/domain-event-publisher'

export default class DefaultWebBrowser {
  openUrl(url) {
    openExternal(url);
    domainEventPublisher.publish({
      type: 'URL_OPENED',
      url
    });
  }
}
