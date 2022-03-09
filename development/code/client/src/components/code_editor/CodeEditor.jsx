import React from "react";
import styles from "./CodeEditor.scss";
import "./prism/prism.css"
import Prism from 'prismjs';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-csv';
import 'prismjs/components/prism-docker';
import 'prismjs/components/prism-git';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-mongodb';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-regex';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-yaml';


class CodeEditor extends React.Component {
  constructor() {
    super();
    this.state = {
      text: "",
    };
  }
  componentDidMount() {
    setTimeout(() => Prism.highlightAll(), 0)
  }
  componentDidUpdate() {
    setTimeout(() => Prism.highlightAll(), 0)
  }
  handleInput(event) {
    event.persist(); // stops react from recycling the SyntheticEvent on re-render
    let text = event.target.value;
    if (text[text.length - 1] == "\n") {
      text += " ";
    }
    this.setState({ text });
  }
  render() {
    let code = 
    `var test = "test";`
    return (
      <div
        id="codeEditor"
        className={styles.wrapper}
        style={{ height: "200px" }}
      >
        <textarea
          placeholder="Enter Code Here"
          className={styles.editing}
          spellCheck="false"
          onChange={(i) => {
            this.handleInput(i);
          }}
        ></textarea>
        <pre
          className={styles.highlighting}
          aria-hidden="true"
        >
          <code className="language-javascript" id="highlighting-content">
          {this.state.text
              .replace(new RegExp("&", "g"), "&amp;")
              .replace(new RegExp("<", "g"), "&lt;")}
          </code>
        </pre>
      </div>
      
    );
  }

}
export default CodeEditor;
