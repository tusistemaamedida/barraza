import React, { useState } from "react";
import {
  Avatar,
  Button,
  Col,
  Divider,
  Drawer,
  Dropdown,
  Layout,
  List,
  Menu,
  Row,
  Tabs,
  Tag,
} from "antd";
import {
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  LoadingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useQuery } from "react-query";

import styles from "../app.module.css";
import AppLayout from "../../../layouts/app/app";
import { requestParser } from "../../../utils";
import ProductForm from "./drawers/productForm";

const { Header, Footer, Sider, Content } = Layout;
const { TabPane } = Tabs;
export default (params) => {
  const [drawenUser, setDrawenUser] = useState(false);
  const { data, isLoading, error } = useQuery(
    "users",
    requestParser("GET", "https://jsonplaceholder.typicode.com/users")
  );

  return (
    <AppLayout>
      <Header className={styles.navTop}>
        <div className={styles.titleNav}>PRODUCTOS</div>
      </Header>
      <Content className={styles.content}>
        <Tabs defaultActiveKey='1' type='line' size='large'>
          <TabPane tab='Productos' key='1'>
            Productos
          </TabPane>
          <TabPane tab='Establecimientos' key='2'>
            Establecimientos
          </TabPane>
          <TabPane tab='Envasados' key='3'>
            Envasados
          </TabPane>
        </Tabs>
        {/* <div className={styles.navAction}>
          <div className={styles.actionButtonsNav}>
            <Button
              onClick={() => setDrawenUser(true)}
              style={{ float: "right" }}
              type='primary'
            >
              Nuevo
            </Button>
          </div>
        </div>

        <List
          loading={{
            spinning: isLoading,
            indicator: <LoadingOutlined type='loading' />,
          }}
          loa
          data={data}
          header={
            <>
              <List.Item style={{ padding: "10px 20px" }}>
                <Row style={{ width: "100%" }} gutter={20}>
                  <Col span={24}>
                    <Row className={styles.headerTable}>
                      <Col md={2} xs={24} sm={24}></Col>
                      <Col md={6} xs={24} sm={24}>
                        Código
                      </Col>
                      <Col md={5} xs={24} sm={24}>
                        Descripción
                      </Col>
                      <Col md={5} xs={24} sm={24}>
                        Cod. artículo GS1
                      </Col>
                      <Col md={4} xs={24} sm={24}>
                        Cod. caja GS1
                      </Col>
                      <Col md={2} xs={24} sm={24}></Col>
                    </Row>
                  </Col>
                </Row>
              </List.Item>
              <Divider />
            </>
          }
          dataSource={data}
          renderItem={(item) => (
            <List.Item style={{ padding: "10px 20px" }}>
              <Row style={{ width: "100%" }} gutter={20}>
                <Col span={24}>
                  <Row align='middle'>
                    <Col md={2} xs={24} sm={24}>
                      <Avatar
                        icon={<UserOutlined />}
                        style={{ backgroundColor: "#001529" }}
                      />
                    </Col>
                    <Col md={6} xs={24} sm={24}>
                      {item.name}
                    </Col>
                    <Col md={5} xs={24} sm={24}>
                      {item.phone}
                    </Col>
                    <Col md={5} xs={24} sm={24}>
                      Empleado
                    </Col>
                    <Col md={4} xs={24} sm={24}>
                      <Tag color='#2db7f5'>ACTIVO</Tag>
                    </Col>
                    <Col md={2} xs={24} sm={24}>
                      <Dropdown
                        overlay={
                          <Menu>
                            <Menu.Item key='1' icon={<EditOutlined />}>
                              Editar
                            </Menu.Item>
                            <Menu.Item key='1' icon={<DeleteOutlined />}>
                              Eliminar
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
                </Col>
              </Row>
            </List.Item>
          )}
        /> */}
      </Content>
      <Drawer
        visible={drawenUser}
        onClose={() => setDrawenUser(false)}
        className={styles.drawer}
      >
        <ProductForm edit={false} />
      </Drawer>
    </AppLayout>
  );
};
