import React from "react";
import AnalysisPanel from "../analysis_output/AnalysisPanel";
import CodeEditor from "../code_editor/CodeEditor";
import styles from "./contentLayout.module.scss";
class ContentLayout extends React.Component {
  constructor() {
    super();
    this.state = {
      language: "javascript",
      selector_ref: React.createRef(),
      analysis: null,
      selection: null,
      codeEditorRef: React.createRef()
    };
  }

  render() {
    return (
      <div id="content-layout" className={styles.wrapper}>
        {/* <select style={{fontFamily:"monospace",padding:"10px",fontSize:"200%"}} ref={this.state.selector_ref} name="language" id="language-selector" onChange={()=>{this.forceUpdate()}}>
          <option value="javascript">JavaScript</option>
          <option value="java">Java</option>
          <option value="python">Python</option>
          <option value="csharp">C#</option>
          <option value="cpp">C++</option>
          <option value="c">C</option>
          <option value="go">Go</option>
        </select> */}
        <CodeEditor ref={this.state.codeEditorRef}
          selection={this.state.selection}
          callback={(source) => {
            this.fetchAnalysis(source);
          }}
          language={
            this.state.selector_ref.current?.value || this.state.language
          }
        ></CodeEditor>
        <AnalysisPanel
          callback={(start, end) => {
            this.setSelectionHandler(start, end);
            
          }}
          key={this.state.analysis}
          analysis={this.state.analysis}
        ></AnalysisPanel>
      </div>
    );
  }
  setSelectionHandler(start, end) {
    this.state.codeEditorRef.current.setCodeEditorSelection(start,end)
  }
  fetchAnalysis = async (src) => {
    const response = await fetch("/api/analysis", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ post: src }),
    });

    const body = await response.text();
    this.setState({ analysis: body });
  };
}
export default ContentLayout;
