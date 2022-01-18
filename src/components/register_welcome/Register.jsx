import React from "react";
import styles from "./Register.module.css";

function Register() {
  return (
    <div className={styles.register}>
      <div className={styles.container_left}>
        <img src="./images/logo.svg" alt="" />
      </div>
      <div className={styles.container_right}>
        <h1 className={styles.principal_title}>WELCOME <span>NAME!</span></h1>
        <input type="" placeholder="Type your username" />
        <h1 className={styles.subtitle}>
        Select your favorite color
        </h1>
        <div className={styles.colors}>
            <div className={styles.color_1}></div>
            <div className={styles.color_2}></div>
            <div className={styles.color_3}></div>
            <div className={styles.color_4}></div>
            <div className={styles.color_5}></div>
            <div className={styles.color_6}></div>
        </div>
        <button className={styles.btn_next}>CONTINUE</button>
        <h1 className={styles.copyright}>
          © 2020 Devs_United - <span>BETA</span>
        </h1>
      </div>
    </div>
  );
}

export default Register;
