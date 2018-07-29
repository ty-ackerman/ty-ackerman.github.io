import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Search from "./Search";
import DayChooser from "./DayChooser";
import MonthChooser from "./MonthChooser";
import YearChooser from "./YearChooser";
import AllClients from "./AllClients";
import ViewClientList from "./ViewClientList";
import ViewClientListFiltered from "./ViewClientListFiltered";
import AverageIncome from "./AverageIncome";

import PieChart from "./PieChart";
import BarGraph from "./BarGraph";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      clients: [],
      filteredClients: [],
      period: "",
      date: "",
      rating: {
        num: 0,
        denom: 0,
        diff: 0,
        avgRating: 0
      },
      revenue: {
        totalRev: 0,
        avgRev: 0
      },
      visa: {
        workVisa: 0,
        expressEntry: 0,
        visitorVisa: 0,
        studyVisa: 0,
        familySponsorship: 0
      }
    };
    this.getClients = this.getClients.bind(this);
    this.getSpecificPeriod = this.getSpecificPeriod.bind(this);
    this.getVisa = this.getVisa.bind(this);
    this.getSpecificPeriodData = this.getSpecificPeriodData.bind(this);
    this.filterClients = this.filterClients.bind(this);
    this.calcRatingDenominator = this.calcRatingDenominator.bind(this);
    this.calcRatingNumerator = this.calcRatingNumerator.bind(this);
    this.calcTotalIncome = this.calcTotalIncome.bind(this);
  }

  getClients(e) {
    //This function will perform a GET request to the API to access data
    e.preventDefault();
    let v = e.target.value;
    axios({
      url: "https://randomapi.com/api/aa95c1c5886c4b3a0c92c08669170298"
    }).then(res => {
      this.setState(
        {
          clients: res.data.results["0"].clients
        },
        () => {
          if (v === "all") {
            this.setState(
              {
                period: v
              },
              () => {
                this.getVisa();
                let denominator = this.calcRatingDenominator();
                let numerator = this.calcRatingNumerator();
                let totalRevenue = this.calcTotalIncome();
                this.setState({
                  rating: {
                    denom: denominator,
                    num: numerator,
                    diff: denominator - numerator,
                    avgRating: (numerator * 5.0) / denominator
                  },
                  revenue: {
                    totalRev: totalRevenue,
                    avgRev: totalRevenue / 1000
                  }
                });
              }
            );
          }
        }
      );
    });
  }

  getSpecificPeriod(e) {
    //This function will grab the time period that the client wishes to display information for. This will be used in later functions
    let period = e.target.value;
    this.setState({
      period
    });
  }

  getVisa() {
    let workVisa = 0;
    let expressEntry = 0;
    let visitorVisa = 0;
    let studyVisa = 0;
    let familySponsorship = 0;
    if (this.state.period !== "all") {
      for (let i in this.state.filteredClients) {
        if (this.state.filteredClients[i].visa === "Work Visa") {
          workVisa += 1;
        } else if (this.state.filteredClients[i].visa === "Express Entry") {
          expressEntry += 1;
        } else if (this.state.filteredClients[i].visa === "Study Visa") {
          studyVisa += 1;
        } else if (this.state.filteredClients[i].visa === "Visitor Visa") {
          visitorVisa += 1;
        } else if (
          this.state.filteredClients[i].visa === "Family Sponsorship"
        ) {
          familySponsorship += 1;
        }
      }
    } else {
      for (let i in this.state.clients) {
        if (this.state.clients[i].visa === "Work Visa") {
          workVisa += 1;
        } else if (this.state.clients[i].visa === "Express Entry") {
          expressEntry += 1;
        } else if (this.state.clients[i].visa === "Study Visa") {
          studyVisa += 1;
        } else if (this.state.clients[i].visa === "Visitor Visa") {
          visitorVisa += 1;
        } else if (this.state.clients[i].visa === "Family Sponsorship") {
          familySponsorship += 1;
        }
      }
    }
    this.setState({
      visa: {
        workVisa,
        expressEntry,
        visitorVisa,
        studyVisa,
        familySponsorship
      }
    });
  }

  periodDetailRender() {
    //This function will allow the user to specify the day/month/year that they want to view data from
    if (this.state.period === "daily") {
      return (
        <React.Fragment>
          <DayChooser
            getSpecificPeriodData={this.getSpecificPeriodData}
            preventSubmit={this.preventSubmit}
            visa={this.state.visa}
            calcRatingDenominator={this.calcRatingDenominator}
            filteredClients={this.state.filteredClients}
          />
          <AverageIncome revenue={this.state.revenue} />
          <PieChart rating={this.state.rating} visa={this.state.visa} />
          <BarGraph visa={this.state.visa} />
          <ViewClientListFiltered
            filteredClients={this.state.filteredClients}
          />
        </React.Fragment>
      );
    } else if (this.state.period === "monthly") {
      return (
        <React.Fragment>
          <MonthChooser
            getSpecificPeriodData={this.getSpecificPeriodData}
            preventSubmit={this.preventSubmit}
            visa={this.state.visa}
            calcRatingDenominator={this.calcRatingDenominator}
            filteredClients={this.state.filteredClients}
          />
          <AverageIncome revenue={this.state.revenue} />
          <PieChart rating={this.state.rating} visa={this.state.visa} />
          <BarGraph visa={this.state.visa} />
          <ViewClientListFiltered
            filteredClients={this.state.filteredClients}
          />
        </React.Fragment>
      );
    } else if (this.state.period === "yearly") {
      return (
        <React.Fragment>
          <YearChooser
            getSpecificPeriodData={this.getSpecificPeriodData}
            preventSubmit={this.preventSubmit}
            visa={this.state.visa}
            calcRatingDenominator={this.calcRatingDenominator}
            filteredClients={this.state.filteredClients}
          />
          <AverageIncome revenue={this.state.revenue} />
          <PieChart rating={this.state.rating} visa={this.state.visa} />
          <BarGraph visa={this.state.visa} />
          <ViewClientListFiltered
            filteredClients={this.state.filteredClients}
          />
        </React.Fragment>
      );
    } else if (this.state.period === "all") {
      return (
        <React.Fragment>
          <AllClients
            getSpecificPeriod={this.getSpecificPeriodData}
            clients={this.state.clients}
            getVisa={this.getVisa}
            visa={this.state.visa}
            calcRatingDenominator={this.calcRatingDenominator}
            filteredClients={this.state.filteredClients}
          />
          <AverageIncome revenue={this.state.revenue} />
          <PieChart rating={this.state.rating} visa={this.state.visa} />
          <BarGraph visa={this.state.visa} />
          <ViewClientList clients={this.state.clients} />
        </React.Fragment>
      );
    }
  }

  filterClients() {
    let filteredClients = [];
    for (let i in this.state.clients) {
      if (
        this.state.period === "daily" &&
        this.state.clients[i].date.slice(0, 10) === this.state.date
      ) {
        filteredClients.push(this.state.clients[i]);
      } else if (
        this.state.period === "monthly" &&
        this.state.clients[i].date.slice(0, 7) === this.state.date
      ) {
        filteredClients.push(this.state.clients[i]);
      } else if (
        this.state.period === "yearly" &&
        this.state.clients[i].date.slice(0, 4) === this.state.date
      ) {
        filteredClients.push(this.state.clients[i]);
      }
    }
    this.setState(
      {
        filteredClients,
        date: ""
      },
      () => {
        this.getVisa();
        let numerator = this.calcRatingNumerator();
        let denominator = this.calcRatingDenominator();
        let totalRevenue = this.calcTotalIncome();
        this.setState(
          {
            rating: {
              denom: numerator,
              num: denominator,
              diff: denominator - numerator,
              avgRating: (numerator * 5.0) / denominator
            },
            revenue: {
              totalRev: totalRevenue,
              avgRev: totalRevenue / (denominator / 5)
            }
          },
          () => {
            console.log(this.state.visa);
            console.log(this.state.rating);
            // this.setState({
            //   filteredClients: []
            // });
          }
        );
      }
    );
  }

  getSpecificPeriodData(e) {
    let date = e.target.value;
    this.setState(
      {
        date
      },
      () => this.filterClients()
    );
  }

  preventSubmit(e) {
    e.preventDefault();
  }

  calcRatingDenominator() {
    let count = 0;
    if (this.state.period !== "all" && this.state.filteredClients.length) {
      count = this.state.filteredClients.length * 5;
    } else if (this.state.period === "all") {
      count = this.state.clients.length * 5;
    }
    return count;
  }

  calcRatingNumerator() {
    let num = 0;
    let ratingList = [];
    if (this.state.period !== "all" && this.state.filteredClients.length) {
      for (let i in this.state.filteredClients) {
        ratingList.push(this.state.filteredClients[i].rating);
      }
    } else if (this.state.period === "all") {
      for (let i in this.state.clients) {
        ratingList.push(this.state.clients[i].rating);
      }
    } else if (
      this.state.period !== "all" &&
      this.state.filteredClients.length === 0
    ) {
      return "nothing";
    }
    num = ratingList.reduce((total, amount) => {
      return total + amount;
    });
    return num;
  }

  calcTotalIncome() {
    let totalRev = 0;
    let revList = [];
    if (this.state.period !== "all" && this.state.filteredClients.length) {
      for (let i in this.state.filteredClients) {
        revList.push(this.state.filteredClients[i].amount);
      }
    } else if (this.state.period === "all") {
      for (let i in this.state.clients) {
        revList.push(this.state.clients[i].amount);
      }
    } else if (
      this.state.period !== "all" &&
      this.state.filteredClients.length === 0
    ) {
      //this should return "nothing to display on this day
      return "nothing";
    }
    totalRev = revList.reduce((total, amount) => {
      return total + amount;
    });
    return totalRev;
  }

  render() {
    return (
      <div className="wrapper">
        <h1>Client Information - Analytics</h1>
        <Search
          getClients={this.getClients}
          clients={this.state.clients}
          getSpecificPeriod={this.getSpecificPeriod}
          period={this.state.period}
          getVisa={this.getVisa}
          visa={this.state.visa}
        />
        {this.periodDetailRender()}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
