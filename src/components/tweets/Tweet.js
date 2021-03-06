import styles from "./Tweet.module.css";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import TweetStats from "./TweetStats";
import useHttp from "../../hooks/use-http";
import { toggleLike } from "../../lib/api";
import AuthContext from "../../store/auth-context";
import { useContext } from "react";
import { useHistory } from "react-router";
import Wrapper from "../UI/Wrapper";
import { Fragment } from "react";
import { CardActionArea } from "@mui/material";
function Tweet(props) {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const { sendRequest: like } = useHttp(toggleLike);
  function estimateTime(timeStr) {
    if (timeStr) {
      const date = timeStr.split(":");
      const today = new Date();
      const todayArr = [
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        today.getHours(),
        today.getMinutes(),
      ];
      let res = "now";
      const entries = ["year", "month", "day", "hour", "minute"];
      date.every((el, index) => {
        if (parseInt(el) < todayArr[index]) {
          const number = todayArr[index] - el;
          const end =
            number > 1 ? `${entries[index]}s ago` : `${entries[index]} ago`;
          res = `${number} ${end}`;
          return false;
        }

        return true;
      });

      return res;
    }
  }

  function likeHandler() {
    like({
      userId: authCtx.userId,
      id: props.id,
      authorId: props.authorId,
    });
  }

  function tweetRedirectHandler() {
    history.push(`/${props.authorId}/tweets/id=${props.id}`);
  }

  return (
    <Fragment>
      <CardActionArea>
        <div className={styles.title}>
          <div className={styles.author}>
            <div>
              <div>{props.author}</div>
            </div>
          </div>
          <div className={`${styles.time} horizontal`}>
            <AccessTimeFilledIcon />

            {estimateTime(props.tweetTime)}
          </div>
        </div>
        <div className={`${styles.body} vertical`}>
          <Wrapper>{props.children}</Wrapper>
        </div>
      </CardActionArea>
      <TweetStats
        onComment={tweetRedirectHandler}
        onLike={likeHandler}
        userId={authCtx.userId}
        likes={props.likes}
        comments={props.comments}
      />
    </Fragment>
  );
}

export default Tweet;
