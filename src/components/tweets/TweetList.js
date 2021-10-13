import styles from "./TweetList.module.css";
import Tweet from "./Tweet";
import Wrapper from "../UI/Wrapper";
import Reply from "./Reply";

function TweetList(props) {
  function createTweet(tweet) {
    return (
      <Tweet
        id={tweet.id}
        key={tweet.id}
        author={tweet.author}
        authorId={tweet.authorId}
        comments={tweet.comments}
        likes={tweet.likes}
        retweets={tweet.retweets}
        tweetTime={tweet.time}
      >
        {tweet.body}
      </Tweet>
    );
  }

  return (
    <div className={styles.container}>
      {props.tweets.map((tweet) => {
        const createdTweet = createTweet(tweet);
        if (tweet.replyTo && props.showReplyTo) {
          return (
            <Wrapper key={tweet.id}>
              <Reply
                replyTo={createTweet(tweet.replyTo)}
                tweet={createdTweet}
              />
            </Wrapper>
          );
        } else {
          return <Wrapper key={tweet.id}>{createdTweet}</Wrapper>;
        }
      })}
    </div>
  );
}

export default TweetList;
