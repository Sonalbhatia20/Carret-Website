import styles from "./Piechart.module.css";
import Card from "../UI/Card";
import { Pie } from "react-chartjs-2";

const Piechart = (props) => {
  let sum = 0;
  let arr = [];
  let i = 0;
  props.data.forEach(function (arrayItem) {
    if (arrayItem.amount !== "0") {
      arr[i] = arrayItem.name;
    }
    const val = arrayItem.amount_usd;
    sum += parseInt(val);
    i++;
  });

  console.log(arr);
  const state = {
    labels: arr,
    datasets: [
      {
        label: "Rainfall",
        backgroundColor: ["#fac534", "#f59c17", "#fce731"],
        hoverBackgroundColor: ["#fac534c7", "#f59c17c4", "#faf61ca8"],
        data: [90000, 50000, 70000],
        radius: "80%",
      },
    ],
  };

  return (
    <Card className={styles.box}>
      <Card />
      <Card className={styles.first}>
        <div className={styles.total}>
          <h2>Total Value</h2>
        </div>
        <h2>${sum}</h2>
      </Card>
      <Card className={styles.sec}>
        <h2>Piechart</h2>

        <Pie
          data={state}
          options={{
            title: {
              display: true,
              text: "Assets Distribution",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "right",
            },
          }}
        />
      </Card>
    </Card>
  );
};

export default Piechart;
