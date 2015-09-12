export default class DesktopNotifier {
  notifyFavorite({ source, target_object }) {
    new Notification(
      `${source.screen_name} favorited your Tweet`,
      {
        body: target_object.text,
        icon: source.profile_image_url
      }
    );
  }

  notifyRetweet({ tweet }) {
    new Notification(
      `${tweet.user.screen_name} retweeted your Tweet`,
      {
        body: tweet.retweeted_status.text,
        icon: tweet.user.profile_image_url
      }
    );
  }
}
