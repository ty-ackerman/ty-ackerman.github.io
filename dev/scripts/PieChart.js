import React from "react";
import { Pie } from "react-chartjs-2";

class PieChart extends React.Component {
  render() {
    return (
      <div>
        <h2>Review Rating Ratio</h2>
        <p>
          Average Rating: {Math.round(this.props.rating.avgRating * 100) / 100}
        </p>
        <p>
          Ratings earned represents the amount of points received from clients
          (Out of 5 per client). Ratings missed indicates the amount of points
          you are away from a perfect 5/5 score.
        </p>
        <Pie
          data={{
            labels: ["Ratings Earned", "Ratings Missed"],
            datasets: [
              {
                data: [this.props.rating.num, this.props.rating.diff],
                backgroundColor: ["green", "red"],
                width: 100
              }
            ]
          }}
        />
      </div>
    );
  }
}

export default PieChart;
