import React from "react";
import { Col, Layout, Row } from "antd";
import styles from "./index.module.css";
import logo from "../../assets/img/logo.png";
const { Header, Footer, Sider, Content } = Layout;

export default ({ children }) => {
  return (
    <Layout>
      <Content className={styles.content}>
        <div className={styles.containerAbsolute}></div>
        <Row>
          <Col
            xs={{ span: 22, offset: 1 }}
            sm={{ span: 16, offset: 4 }}
            lg={{ span: 9, offset: 7 }}
          >
            <div className={styles.boxAuth}>
              <Row>
                <Col span={24} style={{ textAlign: "center" }}>
                  <img className={styles.logo} src={logo} />
                </Col>
                {children}
              </Row>
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};
