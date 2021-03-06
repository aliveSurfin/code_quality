import React, { Component } from "react";
import MainLayout from "./components/main_layout/MainLayout";
import InDev from "./components/in_development/in_dev";
import "./App.css";

class App extends Component {
  state = {
    alive: false,
    intervalID: 0,
  };

  componentDidMount() {
    this.ping()
      .then((res) => {
        this.setState({ alive: true });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ alive: false });
      });
    this.setState({
      intervalID: window.setInterval(() => {
        this.ping()
          .then((res) => {
            this.setState({ alive: true });
          })
          .catch((err) => {
            console.log(err);
            this.setState({ alive: false });
          });
      }, 15000),
    });
  }
  componentWillUnmount() {
    clearInterval(this.state.intervalID);
  }

  ping = async () => {
    const response = await fetch("/api/ping");
    const body = await response.json();
    if (response.status !== 200) throw Error("Server Not Alive");

    return body;
  };

  render() {
    return (
      <div className="App">
        <MainLayout key={this.state.alive} alive={this.state.alive} />
        {/* <InDev /> */}
      </div>
    );
  }
}

export default App;
