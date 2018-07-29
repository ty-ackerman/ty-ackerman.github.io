import React from "react";
import { Bar } from "react-chartjs-2";

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: [54, 59, 80, 81, 56, 55, 40]
    }
  ]
};

class BarGraph extends React.Component {
  constructor() {
    super();
    this.state = {
      point: 1000
    };
  }

  render() {
    return (
      <div>
        <h2>Totals By Visa Type</h2>
        <Bar
          data={{
            labels: [
              "Work Visa",
              "Express Entry",
              "Visitor Visa",
              "Study Visa",
              "Family Sponsorship"
            ],
            datasets: [
              {
                label: "Total Number of Clients",
                backgroundColor: "dodgerblue",
                borderColor: "rgba(255,99,132,1)",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(255,99,132,0.4)",
                hoverBorderColor: "rgba(255,99,132,1)",
                data: [
                  this.props.visa.workVisa,
                  this.props.visa.expressEntry,
                  this.props.visa.visitorVisa,
                  this.props.visa.studyVisa,
                  this.props.visa.familySponsorship
                ]
              }
            ]
          }}
          width={100}
          height={50}
          options={{
            maintainAspectRatio: false
          }}
        />
      </div>
    );
  }
}

export default BarGraph;
