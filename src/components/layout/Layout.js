import styles from "./Layout.module.css";
import NavBar from "./NavBar";
import { Fragment } from "react";
import AuthContext from "../../store/auth-context";
import { useContext } from "react";
import FollowSugg from "../follow/FollowSugg";
import Search from "../search/Search";
function Layout(props) {
  const authCtx = useContext(AuthContext);
  return (
    <Fragment>
      <div className={styles.gridContainer}>
        <div className={styles.midCol}>{props.children}</div>

        <div className={styles.rightCol}>
          <div className={styles.rightColContent}>
            {authCtx.isLoggedIn && (
              <Fragment>
                <FollowSugg />
                <Search />
              </Fragment>
            )}
          </div>
        </div>
        <div className={styles.leftCol}>
          <NavBar />
        </div>
      </div>
    </Fragment>
  );
}

export default Layout;
