import { Fragment, useState } from "react";
import Card from "../UI/Card";
import Modal from "../UI/Modal";
import styles from "./ExchangeList.module.css";
import Button from "../UI/Button";
import del from "./del.png";
import edit from "./edit.png";
import Icon from "../Holdings/Icon";
import Exchange from "./Exchange";

const ExchangeList = (props) => {
  const [exchanges, setExchanges] = useState([]);
  const [clicked, setClicked] = useState(false);

  const enterHandler = () => {
    setClicked(true);
  };
  const onTapHandler = () => {
    setClicked(false);
  };
  const addHandler = async (ename, eApiKey, eApiSecret, subName) => {
    setExchanges((prev) => {
      const updated = [...prev];
      updated.unshift({
        apiKey: eApiKey,
        apiSecret: eApiSecret,
        name: ename,
        sub: subName,
        id: Math.random().toString(),
      });
      return updated;
    });
    setClicked(false);
    var token;
    await fetch("api/auth/token")
    .then(response => response.json())
    .then((json) => {
      console.log(json)
      token=json['token']
    });
    const tokens=token;
    const obj = {
      apiKey: eApiKey,
      apiSecret: eApiSecret,
      exchangeName: ename
    };
    console.log(tokens);
    const toke="Bearer ";
    const tokenId = toke.concat(tokens)
    await fetch("api/profiles", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
        "Authorization": tokenId
      },
    });
  };

  const deleteHandler = (exchangeId) => {
    setExchanges((prev) => {
      const updated = prev.filter((exchange) => exchange.id !== exchangeId);
      return updated;
    });
  };

  // const editHandler = (exchangeId) => {
  //   deleteHandler(exchangeId);
  //   addHandler()
  // }
  return (
    <Card className={styles.cardBox}>
      <Fragment>
        <h2>Exchanges</h2>
        <ul>
          <li className={styles.firstli}>
            <div className={styles.firstDiv}>Exchange</div>
            <div className={styles.secDiv}>
              <div>Edit</div>
              <div>Delete</div>
            </div>
          </li>
          {exchanges.map((one) => (
            <li key={one.id}>
              <Exchange
                data={one}
                onAdd={enterHandler}
                onDelete={deleteHandler}
              />
            </li>
          ))}
        </ul>
        {clicked && <Modal onAddExchange={addHandler} onTap={onTapHandler} />}
        <Button onClick={enterHandler} className={styles.subButton}>
          Add Exchange
        </Button>
      </Fragment>
    </Card>
  );
};

export default ExchangeList;
