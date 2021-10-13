import styles from "./NewTweetForm.module.css";

import * as React from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import useHttp from "../../hooks/use-http";
import { addTweet } from "../../lib/api";
import { useRef, useContext } from "react";
import AuthContext from "../../store/auth-context";
import ContainedButton from "../UI/ContainedButton";
function NewTweetForm(props) {
  const textRef = useRef();
  const authCtx = useContext(AuthContext);
  const { sendRequest } = useHttp(addTweet);
  function newTweetHandler() {
    sendRequest({
      text: textRef.current.value,
      userId: authCtx.userId,
      replyTo: props.replyTo,
    });
    if (props.replyTo) {
      textRef.current.value = "";
    }
    if (props.onSend) props.onSend();
  }
  return (
    <div className={styles.container}>
      <TextareaAutosize
        style={{ minWidth: 400 }}
        variant="filled"
        minRows={4}
        ref={textRef}
      />
      <div className="vertical right-wrapper">
        <ContainedButton
          sx={{ width: "100px", margin: 1 }}
          onClick={newTweetHandler}
        >
          Tweet
        </ContainedButton>
      </div>
    </div>
  );
}

export default NewTweetForm;
