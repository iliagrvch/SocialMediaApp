import styles from "./Popup.module.css";
import CloseIcon from "@mui/icons-material/Close";

import ContainedButton from "./ContainedButton";
const Popup = (props) => {
  return props.triggered ? (
    <div className={styles.popup}>
      <div className={`${styles["popup-inner"]} vertical`}>
        <div className={`${styles["close-button"]} vertical right-wrapper`}>
          <ContainedButton sx={{ width: "40px" }} onClick={props.onClose}>
            <CloseIcon />
          </ContainedButton>
        </div>
        <div className="vertical centered-wrapper">{props.children}</div>
      </div>
    </div>
  ) : (
    ""
  );
};
export default Popup;
