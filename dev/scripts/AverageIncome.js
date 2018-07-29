import React from "react";

class AverageIncome extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h2>Revenue Information</h2>
        <p>
          Average Revenue per Client in Period Selected: $
          {Math.round(this.props.revenue.avgRev * 100) / 100}
        </p>
        <p>
          Total Revenue Received in Period Selected: $
          {Math.round(this.props.revenue.totalRev * 100) / 1}
        </p>
        <p>Total Clients: {this.props.filteredClients.length}</p>
        {console.log(this.props.revenue)}
      </React.Fragment>
    );
  }
}

export default AverageIncome;
