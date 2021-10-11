import { useState, useContext } from "react";
import { Button } from "@mui/material";
import { toggleFollow } from "../../lib/api";
import AuthContext from "../../store/auth-context";
import useHttp from "../../hooks/use-http";

const FollowButton = (props) => {
  const authCtx = useContext(AuthContext);
  const initialState = props.followingTo.includes(props.userId)
    ? "Unfollow"
    : "Follow";
  const [buttonState, setButtonState] = useState(initialState);
  const { sendRequest } = useHttp(toggleFollow);

  function clickHandler() {
    sendRequest({ currentUserId: authCtx.userId, idToFollow: props.userId });
    const val = buttonState === "Follow" ? "Unfollow" : "Follow";
    setButtonState(val);
  }
  return (
    <Button
      sx={{ width: 100, margin: 1 }}
      onClick={clickHandler}
      variant="contained"
    >
      {buttonState}
    </Button>
  );
};

export default FollowButton;
