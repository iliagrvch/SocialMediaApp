import Popup from "../UI/Popup";
import NewTweetForm from "./NewTweetForm";
import { useState, Fragment } from "react";
import { Button } from "@mui/material";
const NewTweetButton = () => {
  const [popupState, setPopupState] = useState(false);
  function popupTriggerHandler() {
    setPopupState(!popupState);
  }
  return (
    <Fragment>
      <Button onClick={popupTriggerHandler}>Tweet</Button>
      <Popup onClose={popupTriggerHandler} triggered={popupState}>
        <NewTweetForm onSend={popupTriggerHandler} />
      </Popup>
    </Fragment>
  );
};

export default NewTweetButton;
