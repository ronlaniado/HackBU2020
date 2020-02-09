import React from "react";
import "./App.css";
import Portfolio from "./components/Portfolio";
import Navbar from "./components/Navbar";
import MarketActions from "./components/MarketActions";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      MSFT: 0,
      AAPL: 0,
      AMZN: 0,
      GOOG: 0,
      FB: 0
    };
  }
  componentDidMount() {
    const symbols = ["MSFT", "AAPL", "AMZN", "GOOG", "FB"];
    console.log("Fetching data from API...");
    const key = "7ASH6NK5J6OT4EVM";
    for (let i = 0; i < symbols.length; i++) {
      this.getData(symbols[i], key);
    }
    this.timer = setInterval(() => {
      for (let i = 0; i < symbols.length; i++) {
        this.getData(symbols[i], key);
      }
    }, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  getData = (symbol, key) => {
    return fetch(
      "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" +
        symbol +
        "&interval=1min&outputsize=optional&apikey=" +
        key
    )
      .then(response => {
        return response.json();
      })
      .then(symbolJSON => {
        const timeSeries = symbolJSON["Time Series (1min)"];
        const newestData = Object.keys(timeSeries);
        const openData = timeSeries[newestData[0]];
        console.log(openData["1. open"]);
        this.setState({ [symbol]: openData["1. open"] });
        console.log(symbol + ":     " + openData["1. open"]);
      });
    console.log("MSFT: " + this.state.MSFT);
  };

  render() {


    return (
      <div className="App">
        <div className="components">
          <Navbar />
          <MarketActions
            MSFT={this.state.MSFT}
            AAPL={this.state.AAPL}
            GOOG={this.state.GOOG}
            FB={this.state.FB}
            AMZN={this.state.AMZN}
          />
          <Portfolio
            MSFT={this.state.MSFT}
            AAPL={this.state.AAPL}
            GOOG={this.state.GOOG}
            FB={this.state.FB}
            AMZN={this.state.AMZN}
          />
        </div>
      </div>
    );
  }
}
