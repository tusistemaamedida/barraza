import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Col,
  Drawer,
  Dropdown,
  Layout,
  List,
  Menu,
  Row,
  Tag,
} from "antd";
import {
  BackwardOutlined,
  DeleteOutlined,
  DownOutlined,
  EyeOutlined,
  SisternodeOutlined,
} from "@ant-design/icons";

import styles from "../app.module.css";
import AppLayout from "../../../layouts/app/app";
import PREPARATIONSMOCK from "../../../MOCKDATA/PREPARATIONS.json";
import { Link } from "react-router-dom";

const { Header, Content } = Layout;

export default () => {
  return (
    <AppLayout>
      <Header className={styles.navTop}>
        <div className={styles.titleNav}>ÓRDENES EN PREPARACIÓN</div>
      </Header>
      <Content className={styles.content}>
        <List
          /* loading={{
            indicator: <LoadingOutlined type='loading' />,
          }} */
          dataSource={PREPARATIONSMOCK}
          renderItem={(item) => (
            <List.Item>
              <Row align='middle' style={{ width: "100%" }}>
                <Col span={8}>
                  {" "}
                  <span style={{ fontSize: "18px" }}>
                    Preparación nro. {item.id}
                  </span>
                  <br />
                  <span className='text-muted'>
                    Iniciada el {item.updateAt}
                  </span>
                </Col>
                <Col span={6}>
                  {" "}
                  <Tag color={item.status === "INCOMPLETE" ? "red" : "green"}>
                    {item.status === "INCOMPLETE" ? "Incompleta" : "Completa"}
                  </Tag>
                </Col>
                <Col span={8}> Actualizado el {item.updateAt}</Col>
                <Col span={2}>
                  <Dropdown
                    overlay={
                      <Menu>
                        <Menu.Item key='1' icon={<EyeOutlined />}>
                          Ver pedido
                        </Menu.Item>

                        <Menu.Item key='2' icon={<SisternodeOutlined />}>
                          <Link to={`/preparations/scanner/${item.order}`}>
                            Escanear productos{" "}
                          </Link>
                        </Menu.Item>
                      </Menu>
                    }
                  >
                    <Button>
                      Acción <DownOutlined />
                    </Button>
                  </Dropdown>
                </Col>
              </Row>
            </List.Item>
          )}
        />
      </Content>
    </AppLayout>
  );
};
