import React from "react";
import ContentLayout from "../content_layout/ContentLayout";
import TopLayout from "../top_layout/TopLayout";
import styles from './mainLayout.scss'
class MainLayout extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }
  render() {
    return (
     <div id="main-layout" className={styles.wrapper}>
         <TopLayout></TopLayout>
         <ContentLayout></ContentLayout>
     </div>
    );
  }
}
export default MainLayout;
