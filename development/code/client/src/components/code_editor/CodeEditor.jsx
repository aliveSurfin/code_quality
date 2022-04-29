import React from "react";
import styles from "./CodeEditor.module.scss";
import "./prism/prism.css";
import Prism from "prismjs";
import "prismjs/components/prism-javascript"
import getCaretCoordinates from "./textarea-caret-position.js";
import Overlay from "../reusable_comps/overlay/overlay";
const overlayElement = (
  <span>
    {" "}
    <b>This is a development build for research and testing only </b>
    <br /> If you have found your way here without reading the participant
    information, {/* eslint-disable-next-line */}
    <a target="_blank" href="https://forms.office.com/r/f5ef0regrw">
      please click here
    </a>{" "}
  </span>
);
const autoFill = {
  "[": "]",
  "(": ")",
  "{": "}",
  '"': '"',
  "'": "'",
  "`": "`",
};
const JS_RESERVED_WORDS = [
  "constructor",
  "abstract",
  "arguments",
  "await",
  "boolean",
  "break",
  "byte",
  "case",
  "catch",
  "char",
  "class",
  "const",
  "continue",
  "debugger",
  "default",
  "delete",
  "do",
  "double",
  "else",
  "enum",
  "eval",
  "export",
  "extends",
  "false",
  "final",
  "finally",
  "float",
  "for",
  "function",
  "goto",
  "if",
  "implements",
  "import",
  "in",
  "instanceof",
  "int",
  "interface",
  "let",
  "long",
  "native",
  "new",
  "null",
  "package",
  "private",
  "protected",
  "public",
  "return",
  "short",
  "static",
  "super",
  "switch",
  "synchronized",
  "this",
  "throw",
  "throws",
  "transient",
  "true",
  "try",
  "typeof",
  "var",
  "void",
  "volatile",
  "while",
  "with",
  "yield",
];
// inspired from https://css-tricks.com/creating-an-editable-textarea-that-supports-syntax-highlighted-code/

class CodeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      highlightingRef: React.createRef(),
      editingRef: React.createRef(),
      autoCompleteRef: React.createRef(),
      language: props.language || "javascript",
      autoComplete: {
        words: [],
        position: { x: 0, y: 0 },
        lastWord: "",
        selected: 0,
      },
      selection: props.selection,
    };
    this.callback = props.callback;
  }

  componentDidUpdate() {
    Prism.highlightAll();
  }
  setCodeEditorSelection(start, end) {
    this.state.editingRef.current.focus();

    const textArea = this.state.editingRef.current;
    const fullText = textArea.value;
    textArea.value = fullText.substring(0, start);
    textArea.scrollTop = textArea.scrollHeight;
    textArea.value = fullText;

    this.state.editingRef.current.setSelectionRange(start, end);
  }
  handleAutoCompletePosition() {
    if (this.state.autoCompleteRef.current != null) {
      const autoCompleteElement = this.state.autoCompleteRef.current;
      const editingElement = this.state.editingRef.current;
      let autoCompleteRect = autoCompleteElement.getBoundingClientRect();
      let editingRect = editingElement.getBoundingClientRect();
      let combinedWidth = autoCompleteRect.left + autoCompleteRect.width;
      //if gone off code editor
      if (combinedWidth >= editingRect.width) {
        autoCompleteElement.style.left = `${
          editingRect.width - autoCompleteRect.width
        }px`;
        // put below or above based on screen location
        let heightOffset =
          this.state.autoComplete.position.top > editingRect.height / 2
            ? -autoCompleteRect.height
            : autoCompleteElement.children[0].children[0].getBoundingClientRect()
                .height;
        autoCompleteElement.style.top = `${
          this.state.autoComplete.position.top + heightOffset
        }px`;
      }
    }
  }
  handleAutoFill(charIn) {
    let addition = autoFill[charIn];
    if (addition != undefined) {
      this.handleEntry(charIn + addition, 0);
    }
  }
  handleAutoComplete(curText) {
    let position = getCaretCoordinates(
      this.state.editingRef.current,
      this.state.editingRef.current.selectionEnd
    );
    const separatorRegex = /[\{\}\[\]\(\).,;\s]/;
    let words = curText.split(separatorRegex);
    words.pop(); // don't suggest last
    let lastWord = curText
      .slice(0, this.state.editingRef.current.selectionStart)
      .split(separatorRegex)
      .pop();
    
    let possibleWords = [];
    if (lastWord) {
      possibleWords = [...JS_RESERVED_WORDS, ...words]
        .filter((value, index, self) => self.indexOf(value) === index)
        .filter((value, index, self) => {
          return value.startsWith(lastWord) && value !== lastWord;
        })
        .sort((a, b) => a.localeCompare(b));
    }
    return {
      words: possibleWords,
      position,
      lastWord,
      selected: 0,
    };
  }

  handleInput(event) {
    event.persist(); // stops react from recycling the SyntheticEvent on re-render
    this.handleAutoFill(event.nativeEvent.data);
    let text = this.state.editingRef.current.value;
    let autoComplete = this.handleAutoComplete(text);
    text = this.state.editingRef.current.value;
    if (text[text.length - 1] === "\n") {
      text += " ";
    }
    this.setState({
      text,
      autoComplete,
    });
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
      if (this.state.autoComplete.words.length) {
        this.handleEntry(
          this.state.autoComplete.words[this.state.autoComplete.selected].slice(
            this.state.autoComplete.lastWord.length
          )
        );
        this.setState({
          autoComplete: { words: [], position: { x: 0, y: 0 }, selected: 0 },
        });
        return;
      }
      this.handleEntry("\t");
      return;
    }

    if (event.key === "ArrowUp" || event.key == "ArrowDown") {
      if (this.state.autoComplete.words.length) {
        event.preventDefault();
        let curState = this.state.autoComplete;
        switch (event.key) {
          case "ArrowUp":
            {
              if (curState.selected === 0) {
                curState.selected = curState.words.length - 1;
              } else {
                curState.selected -= 1;
              }
            }
            break;
          case "ArrowDown":
            {
              if (curState.selected === curState.words.length - 1) {
                curState.selected = 0;
              } else {
                curState.selected += 1;
              }
            }
            break;
        }
        this.setState({ autoComplete: curState });
      }

      //TODO: ctrl s to force run analysis
      //TODO: ctrl e? to open export panel
    }
    if (event.key === "s" && event.ctrlKey) {
      event.preventDefault();
      this.callback(this.state.text);
    }
  }

  handleEntry(addition, move = null) {
    let text = this.state.text;
    const editingElement = this.state.editingRef.current;
    let before;
    let after;
    if (move === null) {
      before = text.slice(0, this.state.editingRef.current.selectionStart);
      after = text.slice(
        this.state.editingRef.current.selectionEnd,
        text.length
      );
      move = addition.length;
    } else {
      before = text.slice(0, this.state.editingRef.current.selectionStart - 1);
      after = text.slice(
        this.state.editingRef.current.selectionEnd - 1,
        text.length
      );
    }
    let cursor = this.state.editingRef.current.selectionStart + move;
    let newText = before + addition + after;

    editingElement.value = newText;
    this.setState({ text: newText }, () => {
      this.state.editingRef.current.setSelectionRange(cursor, cursor);
    });
  }
  getWordsSelectedOrder() {
    let firstHalf = this.state.autoComplete.words.slice(
      this.state.autoComplete.selected
    );
    let secondHalf = this.state.autoComplete.words.slice(
      0,
      this.state.autoComplete.selected
    );
    return [...firstHalf, ...secondHalf];
  }
  render() {
    return (
      <div id="codeEditor" className={styles.wrapper}>
        {/* <Overlay text={overlayElement} /> */}
        {this.state.autoComplete.words.length ? (
          <div
            className={styles.autoComplete}
            ref={this.state.autoCompleteRef}
            id="test"
            style={{
              left: this.state.autoComplete.position.left,
              top: this.state.autoComplete.position.top,
            }}
          >
            <pre aria-hidden="true">
              {this.getWordsSelectedOrder().map((e, i) => {
                return (
                  <code
                    key={i}
                    className={`language-${
                      this.props.language || this.state.language
                    } sel`}
                  >
                    {e}
                  </code>
                );
              })}
            </pre>
          </div>
        ) : null}

        <textarea
          onSelect={(ev) => {
            this.handleInput(ev);
          }}
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
          tabIndex={-1}
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
