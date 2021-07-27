import "./Portf.css";
import ExchangeList from "./components/Exchanges/ExchangeList";
import AssetsList from "./components/Holdings/AssetsList";
import Piechart from "./components/Piechart/Piechart";
import NavBar from "./components/NavBar/NavBar";
import { Link } from "react-router-dom";


function Portf(props) {
  const dummy_data = [
    {
      id: Math.random().toString(),
      symbol: "BTC",
      name: "Bitcoin",
      amount: "10",
      amount_usd: "90000",
    },
    {
      id: Math.random().toString(),
      symbol: "ETH",
      name: "Ethereum",
      amount: "15",
      amount_usd: "50000",
    },
    {
      id: Math.random().toString(),
      symbol: "USDT",
      name: "Tether",
      amount: "55",
      amount_usd: "70000",
    },
    {
      id: Math.random().toString(),
      symbol: "BNB",
      name: "Binance Coin",
      amount: "0",
      amount_usd: "0",
    },
    {
      id: Math.random().toString(),
      symbol: "ADA",
      name: "Cardano",
      amount: "0",
      amount_usd: "0",
    },
    {
      id: Math.random().toString(),
      symbol: "USDC",
      name: "USD Coin",
      amount: "0",
      amount_usd: "0",
    },
    {
      id: Math.random().toString(),
      symbol: "XRP",
      name: "XRP",
      amount: "0",
      amount_usd: "0",
    },
    {
      id: Math.random().toString(),
      symbol: "DOT",
      name: "Polkadot",
      amount: "0",
      amount_usd: "0",
    },
    {
      id: Math.random().toString(),
      symbol: "BUSD",
      name: "Binance USD",
      amount: "0",
      amount_usd: "0",
    },
    {
      id: Math.random().toString(),
      symbol: "LTC",
      name: "Litecoin",
      amount: "0",
      amount_usd: "0",
    },
  ];
  return (
    <div className=".Portf">
      <NavBar />
      <div className="Main">
        <ExchangeList />
        <AssetsList data={dummy_data} />
        <Piechart data={dummy_data} />
      </div>
    </div>
  );
}

export default Portf;
