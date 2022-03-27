import React from "react";
import styles from "./CodeEditor.module.scss";
import "./prism/prism.css";
import Prism from "prismjs";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-css";
import "prismjs/components/prism-csv";
import "prismjs/components/prism-docker";
import "prismjs/components/prism-git";
import "prismjs/components/prism-json";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-mongodb";
import "prismjs/components/prism-python";
import "prismjs/components/prism-regex";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-java";
import "prismjs/components/prism-go";
import "prismjs/components/prism-c"
import "prismjs/components/prism-cpp"
import "prismjs/components/prism-csharp"

import Overlay from "../reusable_comps/overlay/overlay";
const overlayElement = (
  <span>
    {" "}
    <b>This is a development build for research and testing only </b>
    <br /> If you have found your way here without reading the participant
    information,{" "}
     {/* eslint-disable-next-line */}
    <a target="_blank"  href="https://forms.office.com/r/f5ef0regrw">
      please click here
    </a>{" "}
  </span>
);
// inspired from https://css-tricks.com/creating-an-editable-textarea-that-supports-syntax-highlighted-code/
class CodeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      highlightingRef: React.createRef(),
      editingRef: React.createRef(),
      language: props.language || "javascript",
    };
  }

  componentDidMount() {}
  componentDidUpdate() {
    Prism.highlightAll();
  }
  handleInput(event) {
    event.persist(); // stops react from recycling the SyntheticEvent on re-render
    let text = this.state.editingRef.current.value;
    if (text[text.length - 1] === "\n") {
      text += " ";
    }
    this.setState({ text });
  }
  handleScroll(event) {
    event.persist(); // stops react from recycling the SyntheticEvent on re-render
    const highlightingElement = this.state.highlightingRef.current;
    highlightingElement.scrollLeft = this.state.editingRef.current.scrollLeft;
    highlightingElement.scrollTop = this.state.editingRef.current.scrollTop;
  }

  handleKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      this.handleTab();
      return;
    }

    //TODO: ctrl s to force run analysis
    //TODO: ctrl e? to open export panel
  }

  handleTab() {
    let text = this.state.text;
    const editingElement = this.state.editingRef.current;
    let before = text.slice(0, this.state.editingRef.current.selectionStart);
    let after = text.slice(
      this.state.editingRef.current.selectionEnd,
      text.length
    );

    let cursor = this.state.editingRef.current.selectionStart + 1;

    let newText = before + "\t" + after;

    editingElement.value = newText;
    this.setState({ text: newText }, () =>
      this.state.editingRef.current.setSelectionRange(cursor, cursor)
    );
  }

  render() {
    return (
      <div id="codeEditor" className={styles.wrapper}>
        <Overlay text={overlayElement} />
        <textarea
          ref={this.state.editingRef}
          placeholder="Enter Code Here "
          className={styles.editing}
          spellCheck="false"
          onChange={(ev) => {
            this.handleInput(ev);
          }}
          onScroll={(ev) => {
            this.handleScroll(ev);
          }}
          onKeyDown={(ev) => {
            this.handleKeyDown(ev);
          }}
        ></textarea>
        <pre
          ref={this.state.highlightingRef}
          className={styles.highlighting}
          aria-hidden="true"
        >
          <code
            className={`language-${this.props.language || this.state.language}`}
            id="highlighting-content"
          >
            {this.state.text}
          </code>
        </pre>
      </div>
    );
  }
}
export default CodeEditor;
