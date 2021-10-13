import TweetList from "../tweets/TweetList";
import { sortTweets } from "../../lib/api";
function TweetsFeed(props) {
  return <TweetList showReplyTo={false} tweets={sortTweets(props.tweets)} />;
}

export default TweetsFeed;
