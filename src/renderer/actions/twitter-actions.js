import accountStore from '../stores/account-store';
import homeTimelineStore from '../stores/home-timeline-store';
import remote from 'remote';
const Twitter = remote.require('twitter');

const getTwitterClient = () => {
  const application = remote.getGlobal('application');
  return new Twitter({
    access_token_key: application.accessToken,
    access_token_secret: application.accessTokenSecret,
    consumer_key: application.consumerKey,
    consumer_secret: application.consumerSecret
  });
};

const twitterActions = {
  fetchAccount: () => {
    getTwitterClient().get(
      'account/verify_credentials',
      (error, account, response) => {
        accountStore.updateAccount(account);
      }
    );
  },

  fetchTweets: () => {
    getTwitterClient().get(
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
