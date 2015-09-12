import remote from 'remote'

const application = remote.getGlobal('application');

export default {
  accessToken: application.accessToken,
  accessTokenSecret: application.accessTokenSecret,
  consumerKey: application.consumerKey,
  consumerSecret: application.consumerSecret
}
