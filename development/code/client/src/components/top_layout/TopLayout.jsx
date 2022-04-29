import React from "react";
import styles from './topLayout.module.scss'
import logo from '../../assets/images/logo.svg'
class TopLayout extends React.Component {
  constructor(props) {
    super();
    this.state = {
      alive: props.alive
    };
  }
  render() {
    return (
     <div id="top-layout" className={styles.wrapper}>
       <object type="image/svg+xml" aria-label="logo" data ={logo}></object>
         <div className={`${styles.status} ${this.state.alive? styles.alive: styles.dead}`}>Server Status</div>
         
     </div>
    );
  }
}
export default TopLayout;
