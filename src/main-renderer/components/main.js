import React from 'react';

export default class Main extends React.Component {
  render() {
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
          <li className="tweets-item">
            <div className="tweets-item-sub">
              <img className="tweets-item-avatar" src="https://pbs.twimg.com/profile_images/519846472406151169/5GrJiV-2_400x400.jpeg" height="48" width="48" />
            </div>
            <div className="tweets-item-main">
              <div className="tweets-item-header">
                <div className="tweets-item-names">
                  <span className="tweets-item-display-name">
                    内製フレームワーク
                  </span>
                  <span className="tweets-item-screen-name">
                    @r7kamura
                  </span>
                </div>
                <div className="tweets-item-datetime">
                  2015-08-23 11:52
                </div>
              </div>
              <div className="tweets-item-body">
                renderer processとbrowser processとの間のやりとりが増えてきてもsingletonのipcベッタリで次第に体験になりそう
              </div>
            </div>
          </li>
          <li className="tweets-item">
            <div className="tweets-item-sub">
              <img className="tweets-item-avatar" src="https://pbs.twimg.com/profile_images/519846472406151169/5GrJiV-2_400x400.jpeg" height="48" width="48" />
            </div>
            <div className="tweets-item-main">
              <div className="tweets-item-header">
                <div className="tweets-item-display-name">
                  内製フレームワーク
                </div>
                <div className="tweets-item-screen-name">
                  @r7kamura
                </div>
                <div className="tweets-item-datetime">
                  2015-08-23 11:43
                </div>
              </div>
              <div className="tweets-item-body">
                git co ← ギットコ
              </div>
            </div>
          </li>
        </ul>
      </main>
    );
  }
}
