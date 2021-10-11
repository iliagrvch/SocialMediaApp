import styles from "./PersonalInfo.module.css";
import { useEffect } from "react";
import Wrapper from "../UI/Wrapper";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AuthContext from "../../store/auth-context";
import { useContext } from "react";
import FollowButton from "../UI/FollowButton";

function PersonalInfo(props) {
  const authCtx = useContext(AuthContext);
  const { username, following, followers, tweetsCount, city, description, id } =
    props.data;
  useEffect(() => {});
  return (
    <Wrapper>
      <div className={styles.container}>
        <h3>{username}</h3>
        <div className={styles.city}>
          <LocationOnIcon />
          {city}
        </div>
        <div>{description}</div>
        {authCtx.userId !== id && (
          <FollowButton followingTo={following} userId={id} />
        )}
        <div className={styles.stats}>
          <div>
            <div className={styles.title}>Tweets</div>
            <div className={styles.count}>{tweetsCount}</div>
          </div>
          <div className="divided__horizontal">
            <div className={styles.title}>Followers</div>
            <div className={styles.count}>{followers}</div>
          </div>
          <div>
            <div className={styles.title}>Following</div>
            <div className={styles.count}>{following.length}</div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default PersonalInfo;
