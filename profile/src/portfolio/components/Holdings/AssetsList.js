import Card from "../UI/Card";
import styles from "./AssetsList.module.css";
import Icon from "./Icon";

const AssetsList = (props) => {
  const dummy_data = props.data;
  return (
    <Card className={styles.box}>
      <h2>Assets</h2>
      <ul>
        <li className={styles.firstli}>
          <div className={styles.asset}>Asset</div>
          <div className={styles.section}>
            <div className={styles.sectamt}>Amount</div>
            <div>
              <div>Amount</div>
              <div>(in USD)</div>
            </div>
          </div>
        </li>
        {dummy_data.map((asset) => {
          return (
            <li key={asset.id}>
              <div className={styles.firstDiv}>
                <Icon data={asset.symbol} />
                <div className={styles.subFirst}>
                  <div>{asset.name}</div>

                  <div>{asset.symbol}</div>
                </div>
              </div>
              <div className={styles.secDiv}>
                <div className={styles.amt}>{asset.amount}</div>
                <div className={styles.usd}>{`$${asset.amount_usd}`}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
};

export default AssetsList;
