import React from "react";
import "../styles/Portfolio.css";
export default class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      AAPL: this.props.AAPL,
      averageAAPL: 0,
      quantityAAPL: 0,
      GOOG: this.props.GOOG,
      averageGOOG: 0,
      quantityGOOG: 0,
      AMZN: this.props.AMZN,
      averageAMZN: 0,
      quantityAMZN: 0,
      FB: this.props.FB,
      averageFB: 0,
      quantityFB: 0,
      MSFT: this.props.MSFT,
      averageMSFT: 0,
      quantityMSFT: 0
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
    return (
      <div className="portfolio">
        <span className="portfolio-title">Portfolio</span>
        <div className="stock-container">
          <div className="stock-container">
            <div className="opposites">
              <div>
                <span className="symbol">Amazon</span>
              </div>
              <div>
                Current Price: {"$" + parseFloat(this.state.AMZN).toFixed(2)}
              </div>
            </div>
            <div className="opposites bottom">
              <div>31 Shares Owned</div>
              <div>Average Price: {this.state.quantityAMZN}</div>
            </div>
          </div>

          <div className="opposites">
            <div>
              <span className="symbol">Apple</span>
            </div>
            <div>
              Current Price: {"$" + parseFloat(this.state.AAPL).toFixed(2)}
            </div>
          </div>
          <div className="opposites bottom">
            <div>31 Shares Owned</div>
            <div>Average Price: {this.state.quantityAAPL}</div>
          </div>
        </div>

        <div className="stock-container">
          <div className="opposites">
            <div>
              <span className="symbol">Facebook</span>
            </div>
            <div>
              Current Price: {"$" + parseFloat(this.state.FB).toFixed(2)}
            </div>
          </div>
          <div className="opposites bottom">
            <div>31 Shares Owned</div>
            <div>Average Price: {this.state.quantityFB}</div>
          </div>
        </div>

        <div className="stock-container">
          <div className="opposites">
            <div>
              <span className="symbol">Google</span>
            </div>
            <div>
              Current Price: {"$" + parseFloat(this.state.GOOG).toFixed(2)}
            </div>
          </div>
          <div className="opposites bottom">
            <div>31 Shares Owned</div>
            <div>Average Price: {this.state.quantityGOOG}</div>
          </div>
        </div>

        <div className="stock-container">
          <div className="opposites">
            <div>
              <span className="symbol">Microsoft</span>
            </div>
            <div>
              Current Price: {"$" + parseFloat(this.state.MSFT).toFixed(2)}
            </div>
          </div>
          <div className="opposites bottom">
            <div>31 Shares Owned</div>
            <div>Average Price: {this.state.quantityMSFT}</div>
          </div>
        </div>
      </div>
    );
  }
}
