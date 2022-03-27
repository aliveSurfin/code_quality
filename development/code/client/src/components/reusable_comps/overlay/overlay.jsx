import React, { PureComponent } from "react";
import styles from "./overlay.module.scss";
class Overlay extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      text: props.text, // this should handle pure text and elements wahoo
      shown: true,
      div_ref: React.createRef(),
    };
  }
  close() {
    this.setState({ shown: false });
  }
  focusSelf() {
    this.state.div_ref.current.focus();
  }
  componentDidMount() {
    this.focusSelf();
  }
  componentDidUpdate() {
    this.focusSelf();
  }
  render() {
    return (
      <div
        tabIndex={0}
        ref={this.state.div_ref}
        onBlur={(e) => {
          e.persist();
          if (e.currentTarget.contains(e.relatedTarget) || e.relatedTarget == null ) { // click self or child of self
            return;
          }

          this.close();
        }}
        className={`${styles.overlay} ${
          this.state.shown === true ? "" : styles.hidden
        }`}
      >
        <span
          role="img"
          aria-label="close overlay"
          className={styles.close}
          onClick={() => {
            this.close();
          }}
        >
          ❌
        </span>

        {this.state.text}
      </div>
    );
  }
}

export default Overlay;
