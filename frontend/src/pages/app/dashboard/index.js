import { UserOutlined } from "@ant-design/icons";
import { Card, Col, Layout, Row } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import AppLayout from "../../../layouts/app/app";
import styles from "../app.module.css";

import report1 from "../../../assets/img/1.png";
import report2 from "../../../assets/img/2.png";
import report3 from "../../../assets/img/3.png";
import report4 from "../../../assets/img/4.png";

const { Header, Content } = Layout;

export default () => {
  return (
    <AppLayout>
      <Header className={styles.navTop}>
        <div className={styles.titleNav}>INICIO</div>
      </Header>
      <Content className={styles.content}>
        <Row gutter={[50, 50]} align='middle'>
          <Col lg={10} xs={24} style={{ textAlign: "center" }}>
            <Avatar
              size={{ xs: 160, sm: 160, md: 200, lg: 200, xl: 200, xxl: 200 }}
              icon={<UserOutlined />}
            />
            <br />
            <br />
            <h3>CEO - MANAGER</h3>
          </Col>
          <Col lg={14} xs={24}>
            <h3>
              <b>Bienvenido</b>
            </h3>
            <h1 style={{ textTransform: "uppercase" }}>Alberto Barraza</h1>
          </Col>
        </Row>
        <br />
        <br />
        <Row gutter={50}>
          <Col md={6} sm={24}>
            <Card
              bordered={false}
              hoverable
              className={styles.dashboardInfoCard}
            >
              <h4>
                Últimos
                <br /> ingresos
              </h4>
              <img src={report1} />
            </Card>
          </Col>
          <Col md={6} sm={24}>
            <Card
              bordered={false}
              hoverable
              className={styles.dashboardInfoCard}
            >
              <h4>
                Movimientos
                <br /> de stock
              </h4>
              <img src={report2} />
            </Card>
          </Col>
          <Col md={6} sm={24}>
            <Card
              bordered={false}
              hoverable
              className={styles.dashboardInfoCard}
            >
              <h4>Productos </h4>
              <img src={report3} />
            </Card>
          </Col>
          <Col md={6} sm={24}>
            <Card
              bordered={false}
              hoverable
              className={styles.dashboardInfoCard}
            >
              <h4>Inventario</h4>
              <img src={report4} />
            </Card>
          </Col>
        </Row>
      </Content>
    </AppLayout>
  );
};
