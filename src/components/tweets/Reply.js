import Wrapper from "../UI/Wrapper";
import styles from "./Reply.module.css";
const Reply = (props) => {
  return (
    <Wrapper className={styles.container}>
      <div className={styles.content}>
        <div>{props.replyTo}</div>
        <div>{props.tweet}</div>
      </div>
    </Wrapper>
  );
};

export default Reply;
