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
  }
  }
  render() {


    return (
      <div className="App">
                  <Navbar />
        <div className="components">
        </div>
      </div>
    );
  }
}
