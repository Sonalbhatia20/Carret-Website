import React from "react";
import styles from "./Icon.module.css";
import ADA from "./Images/ADA.png";
import BTC from "./Images/BTC.png";
import ETH from "./Images/ETH.png";
import DOT from "./Images/DOT.png";
import USDT from "./Images/USDT.png";
import BNB from "./Images/BNB.png";
import XRP from "./Images/XRP.png";
import LTC from "./Images/LTC.png";
import USDC from "./Images/USDC.png";
import BUSD from "./Images/BUSD.png";
import ftx from "./Images/ftx.png";
import coinbase from "./Images/coinbase.png";
import binance from "./Images/binance.png";

const Icon = (props) => {
  return (
    <div className={styles.symbol}>
      {props.data === "ADA" && <img src={ADA} className={styles.imgg} />}
      {props.data === "BTC" && <img src={BTC} className={styles.imgg} />}
      {props.data === "ETH" && <img src={ETH} className={styles.imgg} />}
      {props.data === "BNB" && <img src={BNB} className={styles.imgg} />}
      {props.data === "USDC" && <img src={USDC} className={styles.imgg} />}
      {props.data === "USDT" && <img src={USDT} className={styles.imgg} />}
      {props.data === "DOT" && <img src={DOT} className={styles.imgg} />}
      {props.data === "XRP" && <img src={XRP} className={styles.imgg} />}
      {props.data === "LTC" && <img src={LTC} className={styles.imgg} />}
      {props.data === "BUSD" && <img src={BUSD} className={styles.imgg} />}
      {props.data === "Coinbase" && (
        <img src={coinbase} className={styles.imgg} />
      )}
      {props.data === "FTX" && <img src={ftx} className={styles.imgg} />}
      {props.data === "Binance" && <img src={BNB} className={styles.imgg} />}
    </div>
  );
};

export default Icon;
