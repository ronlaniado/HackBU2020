import React from "react";
import "../styles/MarketActions.css";
import { Select } from "antd";
import { InputNumber, Button, Input } from "antd";

const { Option } = Select;

export default class MarketActions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 25,
      AAPL: this.props.AAPL,
      MSFT: this.props.MSFT,
      GOOG: this.props.GOOG,
      AMZN: this.props.AMZN,
      FB: this.props.FB,
      currentSymbol: "",
      side: "buy",
      currentPrice: this.props.MSFT,
      askingQuantity: 50
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.MSFT !== this.props.MSFT) {
      console.log("NEW VALUE");
      this.setState({ MSFT: nextProps.MSFT });
    }
    if (nextProps.AAPL !== this.props.AAPL) {
      console.log("NEW VALUE");
      this.setState({ AAPL: nextProps.AAPL });
    }
    if (nextProps.GOOG !== this.props.GOOG) {
      console.log("NEW VALUE");
      this.setState({ GOOG: nextProps.GOOG });
    }
    if (nextProps.AMZN !== this.props.AMZN) {
      console.log("NEW VALUE");
      this.setState({ AMZN: nextProps.AMZN });
    }
    if (nextProps.FB !== this.props.FB) {
      console.log("NEW VALUE");
      this.setState({ FB: nextProps.FB });
    }
  }

  render() {
    let sideOptions;
    this.handleButtonPress = side => {
      this.setState({ side: side });
    };

    this.formatCurrency = val => {
      return Number.parseFloat(val).toFixed(2);
    };

    this.handleQuantityInput = value => {
      this.setState({ askingQuantity: value });
    };

    this.selectSymbol = value => {
      console.log(value + ": " + this.state[value]);
      this.setState({ currentSymbol: value });
      this.setState({ currentPrice: this.state[value] });
    };

    this.handleSubmit = e => {
      let data = {
        currentPrice: this.state.currentPrice,
        side: e.target.id,
        quantity: this.state.askingQuantity,
        symbol: this.state.currentSymbol,
        username: "username"      
      };
      console.log(data);
      fetch("https://localhost:666/", {
        method: "POST",
        body: JSON.stringify(data)
      });
    };

    if (this.state.side === "buy") {
      sideOptions = (
        <div className="options">
          <div className="sides">
            Quantity to buy:
            <InputNumber
              className="input"
              onChange={this.handleQuantityInput}
              defaultValue={this.state.askingQuantity}
              formatter={value =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={value => value.replace(/\$\s?|(,*)/g, "")}
            ></InputNumber>
          </div>
          <div className="sides price-buy">
            Price to buy:
            <Input
              readOnly="readnly"
              className="input"
              value={"$" + parseFloat(this.state.currentPrice).toFixed(2)}
            ></Input>
            per share
          </div>
          <div className="total-cost">
            Total cost:
            {" $" +
              this.formatCurrency(
                this.state.askingQuantity * this.state.currentPrice
              )}
          </div>
          <Button
            type="primary"
            id="buy"
            className="buy-order-button"
            onClick={this.handleSubmit}
          >
            Submit Buy Order
          </Button>
        </div>
      );
    } else {
      sideOptions = (
        <div className="options">
          <div>
            Quantity to sell:
            <InputNumber
              className="input"
              defaultValue={this.state.quantity}
              formatter={value =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={value => value.replace(/\$\s?|(,*)/g, "")}
            ></InputNumber>
          </div>
          <div className="price-sell">
            Price to sell:
            <Input
              readOnly="readonly"
              className="input"
              defaultValue={this.state.currentPrice}
            ></Input>{" "}
            per share
          </div>
          <div className="total-cost">
            Total sale:
            {" $" +
              this.formatCurrency(
                this.state.askingQuantity * this.state.currentPrice
              )}
          </div>
          <Button
            type="primary"
            id="sell"
            className="buy-order-button"
            onClick={this.handleSubmit}
          >
            Submit Sell Order
          </Button>
        </div>
      );
    }

    return (
      <div className="container">
        <div className="title-actions">Market Actions</div>
        <div className="symbol-container">
          <Select
            className="symbol"
            defaultValue="Select Symbol"
            onChange={this.selectSymbol}
          >
            <Option value="AAPL">AAPL</Option>
            <Option value="AMZN">AMZN</Option>
            <Option value="FB">FB</Option>
            <Option value="GOOG">GOOG</Option>
            <Option value="MSFT">MSFT</Option>
          </Select>
          <div className=" up">+0.26 (0.14%)</div>
        </div>
        <div className={"price-container"}>
          <div>{this.state.quantity} Shares Currently Owned</div>
          <div className="up">
            {"$"}
            {parseFloat(this.state.currentPrice).toFixed(2)}
          </div>
        </div>

        <div className="button-container">
          <Select defaultValue="Buy" style={{ width: 120 }}>
            <Option value="Buy" onClick={() => this.handleButtonPress("buy")}>
              Buy
            </Option>
            <Option
              id="sell"
              value="Sell"
              onClick={() => this.handleButtonPress("sell")}
              disabled={this.state.quantity > 0 ? false : true}
            >
              Sell
            </Option>
          </Select>
        </div>
        {sideOptions}
      </div>
    );
  }
}
