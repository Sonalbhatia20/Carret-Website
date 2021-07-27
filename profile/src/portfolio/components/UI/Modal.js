import React, { useState } from "react";
import Card from "./Card";
import Button from "./Button";
import styles from "./Modal.module.css";

const Modal = (props) => {
  const [ename, setEname] = useState("Coinbase");
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");
  const [sub, setSub] = useState("");
  const [ftxselected, setFtxSelected] = useState(false);

  const nameHandler = (event) => {
    if (event.target.value == "FTX") {
      setFtxSelected(true);
    } else {
      setFtxSelected(false);
    }
    setEname(event.target.value);
  };

  const keyHandler = (event) => {
    setApiKey(event.target.value);
  };

  const secretHandler = (event) => {
    setApiSecret(event.target.value);
  };

  const submitHandler = () => {
    props.onAddExchange(ename, apiKey, apiSecret);
  };

  const subHandler = (event) => {
    setSub(event.target.value);
  };
  return (
    <div>
      <div className={styles.backdrop} onClick={props.onTap} />
      <Card className={styles.modal}>
        <header className={styles.header}>
          <h2>Add New Exchange</h2>
        </header>
        <form onSubmit={submitHandler} className={styles.form}>
          <div className={styles.sub}>
            <label htmlFor="name">Exchange Name</label>
            <select
              id="exchange"
              name="exchange"
              onChange={nameHandler}
              value={ename}
            >
              <option value="Coinbase">CoinBase</option>
              <option value="FTX">FTX</option>
              <option value="Binance">Binance</option>
            </select>
          </div>
          {ftxselected && (
            <div className={styles.sub}>
              <label htmlFor="name">Sub Account Name</label>
              <input
                type="text"
                id="sub"
                onChange={subHandler}
                value={sub}
              ></input>
            </div>
          )}
          <div className={styles.sub}>
            <label htmlFor="key">Api Key</label>
            <input
              type="text"
              id="key"
              onChange={keyHandler}
              value={apiKey}
            ></input>
          </div>
          <div className={styles.sub}>
            <label htmlFor="key">Api Secret</label>
            <input
              type="text"
              id="secret"
              onChange={secretHandler}
              value={apiSecret}
            ></input>
          </div>
          <Button
            type="submit"
            onClick={submitHandler}
            className={styles.subButton}
          >
            Add Exchange
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Modal;
