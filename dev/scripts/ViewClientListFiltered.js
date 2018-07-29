import React from "react";

class ViewClientListFiltered extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h2>List of Clients in Period Selected</h2>

        {this.props.filteredClients.map(client => {
          return (
            <div className="one-client">
              <p>Name: {client.name}</p>
              <p>Gender: {client.gender}</p>
              <p>Age: {client.age}</p>
              <p>Citezenship: {client.citezenship}</p>
              <p>Language: {client.language}</p>
              <p>Marital Status: {client.marital_status}</p>
              <p>Visa Type: {client.visa}</p>
              <p>Rating Received: {client.rating}</p>
              <p>Amount Received: {client.amount}</p>
              <p>Date: {client.date.slice(0, 10)}</p>
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}

export default ViewClientListFiltered;
