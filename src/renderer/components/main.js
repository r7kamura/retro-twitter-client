import React from 'react'
import TweetsItem from './tweets-item'
import homeTimelineStore from '../stores/home-timeline-store'

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
        <div className="editor">
          <div>
            <textarea name="name" rows="3" cols="40" className="editor-textarea" placeholder="What's happening?"></textarea>
          </div>
          <div>
            <button className="editor-submit-button" type="button">
              <i className="fa fa-bullhorn"></i>
              Tweet
            </button>
            <div className="editor-counter">
              140
            </div>
          </div>
        </div>
        <ul className="tweets">
          {tweetsItems}
        </ul>
      </main>
    );
  }
}
