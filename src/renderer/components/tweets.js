import homeTimelineStore from '../stores/home-timeline-store'
import React from 'react'
import Tweet from './tweet'

export default class Tweets extends React.Component {
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
    let tweets = this.state.tweets.map((tweet) => {
      return <Tweet key={tweet.id_str} tweet={tweet} />
    });
    return(
      <ul className="tweets">
        {tweets}
      </ul>
    );
  }
}
