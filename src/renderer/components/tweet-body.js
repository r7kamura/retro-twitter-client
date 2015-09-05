import React from 'react'
import Time from './time'
import twitterText from 'twitter-text'

class Anchor extends React.Component {
  onClicked(event) {
    event.preventDefault();
    this.props.onAnchorClicked(this.props.url);
  }

  render() {
    return <a className="tweet-anchor" href={this.props.url} title={this.props.title} onClick={this.onClicked.bind(this)} dangerouslySetInnerHTML={{__html: this.props.text}} />;
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
    return <Anchor onAnchorClicked={this.props.onAnchorClicked} text={this.getText()} title={this.getTitle()} url={this.getUrl()} />
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
    return <Anchor onAnchorClicked={this.props.onAnchorClicked} text={this.getText()} title={this.getTitle()} url={this.getUrl()} />
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
    return <Anchor onAnchorClicked={this.props.onAnchorClicked} text={this.getText()} title={this.getTitle()} url={this.getUrl()} />
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
    return <Anchor onAnchorClicked={this.props.onAnchorClicked} text={this.getText()} title={this.getTitle()} url={this.getUrl()} />
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
    return <Anchor onAnchorClicked={this.props.onAnchorClicked} text={this.getText()} url={this.props.url} />
  }
}

class Image extends React.Component {
  onClicked(event) {
    event.preventDefault();
    this.props.onAnchorClicked(this.props.tweetUrl);
  }

  render() {
    return(
      <div>
        <a href={this.props.tweetUrl} onClick={this.onClicked.bind(this)}>
          <img className="tweet-image" src={this.props.imageUrl} />
        </a>
      </div>
    );
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
        if (this.getImageUrls().indexOf(entity.url) === -1) {
          components.push(<AnchorToUrl displayUrl={entity.url} onAnchorClicked={this.props.onAnchorClicked} url={entity.url} urlEntity={this.getUrlEntityFromUrl(entity.url)} />);
        }
      } else if (entity.hashtag) {
        components.push(<AnchorToHashtag entireText={text} onAnchorClicked={this.props.onAnchorClicked} entity={entity} />);
      } else if (entity.listSlug) {
        components.push(<AnchorToList entireText={text} onAnchorClicked={this.props.onAnchorClicked} entity={entity} />);
      } else if (entity.screenName) {
        components.push(<AnchorToMention entireText={text} onAnchorClicked={this.props.onAnchorClicked} entity={entity} />);
      } else if (entity.cashtag) {
        components.push(<AnchorToCashtag entireText={text} onAnchorClicked={this.props.onAnchorClicked} entity={entity} />);
      }
      index = entity.indices[1];
    });
    components.push(<Text text={text.substring(index, text.length)} />);
    components.push(...this.getImages());
    return components;
  }

  getEntities() {
    return twitterText.extractEntitiesWithIndices(
      this.props.tweet.text,
      { extractUrlsWithoutProtocol: false }
    );
  }

  getImages() {
    if (this.props.tweet.entities.media) {
      return this.props.tweet.entities.media.filter((media) => {
        return media.type === 'photo';
      }).map((media) => {
        return <Image imageUrl={media.media_url_https} onAnchorClicked={this.props.onAnchorClicked} tweetUrl={media.url} />;
      });
    } else {
      return [];
    }
  }

  getImageUrls() {
    if (this.props.tweet.entities.media) {
      return this.props.tweet.entities.media.filter((media) => {
        return media.type === 'photo';
      }).map((media) => {
        return media.url;
      });
    } else {
      return [];
    }
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
