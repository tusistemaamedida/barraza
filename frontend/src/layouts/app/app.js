import React from "react";
import { Layout } from "antd";
import styles from "./index.module.css";
import MenuSidebarLeft from "./menuSidebarLeft";

const { Header, Footer, Sider, Content } = Layout;

export default ({ children }) => {
  const onBreakpoint = (broken) => {
    console.log(broken);
  };
  const onCollapse = (collapsed, type) => {
    console.log(collapsed, type);
  };

  return (
    <Layout>
      <Sider
        className={styles.sidebarLeft}
        trigger={null}
        collapsible
        collapsed={true}
      >
        <MenuSidebarLeft />
      </Sider>
      <Layout style={{ margin: "20px" }}>{children}</Layout>
    </Layout>
  );
};
