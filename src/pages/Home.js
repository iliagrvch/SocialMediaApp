import PageContent from "../components/UI/PageContent";
import AuthContext from "../store/auth-context";
import { useContext, useEffect } from "react";
import TweetsFeed from "../components/content/TweetsFeed";
import useHttp from "../hooks/use-http";
import { getFollowingTweets } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";

function HomePage() {
  const authCtx = useContext(AuthContext);
  const { sendRequest, status, data, error } = useHttp(getFollowingTweets);

  useEffect(() => {
    if (authCtx.userId) {
      sendRequest(authCtx.userId);
      if (status === "pending") {
        return (
          <div className="centered">
            <LoadingSpinner />
          </div>
        );
      }
      if (error) {
        return <div>{error}</div>;
      }

      if (status === "completed" && !data) {
        return (
          <PageContent centered={true}>
            <p>Follow people to see content on this page</p>
          </PageContent>
        );
      }
    }
  }, [sendRequest]);

  return (
    <PageContent centered={true}>
      {data
        ? [<TweetsFeed key={0} tweets={data}></TweetsFeed>]
        : [<LoadingSpinner key={0} />]}
    </PageContent>
  );
}

export default HomePage;
