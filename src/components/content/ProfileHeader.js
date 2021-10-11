import styles from "./ProfileHeader.module.css";

const ProfileHeader = () => {
  const DUMMY_IMG = "/winter2.png";

  return (
    <div
      className={styles["profile-header"]}
      style={{ backgroundImage: `url("${DUMMY_IMG}")` }}
    ></div>
  );
};

export default ProfileHeader;
