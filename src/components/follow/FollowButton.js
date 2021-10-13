import { useState, useContext } from "react";

import { toggleFollow } from "../../lib/api";
import AuthContext from "../../store/auth-context";
import useHttp from "../../hooks/use-http";
import ContainedButton from "../UI/ContainedButton";
const FollowButton = (props) => {
  const authCtx = useContext(AuthContext);

  const initialState =
    props.followingTo && props.followingTo.includes(props.userId)
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
    <ContainedButton sx={{ width: "100px" }} onClick={clickHandler}>
      {buttonState}
    </ContainedButton>
  );
};

export default FollowButton;
