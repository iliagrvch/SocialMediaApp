import { Link } from "react-router-dom";
import { ListItem } from "@mui/material";
import styles from "./MenuItem.module.css";
import { useLocation } from "react-router";
const MenuItem = (props) => {
  const location = useLocation();
  return (
    <ListItem
      component={Link}
      to={props.to}
      className={styles.menuItem}
      selected={
        props.role === "button" ? false : props.to === location.pathname
      }
      onClick={props.role === "button" ? props.onClick : null}
    >
      <div className={styles.icon}>{props.icon}</div>
      <div className={styles.text}>{props.children}</div>
    </ListItem>
  );
};

export default MenuItem;
