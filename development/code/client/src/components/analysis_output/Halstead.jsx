import React, { PureComponent } from "react";
import styles from "./Halstead.module.scss";

class Halstead extends PureComponent {
  constructor(props) {
    super(props);

    this.state = props.obj;
    this.isProgram = props.type === "Program";
  }
  evaluateHalsteadMetrics() {
    let volumeColour = null;
    let volumeMessage = null;

    let bugColour = null;
    let bugMessage = null;

    if (this.isProgram) {
      if (this.state.volume < 100) {
        volumeColour = "#ff6961";
        volumeMessage = "A program file should have a minimum volume of 100, could this be incorporated into another program?";
      } else if (this.state.volume > 8000) {
        volumeColour = "#ff6961";
        volumeMessage = "A program file should have a maximum volume of 8000, this program could likely be split into smaller programs";
      } else {
        volumeColour = "#77DD77";
        volumeMessage = "Program file an acceptable volume, it is doing not too little or too much";
      }
      if (this.state.numberDeliveredBugs > 2) {
        bugColour = "#ff6961";
        bugMessage =
          "The estimated bugs for this program should be lower than 2, it is likely too complex ";
      } else {
        bugColour = "#77DD77";
        bugMessage = "The estimated bugs in the program is below the threshold, it is not too complex";
      }
    } else {
      if (this.state.volume < 20) {
        volumeColour = "#ff6961";
        volumeMessage = "A function should have a minimum volume of 20, could this function be incorporated into another function?";
      } else if (this.state.volume > 1000) {
        volumeColour = "#ff6961";
        volumeMessage = "A function should have a maximum volume of 1000, this function could likely be split into smaller functions";
      } else {
        volumeColour = "#77DD77";
        volumeMessage = "Function has a valid volume, it is doing not too little or too much";
      }
      if (this.state.numberDeliveredBugs > 0.25) {
        bugColour = "#ff6961";
        bugMessage =
          "The estimated bugs for this function should be lower than 0.25 ";
      } else {
        bugColour = "#77DD77";
        bugMessage = "The estimated bugs in the function is below the threshold, it is not too complex";
      }
    }

    return {
      volume: {
        colour: volumeColour,
        message: volumeMessage,
      },
      numberDeliveredBugs: {
        colour: bugColour,
        message: bugMessage,
      },
    };
  }
  render() {
    var metrics = this.evaluateHalsteadMetrics();
    return (
      <div className={styles.halstead}>
        <div>
          <span className={styles.title}>Halstead Complexity Measures</span>
        </div>

        <div className={styles.measures}>
          <div>
            <span className={styles.sub_title}>Operators</span>{" "}
            <span>( Operators , reserved words)</span>
            <div style={{ marginLeft: "10px" }}>
              {" "}
              Distinct{" "}
              <span className={styles.maths}>
                n<span className={styles.superScript}>1</span>
              </span>
              {" = "}
              <span className={styles.green}>
                {this.state.distinctOperators}{" "}
              </span>
              {" : "}
              {Object.keys(this.state.operators).map((e, i) => {
                return (
                  <span><span className={styles.ops}>{e.substring(1)}</span> </span>
                );
              })}{" "}
            </div>
            <div style={{ marginLeft: "10px" }}>
              Total{" "}
              <span className={styles.maths}>
                N<span className={styles.superScript}>1</span>
              </span>
              {" = "}
              <span className={styles.green}>{this.state.totalOperators} </span>
            </div>
          </div>
          <div>
            <span className={styles.sub_title}>Operands</span>{" "}
            <span>( Identifiers, Numeric and String constants )</span>
            <div style={{ marginLeft: "10px" }}>
              Distinct{" "}
              <span className={styles.maths}>
                n<span className={styles.superScript}>2</span>
              </span>
              {" = "}
              <span className={styles.green}>
                {this.state.distinctOperands}{" "}
              </span>
              {" : "}


              {Object.keys(this.state.operands).map((e, i) => {
                return <span><span className={styles.ops}>{e.substring(1)}</span> </span>
              })}
            </div>
            <div style={{ marginLeft: "10px" }}>
              Total{" "}
              <span className={styles.maths}>
                N<span className={styles.superScript}>2</span>
              </span>
              {" = "}
              <span className={styles.green}>{this.state.totalOperands} </span>
            </div>
          </div>

          <div>
            <span className={styles.sub_title}>Program Vocabulary</span>{" "}
            <span>( Sum of unique operands and operators )</span>
            <div style={{ marginLeft: "10px" }}>
              <span className={styles.maths}>n</span> {" = "}{" "}
              {this.state.programVocab}
            </div>
          </div>

          <div>
            <span className={styles.sub_title}>Program Length</span>{" "}
            <span>( Sum of total operands and operators )</span>
            <div style={{ marginLeft: "10px" }}>
              <span className={styles.maths}>N</span> {" = "}{" "}
              {this.state.programLength}
            </div>
          </div>

          <div>
            <span className={styles.sub_title}>Volume</span>{" "}
            <span>( Bits needed to store program)</span>
            <div style={{ marginLeft: "10px" }}>
              <span className={styles.maths}>V</span> {" = "}{" "}
              <span>{this.state.volume} </span>
              <div>
                <span style={{ color: metrics.volume.colour }}>
                  {metrics.volume.message}
                </span>
              </div>
            </div>
          </div>
          <div>
            <span className={styles.sub_title}>Difficulty</span>{" "}
            <span>( Error proneness )</span>
            <div style={{ marginLeft: "10px" }}>
              <span className={styles.maths}>D</span> {" = "}{" "}
              {this.state.difficulty}
            </div>
          </div>
          <div>
            <span className={styles.sub_title}>Effort</span>{" "}
            <span>( Effort to implement )</span>
            <div style={{ marginLeft: "10px" }}>
              <span className={styles.maths}>E</span> {" = "}{" "}
              {this.state.effort}
            </div>
          </div>
          <div>
            <span className={styles.sub_title}>Time required to program</span>{" "}
            <span>( Approx time to program )</span>
            <div style={{ marginLeft: "10px" }}>
              <span className={styles.maths}>T</span> {" = "}{" "}
              {this.state.timeRequiredSeconds}{" "}
              <span className={styles.maths}>seconds</span>
            </div>
          </div>
          <div>
            <span className={styles.sub_title}>Number of delivered bugs</span>{" "}
            <span>
              ( Average bugs in {this.isProgram ? "program" : "function"} this
              complex )
            </span>
            <div style={{ marginLeft: "10px" }}>
              <span className={styles.maths}>B</span> {" = "}{" "}
              {this.state.numberDeliveredBugs}
              <div>
                <span style={{ color: metrics.numberDeliveredBugs.colour }}>
                  {metrics.numberDeliveredBugs.message}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Halstead;
