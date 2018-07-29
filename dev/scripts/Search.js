import React from "react";

class Search extends React.Component {
  render() {
    return (
      <React.Fragment>
        <p>Please select a time period.</p>
        <form action="" onSubmit={this.props.getClients}>
          <button
            type="submit"
            value="daily"
            onClick={this.props.getSpecificPeriod}
          >
            Daily
          </button>
          <button
            type="submit"
            value="monthly"
            onClick={this.props.getSpecificPeriod}
          >
            Monthly
          </button>
          <button
            type="submit"
            value="yearly"
            onClick={this.props.getSpecificPeriod}
          >
            Yearly
          </button>
          <button type="submit" value="all" onClick={this.props.getClients}>
            All
          </button>
        </form>
      </React.Fragment>
    );
  }
}
export default Search;
