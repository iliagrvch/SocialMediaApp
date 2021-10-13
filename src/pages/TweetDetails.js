import PageContent from "../components/UI/PageContent";
import { useEffect } from "react";
import useHttp from "../hooks/use-http";
import { getTweet, getTweetComments } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { useHistory, useParams } from "react-router";
import Tweet from "../components/tweets/Tweet";
import TweetList from "../components/tweets/TweetList";
import NewTweetForm from "../components/tweets/NewTweetForm";
const TweetDetailsPage = () => {
  const params = useParams();
  const history = useHistory();

  const {
    sendRequest: getComments,
    status: commentsStatus,
    data: commentsData,
  } = useHttp(getTweetComments);

  const {
    sendRequest: getUserTweet,
    status: tweetStatus,
    data: tweetData,
    error: tweetError,
  } = useHttp(getTweet);

  useEffect(() => {
    getUserTweet({ id: params.tweetId, authorId: params.userId });
  }, [getUserTweet, params.tweetId]);

  useEffect(() => {
    if (tweetData) {
      getComments(tweetData.comments);
    }
  }, [tweetData]);
  useEffect(() => {
    const status =
      tweetStatus === "completed" && commentsStatus === "completed"
        ? "completed"
        : "pending";
    if (status === "pending") {
      return (
        <div className="centered">
          <LoadingSpinner />
        </div>
      );
    }
    if (tweetError || (status === "completed" && !tweetData)) {
      history.replace("/");
    }
  }, [commentsStatus, tweetStatus]);
  return (
    <PageContent centered={true}>
      {tweetData ? (
        <Tweet
          id={tweetData.id}
          key={tweetData.id}
          author={tweetData.author}
          authorId={tweetData.authorId}
          comments={tweetData.comments}
          likes={tweetData.likes}
          retweets={tweetData.retweets}
          tweetTime={tweetData.time}
        >
          {tweetData.body}
        </Tweet>
      ) : (
        <LoadingSpinner />
      )}
      <h2>Leave a comment to this tweet</h2>
      <NewTweetForm
        replyTo={{ tweetId: params.tweetId, authorId: params.userId }}
      />
      {commentsData ? (
        <TweetList showReplyTo={false} tweets={commentsData} />
      ) : (
        <LoadingSpinner />
      )}
    </PageContent>
  );
};

export default TweetDetailsPage;
