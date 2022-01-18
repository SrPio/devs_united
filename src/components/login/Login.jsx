import React from "react";
import styles from "./Login.module.css";

function Login() {
  return (
    <div className={styles.login}>
      <div className={styles.container_left}>
        <img src="./images/logo.svg" alt="" />
      </div>
      <div className={styles.container_right}>
        <h1 className={styles.principal_title}>LOREM IPSUM DOLOR</h1>
        <h1 className={styles.subtitle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </h1>
        <button className={styles.btn_signIn}>
          <img src="./images/gg_signIn.svg" alt="" />
        </button>
        <h1 className={styles.copyright}>© 2020 Devs_United - <span>BETA</span></h1>
      </div>
    </div>
  );
}

export default Login;
