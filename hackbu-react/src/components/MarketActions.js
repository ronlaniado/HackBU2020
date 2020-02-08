import React from "react";
import "../styles/MarketActions.css";

export default class MarketActions extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="symbol-container">
          <div className="symbol">MSFT</div>
          <div className=" up">+0.26 (0.14%)</div>
        </div>
        <div className="symbol-container">
          <div>25 Available Shares</div>
          <div className="up">{"$"}183.89</div>
        </div>
      </div>
    );
  }
}
