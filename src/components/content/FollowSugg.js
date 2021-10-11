import styles from "./FollowSugg.module.css";
import { Card } from "@mui/material";
import AccountCard from "../UI/AccountCard";
import AuthContext from "../../store/auth-context";
import { useContext, useEffect } from "react";
import useHttp from "../../hooks/use-http";
import { getUserData } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import { Fragment } from "react";

function FolowSugg() {
  const DUMMY_SUGGESTIONS = [
    {
      userId: "GXN0bFvOolZ2Y0loUQcFxRHyFqP2",
      username: "Ilia Gurevich",
    },
    {
      userId: "0FnCJcmmY8TLCSHPTPss19QyULK2",
      username: "Robot",
    },
    {
      userId: "VyMzJlqBUmcWJwvPE8dCT8dX7iH3",
      username: "John Doe",
    },
  ];

  const authCtx = useContext(AuthContext);

  const { sendRequest, status, data, error } = useHttp(getUserData);

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
      if (error || (status === "completed" && !data)) {
        return <Fragment></Fragment>;
      }
    }
  }, [sendRequest]);
  return (
    <Fragment>
      {data ? (
        <Card
          sx={{
            maxWidth: 300,
            margin: 2,
            width: "100%",
            boxShadow: 0,
            backgroundColor: "#f5f5f5",
            borderRadius: 3,
          }}
        >
          <div className={styles.container}>
            <div className={styles.title}>You should follow</div>
            {DUMMY_SUGGESTIONS.map((el, index) => {
              if (index === 0 || index === DUMMY_SUGGESTIONS.length - 1) {
                return (
                  <div key={index}>
                    <AccountCard
                      key={index}
                      userId={el.userId}
                      username={el.username}
                      followingTo={data.following}
                    />
                  </div>
                );
              } else {
                return (
                  <div key={index} className="divided__vertical">
                    <AccountCard
                      key={index}
                      userId={el.userId}
                      username={el.username}
                      followingTo={data.following}
                    />
                  </div>
                );
              }
            })}
          </div>
        </Card>
      ) : null}
    </Fragment>
  );
}

export default FolowSugg;
