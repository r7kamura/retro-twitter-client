import { openExternal } from 'shell'
import React from 'react'
import Time from './time'
import twitterText from 'twitter-text'

class Anchor extends React.Component {
  onClicked(event) {
    event.preventDefault();
    openExternal(this.props.url);
  }

  render() {
    return <a href={this.props.url} title={this.props.title} onClick={this.onClicked.bind(this)} dangerouslySetInnerHTML={{__html: this.props.text}} />;
  }
}

class AnchorToCashtag extends React.Component {
  getText() {
    return '$' + twitterText.htmlEscape(this.props.entity.cashtag);
  }

  getTitle() {
    return '$' + this.props.entity.cashtag;
  }

  getUrl() {
    return `https://twitter.com/#!/search?q=%24${this.props.entity.cashtag}`;
  }

  render() {
    return <Anchor text={this.getText()} title={this.getTitle()} url={this.getUrl()} />
  }
}

class AnchorToHashtag extends React.Component {
  getText() {
    return '#' + twitterText.htmlEscape(this.props.entity.hashtag);
  }

  getTitle() {
    return '#' + this.props.entity.hashtag;
  }

  getUrl() {
    return `https://twitter.com/#!/search?q=%23${this.props.entity.hashtag}`;
  }

  render() {
    return <Anchor text={this.getText()} title={this.getTitle()} url={this.getUrl()} />
  }
}

class AnchorToList extends React.Component {
  getIdentifier() {
    return this.props.entity.screenName + this.props.entity.listSlug;
  }

  getText() {
    return '@' + twitterText.htmlEscape(this.getIdentifier());
  }

  getTitle() {
    return '@' + this.getIdentifier();
  }

  getUrl() {
    return `https://twitter.com/${this.getIdentifier()}`;
  }

  render() {
    return <Anchor text={this.getText()} title={this.getTitle()} url={this.getUrl()} />
  }
}

class AnchorToMention extends React.Component {
  getIdentifier() {
    return this.props.entity.screenName;
  }

  getText() {
    return '@' + twitterText.htmlEscape(this.getIdentifier());
  }

  getTitle() {
    return '@' + this.getIdentifier();
  }

  getUrl() {
    return `https://twitter.com/${this.getIdentifier()}`;
  }

  render() {
    return <Anchor text={this.getText()} title={this.getTitle()} url={this.getUrl()} />
  }
}

class AnchorToUrl extends React.Component {
  getText() {
    if (this.props.urlEntity && this.props.urlEntity.display_url) {
      return twitterText.linkTextWithEntity(this.props.urlEntity, { invisibleTagAttrs: "style='position:absolute;left:-9999px;'" });
    } else {
      return twitterText.htmlEscape(this.props.displayUrl);
    }
  }

  render() {
    return <Anchor text={this.getText()} url={this.props.url} />
  }
}

class Text extends React.Component {
  getText() {
    return twitterText.htmlEscape(this.props.text);
  }

  render() {
    return <span dangerouslySetInnerHTML={{__html: this.getText()}} />;
  }
}

export default class Tweet extends React.Component {
  getComponents() {
    const components = [];
    const text = this.props.tweet.text;
    let index = 0;
    this.getEntities().forEach((entity) => {
      components.push(<Text text={text.substring(index, entity.indices[0])} />);
      if (entity.url) {
        components.push(<AnchorToUrl displayUrl={entity.url} url={entity.url} urlEntity={this.getUrlEntityFromUrl(entity.url)} />);
      } else if (entity.hashtag) {
        components.push(<AnchorToHashtag entireText={text} entity={entity} />);
      } else if (entity.listSlug) {
        components.push(<AnchorToList entireText={text} entity={entity} />);
      } else if (entity.screenName) {
        components.push(<AnchorToMention entireText={text} entity={entity} />);
      } else if (entity.cashtag) {
        components.push(<AnchorToCashtag entireText={text} entity={entity} />);
      }
      index = entity.indices[1];
    });
    components.push(<Text text={text.substring(index, text.length)} />);
    return components;
  }

  getEntities() {
    return twitterText.extractEntitiesWithIndices(
      this.props.tweet.text,
      { extractUrlsWithoutProtocol: false }
    );
  }

  getUrlEntities() {
    return this.props.tweet.entities.urls;
  }

  getUrlEntityFromUrl(url) {
    return this.getUrlEntities().filter((urlEntity) => {
      return urlEntity.url === url;
    })[0];
  }

  render() {
    return(
      <div className="tweet-body">
        {this.getComponents()}
      </div>
    );
  }
}
