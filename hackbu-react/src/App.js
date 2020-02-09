import React from "react";
import "./App.css";
import Portfolio from "./components/Portfolio";
import Navbar from "./components/Navbar";
import MarketActions from "./components/MarketActions";
import Chart from "./components/Chart";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      MSFT: 0,
      AAPL: 0,
      AMZN: 0,
      GOOG: 0,
      FB: 0,
      historyMSFT: [],
      historyAAPL: [],
      historyGOOG: [],
      historyAMZN: [],
      historyFB: []
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
        console.log(newestData);
        let symbolData = [];
        for (let i = 0; i < newestData.length; i++) {
          let myOpenData = timeSeries[newestData[i]];
          symbolData.push({x: i, y: parseFloat(myOpenData["1. open"])});
        }
        console.log(symbolData)
        const openData = timeSeries[newestData[0]];
        console.log(openData["1. open"]);
        let symbolDataName = "history" + symbol;
        this.setState({ [symbol]: openData["1. open"] });
        this.setState({[symbolDataName]: symbolData})
      });
  };

  render() {


    return (
      <div className="App">
                  <Navbar />
        <div className="components">
          <div className="chart">
          <Chart data={this.state.historyMSFT}/>
          </div>
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
