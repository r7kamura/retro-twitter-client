import Editor from './editor'
import homeTimelineStore from '../stores/home-timeline-store'
import React from 'react'
import TweetsItem from './tweets-item'

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getStateFromStore();
  }

  componentDidMount() {
    homeTimelineStore.on('changed', () => {
      this.setState(this.getStateFromStore());
    });
  }

  getStateFromStore() {
    return {
      tweets: homeTimelineStore.getTweets()
    };
  }

  render() {
    let tweetsItems = this.state.tweets.map((tweet) => {
      return <TweetsItem key={tweet.id_str} tweet={tweet} />
    });
    return(
      <main className="main">
        <Editor />
        <ul className="tweets">
          {tweetsItems}
        </ul>
      </main>
    );
  }
}
