import MyIconButton from "../UI/MyIconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import styles from "./TweetStats.module.css";
const TweetStats = (props) => {
  return (
    <div className={styles.stats}>
      <div>
        <MyIconButton
          icon={<ChatBubbleIcon sx={{ width: 18, height: 18 }} />}
          selected={false}
          count={props.comments.length}
          onClick={props.onComment}
          toToggle={false}
        />
      </div>
      <div>
        <MyIconButton
          icon={<FavoriteIcon sx={{ width: 18, height: 18 }} />}
          selected={props.likes.includes(props.userId)}
          count={props.likes.length}
          onClick={props.onLike}
          toToggle={true}
        />
      </div>
    </div>
  );
};

export default TweetStats;
