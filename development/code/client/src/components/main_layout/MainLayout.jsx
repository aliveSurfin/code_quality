import React from "react";
import ContentLayout from "../content_layout/ContentLayout";
import TopLayout from "../top_layout/TopLayout";
import styles from './mainLayout.module.scss'
class MainLayout extends React.Component {
  constructor(props) {
    super();
    this.state = {
      alive: props.alive,
    };
  }
  render() {
    return (
     <div id="main-layout" className={styles.wrapper}>
         <TopLayout key={this.state.alive} alive={this.state.alive}></TopLayout>
         <ContentLayout></ContentLayout>
         
     </div>
    );
  }
}
export default MainLayout;
