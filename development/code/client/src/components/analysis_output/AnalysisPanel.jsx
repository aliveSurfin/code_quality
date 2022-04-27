import React from "react";
import styles from "./AnalysisPanel.module.scss";
import ReactJson from "react-json-view";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { AiOutlineWarning, AiOutlineDownload } from "react-icons/ai";
import { BiTestTube } from "react-icons/bi";
import { ImTree } from "react-icons/im";
import "react-tabs/style/react-tabs.css";
import Halstead from "./Halstead";
import Cyclomatic from "./Cyclomatic";
var idInc = 0;
class AnalysisPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      analysis: props.analysis === null ? null : JSON.parse(props.analysis),
      hovered: null,
      analysisReportRef: React.createRef(),
    };
    this.callback = props.callback;
  }
  astTree(ast) {
    idInc = 0;
    return this.createJSXFromNode(this.state.analysis.ast, 0, 1);
  }
  createJSXFromNode(node, indent, classFunc = false) {
    let elements = [];
    let closing = null;
    let problems = null;
    let halstead = null;
    let cyclomatic = null;
    if (node == null) {
      return null;
    }
    switch (node.type) {
      case "ClassDeclaration":
        elements.push("{");

        node.body.forEach((e) => {
          elements.push(this.createJSXFromNode(e, indent + 5, node.id.name));
        });
        problems =
          this.state.analysis.analysis.classes[`_${node.id.name}`].problems;
        elements.push("  }");
        break;
      case "Program":
        node.body.forEach((e) => {
          elements.push(this.createJSXFromNode(e, indent + 5));
        });

        halstead = this.state.analysis.analysis.complexity.halstead;
        break;
      case "BlockStatement":
        elements.push("{");

        node.body.forEach((e) => {
          elements.push(this.createJSXFromNode(e, indent + 5));
        });
        elements.push("  }");
        break;
      case "FunctionDeclaration":
        if (classFunc) {
          problems =
            this.state.analysis.analysis.classes[`_${classFunc}`].functions[
              `_${node.name.name}`
            ].problems;
          halstead =
            this.state.analysis.analysis.classes[`_${classFunc}`].functions[
              `_${node.name.name}`
            ].complexity.halstead;
          cyclomatic =
            this.state.analysis.analysis.classes[`_${classFunc}`].functions[
              `_${node.name.name}`
            ].complexity.cyclomatic;
        } else {
          problems =
            this.state.analysis.analysis.functions[`_${node.name.name}`]
              .problems;
          halstead =
            this.state.analysis.analysis.functions[`_${node.name.name}`]
              .complexity.halstead;
          cyclomatic =
            this.state.analysis.analysis.functions[`_${node.name.name}`]
              .complexity.cyclomatic;
        }
        elements.push(this.createJSXFromNode(node.body, indent + 5));
        break;
      case "IfStatement":
        elements.push(this.createJSXFromNode(node.consequent, indent + 5));

        if (node.alternate != null) {
          elements.push(<span className="token keyword">else</span>);
        }

        elements.push(this.createJSXFromNode(node.alternate, indent + 5));
        break;
      case "WhileStatement":
        elements.push(this.createJSXFromNode(node.body, indent + 5));
        break;
      case "ForStatement":
        elements.push(this.createJSXFromNode(node.body, indent + 5));
        break;
      case "DoWhileStatement":
        elements.push(this.createJSXFromNode(node.body, indent + 5));
        elements.push(
          <span>
            <span className="token keyword">while</span>(...)
          </span>
        );
        break;
    }
    return (
      <div
        loc={JSON.stringify(node.loc)}
        id={(idInc += 1)}
        key={idInc}
        style={{ paddingLeft: indent }}
        className={node.type}
        onMouseOver={(e) => {
          this.handleMouseOver(e);
        }}
        onClick={(e) => {
          this.handleClick(e);
        }}
      >
        {this.createNodeSpecifics(node, classFunc)}
        {problems && problems.length ? (
          <div className={styles.nodeProblems}>
            <span> Code Smells</span>
            {problems.map((e) => {
              return (
                <div className={styles.error}>
                  {e.type}: {e.message}
                </div>
              );
            })}
          </div>
        ) : null}{" "}
        {halstead ? (
          <Halstead key={halstead} obj={halstead} type={node.type}></Halstead>
        ) : null}
        {cyclomatic ? (
          <Cyclomatic
            key={cyclomatic.cycles}
            cyclomatic={cyclomatic}
          ></Cyclomatic>
        ) : null}
        {elements} {closing}
      </div>
    );
  }

  createProblemsString(problems) {
    if (!problems) {
      return null;
    }
    let returnString = "";
    problems.forEach((e) => {
      returnString += `${e.type} : ${e.message}\n`;
    });
    return returnString;
  }
  handleClick(event) {
    event.stopPropagation();
    let loc = JSON.parse(event.target.getAttribute("loc"));
    this.callback(loc.start.cursor, loc.end.cursor);
  }
  handleMouseOver(event) {
    event.stopPropagation();
    let curElement = document.getElementById(event.target.id);
    try {
      curElement.classList.add(styles.hovered);
    } catch {}
    if (this.state.hovered) {
      let hoveredElement = document.getElementById(this.state.hovered);
      hoveredElement.classList.remove(styles.hovered);
    }

    this.setState({ hovered: event.target.id });
  }
  createNodeSpecifics(node, classFunc) {
    switch (node.type) {
      case "ClassDeclaration":
        return (
          <span className={styles[node.type]}>
            <span className="token keyword">class </span>
            <span className="token class-name">{node.id.name}</span>{" "}
            {node.superClass ? (
              <span>
                <span className="token keyword">extends </span>
                <span className="token class-name">{node.superClass.name}</span>
              </span>
            ) : null}
          </span>
        );
      case "FunctionDeclaration":
        return (
          <span className={styles[node.type]}>
            {" "}
            <span className="token keyword">
              {!classFunc ? "function" : ""}{" "}
            </span>{" "}
            <span className="token function">{node.name.name}</span>({" "}
            {node.params.map((e, i) => {
              return `${e.name}${node.params.length - 1 != i ? ", " : ""}`;
            })}{" "}
            )
          </span>
        );
      case "IfStatement":
        return (
          <span>
            <span className="token keyword">if</span>(...)
          </span>
        );
      case "WhileStatement":
        return (
          <span>
            <span className="token keyword">while</span>(...)
          </span>
        );
      case "ForStatement":
        return (
          <span>
            <span className="token keyword">for</span>(...)
          </span>
        );
      case "DoWhileStatement":
        return (
          <span>
            <span className="token keyword">do</span>
          </span>
        );
      case "BlockStatement":
        return null;
      case "Program":
        return (
          <span
            style={{
              fontSize: "130%",
              fontWeight: "900",
              borderBottom: "2px solid white",
            }}
          >
            Program Report
            <span style={{ fontSize: "50%" }}>
              {" "}
              {new Date().toDateString()}{" - "}{new Date().toTimeString()}
            </span>
          </span>
        );
      case "ReturnStatement":
        return (
          <span>
            <span className="token keyword">return</span>
          </span>
        );

      default:
        return <span>...</span>;
    }
  }

  hasAnalysis() {
    return this.state.analysis;
  }
  hasAst() {
    return this.state.analysis && this.state.analysis.ast;
  }
  hasError() {
    return this.state.analysis && this.state.analysis.error;
  }
  addStyleSheetsToElement(element) {
    var page = document.createElement("div");
    page.innerHTML = element.outerHTML;
    page = page.firstChild;
    for (let i = 0; i < document.styleSheets.length; i++) {
      const e = document.styleSheets[i];
      for (let j = 0; j < e.cssRules.length; j++) {
        const f = e.cssRules[j];
        let styleElement = document.createElement("style");
        styleElement.appendChild(document.createTextNode(f.cssText));
        page.appendChild(styleElement);
      }
    }

    return page;
  }
  async createExportPdf() {
    const element = this.state.analysisReportRef.current;
    let page = this.addStyleSheetsToElement(element);
    const pageHTML = page.outerHTML;
    const blob = new Blob([pageHTML], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const tempEl = document.createElement("a");
    document.body.appendChild(tempEl);
    tempEl.href = url;
    tempEl.download = `report${parseInt(
      (new Date().getTime() / 1000).toFixed(0)
    )}.html`;
    tempEl.click();
    setTimeout(() => {
      URL.revokeObjectURL(url);
      tempEl.parentNode.removeChild(tempEl);
    }, 2000);
  }
  render() {
    return (
      <div id="AnalysisPanel" className={styles.wrapper}>
        <Tabs>
          <TabList className={`react-tabs__tab-list ${styles.tabList}`}>
            <Tab>
              Analysis <BiTestTube />
            </Tab>

            {this.hasAst() ? (
              <Tab>
                AST <ImTree />
              </Tab>
            ) : null}
            {this.hasError() ? (
              <Tab>
                Syntax Errors <AiOutlineWarning />
              </Tab>
            ) : null}
          </TabList>

          <TabPanel>
            <div className={styles.analysis} style={{ width: "100%" }}>
              {this.hasAst() ? (
                <div
                  className={styles.download}
                  onMouseOver={(e) => {
                    this.handleMouseOver(e);
                  }}
                  onClick={() => {
                    this.createExportPdf();
                  }}
                >
                  Download <AiOutlineDownload />{" "}
                </div>
              ) : null}

              {this.state.analysis && this.state.analysis.ast ? (
                <div
                  className={styles.outputReport}
                  ref={this.state.analysisReportRef}
                  style={{ padding: "20px" }}
                >
                  {" "}
                  {this.astTree(this.state.analysis.ast)}
                </div>
              ) : (
                <div className={styles.stoanalyse}>
                  Ctrl + S to analyse
                  {this.hasError() ? (
                    <div className={styles.error}>Check Syntax Errors</div>
                  ) : null}
                </div>
              )}
            </div>
          </TabPanel>

          {this.hasAst() ? (
            <TabPanel>
              <pre key={this.state.analysis}>
                {" "}
                {this.state.analysis && this.state.analysis.ast ? (
                  <ReactJson
                    shouldCollapse={(field) => {
                      return field.name === "loc";
                    }}
                    iconStyle="triangle"
                    theme={"monokai"}
                    src={this.state.analysis.ast}
                  />
                ) : null}
              </pre>
            </TabPanel>
          ) : null}
          {this.hasError() ? (
            <TabPanel>
              {this.state.analysis && this.state.analysis.error ? (
                <div
                  className={styles.syntax}
                  onClick={() => {
                    this.callback(
                      this.state.analysis.error.token.loc.start.cursor,
                      this.state.analysis.error.token.loc.end.cursor
                    );
                  }}
                >
                  {this.state.analysis.error.message}
                </div>
              ) : null}
            </TabPanel>
          ) : null}
        </Tabs>
      </div>
    );
  }
}
export default AnalysisPanel;
