import React from "react";
import CodeEditor from "../code_editor/CodeEditor";
import styles from "./contentLayout.scss";
class ContentLayout extends React.Component {
  constructor() {
    super();
    this.state = {
      language: "javascript",
      selector_ref: React.createRef()
    };
  }

  render() {
    return (
      <div id="content-layout" className={styles.wrapper}>
        <select style={{fontFamily:"monospace",padding:"10px",fontSize:"200%"}} ref={this.state.selector_ref} name="language" id="language-selector" onChange={()=>{this.forceUpdate()}}>
          <option value="javascript">JavaScript</option>
          <option value="java">Java</option>
          <option value="python">Python</option>
          <option value="csharp">C#</option>
          <option value="cpp">C++</option>
          <option value="c">C</option>
          <option value="go">Go</option>
        </select>
        <CodeEditor language={this.state.selector_ref.current?.value || this.state.language}></CodeEditor>
      </div>
    );
  }
}
export default ContentLayout;
