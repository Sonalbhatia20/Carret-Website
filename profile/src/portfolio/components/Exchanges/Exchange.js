import { useState } from "react";
import styles from "./Exchange.module.css";
import del from "./del.png";
import edit from "./edit.png";
import Icon from "../Holdings/Icon";

const Exchange = (props) => {
  const obj = props.data;

  const deleteHandler = () => {
    // setDeleteText('(Deleted!)');
    props.onDelete(obj.id);
  };
  const editHandler = () => {
    props.onAdd();
    props.onDelete(obj.id);
  };

  return (
    <div className={styles.head}>
      <div className={styles.first}>
        <Icon data={obj.name} />
        <p>{obj.name}</p>
      </div>
      <div className={styles.sec}>
        <button onClick={editHandler} className={styles.edit}>
          <img src={edit}></img>
        </button>
        <button onClick={deleteHandler}>
          <img src={del}></img>
        </button>
      </div>
    </div>
  );
};

export default Exchange;
