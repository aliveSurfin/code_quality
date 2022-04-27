import React, { PureComponent } from "react";
import styles from "./Cyclomatic.module.scss";

class Cyclomatic extends PureComponent {
  constructor(props) {
    super(props);

    this.state = props.cyclomatic;
  }
  createCyclomaticMessage() {
    let message = "";
    let colour = "";
    if (this.state.cycles < 10) {
      message = "This function is not over complex cyclomatically";
      colour = "#77DD77";
    } else if (this.state.cycles < 15) {
      message = "This function is on the edge of being too cyclomatically complex";
      colour = "#FAC898";
    } else if (this.state.cycles >= 15) {
      message =
        "This function is over complex, attempt to refactor into multiple functions";
      colour = "#ff6961";
    }
    return <span style={{color:colour}}>{message}</span>;
  }
  render() {
    return (
      <div className={styles.cyclomatic}>
        <div>
          <span className={styles.title}>Cyclomatic Complexity</span>
          <div>
            <span>
              This function has{" "}
              <span className={styles.maths}>{this.state.cycles}</span> cycle
              {this.state.cycles > 1 ? "s" : ""}
            </span>
          </div>
          <div>{this.createCyclomaticMessage()}</div>
        </div>
        <div className={styles.complexity}></div>
      </div>
    );
  }
}

export default Cyclomatic;
