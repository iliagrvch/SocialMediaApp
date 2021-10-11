import styles from "./Popup.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
const Popup = (props) => {
  return props.triggered ? (
    <div className={styles.popup}>
      <div className={styles["popup-inner"]}>
        <Button onClick={props.onClose} className={styles["close-button"]}>
          <CloseIcon />
        </Button>
        <div className="centered">{props.children}</div>
      </div>
    </div>
  ) : (
    ""
  );
};
export default Popup;
