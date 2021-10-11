import PageContent from "../components/UI/PageContent";
import AccountActivity from "../components/content/AccountActivity";
import PersonalInfo from "../components/content/PersonalInfo";
import { useHistory } from "react-router";

import { useEffect } from "react";
import { useParams } from "react-router";
import useHttp from "../hooks/use-http";
import { getUserData, getAllUserTweets, sortTweets } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";
const ProfilePage = () => {
  const params = useParams();
  const history = useHistory();
  const {
    sendRequest: getUser,
    status: userDataStatus,
    data: userData,
    error: userDataError,
  } = useHttp(getUserData);

  const {
    sendRequest: getTweets,
    status: tweetsStatus,
    data: tweetsData,
    error: tweetsError,
  } = useHttp(getAllUserTweets);

  useEffect(() => {
    getUser(params.userId);
    getTweets(params.userId);
  }, [getUser, getTweets, params.userId]);

  useEffect(() => {
    const status =
      userDataStatus === "completed" && tweetsStatus === "completed"
        ? "completed"
        : "pending";
    if (status === "pending") {
      return (
        <div className="centered">
          <LoadingSpinner />
        </div>
      );
    }
    if (userDataError || tweetsError) {
      history.replace("/");
    }

    if (status === "completed" && !userData) {
      history.replace("/");
    } else if (status === "completed" && !tweetsData) {
      return (
        <PageContent>
          <p>No tweets by this user</p>
        </PageContent>
      );
    }
  }, [tweetsStatus, userDataStatus]);
  return (
    <PageContent centered={true}>
      {userData && tweetsData
        ? [
            <PersonalInfo
              key={0}
              data={{ ...userData, tweetsCount: tweetsData.length }}
            />,
            <AccountActivity key={1} tweets={sortTweets(tweetsData)} />,
          ]
        : [<LoadingSpinner key={0} />]}
    </PageContent>
  );
};

export default ProfilePage;
