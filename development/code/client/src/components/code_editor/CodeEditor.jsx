import React from "react";
import styles from "./CodeEditor.scss";
class CodeEditor extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div id="codeEditor" className={styles.wrapper}>
       code editor
      </div>
    );
  }
}
export default CodeEditor;
