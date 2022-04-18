import React from "react";
import styles from "./AnalysisPanel.module.scss";

class AnalysisPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      analysis: props.analysis ===null ? null : JSON.parse(props.analysis)
    }
    console.log(this.state.analysis);
  }
  
  render() {
    return (
      <div id="AnalysisPanel" className={styles.wrapper}>
        <pre key={this.state.analysis}>
          {this.state.analysis? this.state.analysis.error ? this.state.analysis.error.message :JSON.stringify(this.state.analysis.ast,null,2): <div style={{width:"100%",textAlign:"center"}}>Ctrl + S to analyse</div>}
        </pre>
      </div>
    );
  }
}
export default AnalysisPanel;
