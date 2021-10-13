import styles from "./NavBar.module.css";
import { List } from "@mui/material";
import AuthContext from "../../store/auth-context";
import { useContext } from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import HelpIcon from "@mui/icons-material/Help";
import LoginIcon from "@mui/icons-material/Login";
import MenuItem from "../UI/MenuItem";
import NewTweetAction from "../tweets/NewTweetAction";
function NavBar() {
  const authCtx = useContext(AuthContext);
  function logoutHandler() {
    authCtx.logout();
  }

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <TwitterIcon />
      </div>
      <List className={styles.nav}>
        <MenuItem role="pageButton" to="/" icon={<HomeIcon />}>
          Home
        </MenuItem>
        {authCtx.isLoggedIn && (
          <MenuItem
            role="pageButton"
            to={`/${authCtx.userId}`}
            icon={<PersonIcon />}
          >
            Profile
          </MenuItem>
        )}

        {!authCtx.isLoggedIn && (
          <MenuItem role="pageButton" to="/auth" icon={<LoginIcon />}>
            Login
          </MenuItem>
        )}
        <MenuItem role="pageButton" to="/about" icon={<HelpIcon />}>
          About
        </MenuItem>
        {authCtx.isLoggedIn && (
          <MenuItem
            role="button"
            to="/"
            onClick={logoutHandler}
            icon={<LoginIcon />}
          >
            Logout
          </MenuItem>
        )}
        {authCtx.isLoggedIn && <NewTweetAction />}
      </List>
    </div>
  );
}

export default NavBar;
