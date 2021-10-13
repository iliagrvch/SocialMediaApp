import styles from "./FollowSugg.module.css";
import { Card } from "@mui/material";
import AccountCard from "../UI/AccountCard";
import AuthContext from "../../store/auth-context";
import { useContext, useEffect } from "react";
import useHttp from "../../hooks/use-http";
import { getFollowSuggestions } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import { Fragment } from "react";
import { Divider } from "@mui/material";
function FolowSugg() {
  const authCtx = useContext(AuthContext);

  const { sendRequest, status, data, error } = useHttp(getFollowSuggestions);

  useEffect(() => {
    if (authCtx.userId) sendRequest(authCtx.userId);
  }, [sendRequest, authCtx.userId]);

  useEffect(() => {
    if (status === "pending") {
      return (
        <div className="centered">
          <LoadingSpinner />
        </div>
      );
    }
    if (error || (status === "completed" && !data)) {
      return "";
    }
  }, [status, error, data]);

  return (
    <Fragment>
      {data && data.length !== 0 && (
        <Card
          sx={{
            maxWidth: 300,
            width: "100%",
            boxShadow: 0,
            backgroundColor: "#f5f5f5",
            borderRadius: 3,
          }}
        >
          <div className={styles.container}>
            <div className={styles.title}>You should follow</div>
            {data.map((el, index) => {
              if (index > 2) return "";
              if (index !== data.length - 1) {
                return (
                  <Fragment key={index}>
                    <AccountCard
                      userId={el.id}
                      username={el.username}
                      followingTo={el.following}
                    ></AccountCard>
                    <Divider />
                  </Fragment>
                );
              } else {
                return (
                  <Fragment key={index}>
                    <AccountCard
                      userId={el.id}
                      username={el.username}
                    ></AccountCard>
                  </Fragment>
                );
              }
            })}
          </div>
        </Card>
      )}
    </Fragment>
  );
}

export default FolowSugg;
