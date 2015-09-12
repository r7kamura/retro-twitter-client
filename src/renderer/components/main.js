import Editor from './editor'
import Header from './header'
import React from 'react'
import Tweets from './tweets'

export default class Main extends React.Component {
  get list() {
    return this.props.lists.filter((list) => {
      return list.id_str === this.props.channelId;
    })[0];
  }

  get title() {
    switch (this.props.channelId) {
    case 'HOME_TIMELINE_CHANNEL':
      return 'Home';
    case 'SEARCH_CHANNEL':
      return 'Search';
    default:
      const list = this.list;
      return `@${list.user.screen_name}/${list.name}`;
    }
  }

  isHomeTimelineSelected() {
    return this.props.channelId === 'HOME_TIMELINE_CHANNEL';
  }

  isListSelected() {
    return !this.isHomeTimelineSelected() && !this.isSearchSelected();
  }

  isSearchSelected() {
    return this.props.channelId === 'SEARCH_CHANNEL';
  }

  render() {
    return(
      <main className="main">
        <Header title={this.title} />
        <Editor key="editor" />
        <Tweets
          selected={this.isHomeTimelineSelected()}
          tweets={this.props.homeTimelineTweets}
        />
        <Tweets
          selected={this.isSearchSelected()}
          tweets={this.props.searchedTweets}
        />
        <Tweets
          selected={this.isListSelected()}
          tweets={this.props.listTweets}
        />
      </main>
    );
  }
}
