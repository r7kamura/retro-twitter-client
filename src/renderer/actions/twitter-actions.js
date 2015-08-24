import homeTimelineStore from '../stores/home-timeline-store'
import remote from 'remote'
const Twitter = remote.require('twitter');

const twitterActions = {
  fetchTweets: () => {
    const credentials = remote.getGlobal('application').credentials;
    new Twitter({
      access_token_key: credentials.accessToken,
      access_token_secret: credentials.accessTokenSecret,
      consumer_key: 'KAR2eM09o2GCddFfHUXz7vFKV',
      consumer_secret: '8MoozYzEzkstemW4fagnm5qlGMVELIxuWBTcBOz0BpUDIpDWqY'
    }).get(
      'statuses/home_timeline',
      {
        screen_name: 'r7kamura'
      },
      (error, tweets, response) => {
        homeTimelineStore.mergeTweets(tweets);
      }
    );
  }
};

export default twitterActions;
