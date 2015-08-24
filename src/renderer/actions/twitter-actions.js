import accountStore from '../stores/account-store';
import homeTimelineStore from '../stores/home-timeline-store';
import twitterClient from '../twitter-client';

const twitterActions = {
  fetchAccount: () => {
    twitterClient.fetchAccount().then(({ account, response }) => {
      accountStore.updateAccount(account);
    });
  },

  fetchTweets: () => {
    twitterClient.fetchTweets().then(({ response, tweets }) => {
      homeTimelineStore.mergeTweets(tweets);
    });
  }
};

export default twitterActions;
