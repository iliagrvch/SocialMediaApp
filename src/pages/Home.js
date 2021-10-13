import PageContent from "../components/UI/PageContent";
import AuthContext from "../store/auth-context";
import { useContext, useEffect } from "react";
import TweetsFeed from "../components/content/TweetsFeed";
import useHttp from "../hooks/use-http";
import { getFollowingTweets } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";

function HomePage() {
  const authCtx = useContext(AuthContext);
  const { sendRequest, status, data } = useHttp(getFollowingTweets);

  useEffect(() => {
    if (authCtx.userId) {
      sendRequest(authCtx.userId);
    }
  }, [sendRequest, authCtx.userId]);

  return (
    <PageContent centered={true}>
      {status === "pending" ? (
        <LoadingSpinner />
      ) : data ? (
        <TweetsFeed tweets={data}></TweetsFeed>
      ) : (
        <p>Follow people to see content on this page</p>
      )}
    </PageContent>
  );
}

export default HomePage;
