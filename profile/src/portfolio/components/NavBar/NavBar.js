import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <>
      <div className={styles.header}></div>

      <div className={styles.navbar}>
        <a href="#" className={styles.active}>
          Portfolio
        </a>
        <a href="#">Trading Bot</a>
        <a href="#">Exchange</a>
        <a href="#" className={styles.right}>
          Home
        </a>
      </div>
    </>
  );
};

export default NavBar;
