import Popup from "../UI/Popup";
import NewTweetForm from "./NewTweetForm";
import { useState } from "react";
import ContainedButton from "../UI/ContainedButton";

const NewTweetAction = () => {
  const [popupState, setPopupState] = useState(false);
  function popupTriggerHandler() {
    setPopupState(!popupState);
  }
  return (
    <div className={"centered-wrapper vertical"} style={{ marginTop: "20px" }}>
      <ContainedButton sx={{ width: "150px" }} onClick={popupTriggerHandler}>
        Tweet
      </ContainedButton>
      <Popup onClose={popupTriggerHandler} triggered={popupState}>
        <NewTweetForm onSend={popupTriggerHandler} />
      </Popup>
    </div>
  );
};

export default NewTweetAction;
