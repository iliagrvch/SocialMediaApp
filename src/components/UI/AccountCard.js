import styles from "./AccountCard.module.css";
import { Card } from "@mui/material";
import { CardActionArea, CardActions } from "@mui/material";
import { useHistory } from "react-router";
import FollowButton from "../follow/FollowButton";
export default function AccountCard(props) {
  const history = useHistory();

  function redirectHandler() {
    history.replace(`/${props.userId}`);
  }

  return (
    <Card
      className={styles.container}
      sx={{ borderRadius: 0, backgroundColor: "rgba(0,0,0,0)" }}
    >
      <CardActionArea onClick={redirectHandler}>
        <h3>{props.username}</h3>
      </CardActionArea>
      <CardActions sx={{ p: 0 }}>
        <FollowButton userId={props.userId} />
      </CardActions>
    </Card>
  );
}
