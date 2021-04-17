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
  DeleteOutlined,
  DownOutlined,
  DropboxOutlined,
  EyeOutlined,
  SisternodeOutlined,
} from "@ant-design/icons";

import styles from "../app.module.css";
import AppLayout from "../../../layouts/app/app";
import CreateNewOrder from "./drawers/new-order";
import ConfirmSelection from "./drawers/selection-confirm";
import DespachForm from "./drawers/despach";
import ORDERSMOCK from "../../../MOCKDATA/ORDERS.json";
import { Link } from "react-router-dom";

const { Header, Content } = Layout;

export default () => {
  const [drawerOrder, setDrawerOrder] = useState(false);
  const [ordersSelected, setOrdersSelected] = useState([]);
  const [drawerSelection, setDrawerSelection] = useState(false);
  const [drawerDistpach, setDrawerDistpach] = useState(false);

  return (
    <AppLayout>
      <Header className={styles.navTop}>
        <div className={styles.titleNav}>ÓRDENES</div>
      </Header>
      <Content className={styles.content}>
        <div className={styles.navAction}>
          <div className={styles.actionButtonsNav}>
            <Button
              style={{ float: "right" }}
              type='primary'
              onClick={() => setDrawerOrder(true)}
            >
              Nuevo
            </Button>
            <Button
              style={{ float: "right", marginRight: "20px" }}
              type='primary'
              disabled={!ordersSelected.length}
              onClick={() => setDrawerSelection(true)}
            >
              Preparar selección
            </Button>
          </div>
        </div>
        <Checkbox.Group
          onChange={(selection) => setOrdersSelected(selection)}
          style={{ width: "100%" }}
        >
          <List
            /* loading={{
            indicator: <LoadingOutlined type='loading' />,
          }} */
            dataSource={ORDERSMOCK}
            renderItem={(item) => (
              <List.Item>
                <Row align='middle' style={{ width: "100%" }}>
                  <Col span={1}>
                    <Checkbox value={item.id} />
                  </Col>
                  <Col span={7}>
                    {" "}
                    <span style={{ fontSize: "18px" }}>
                      Pedido nro. {item.id}
                    </span>
                    <br />
                    <span>
                      Para <b>{item.client}</b>
                    </span>
                    <br />
                    <span className='text-muted'>
                      Actualizado el {item.updateAt}
                    </span>
                  </Col>
                  <Col span={6}>
                    {" "}
                    <Tag color='green'>Solicitud enviada</Tag>
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
                            <Link to={`orders/armed/${item.id}`}>
                              Pasar a armado
                            </Link>
                          </Menu.Item>
                          <Menu.Item
                            onClick={() => setDrawerDistpach(true)}
                            key='4'
                            icon={<DropboxOutlined />}
                          >
                            Despachar
                          </Menu.Item>
                          <Menu.Item key='3' icon={<DeleteOutlined />}>
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
              </List.Item>
            )}
          />
        </Checkbox.Group>
        <Drawer
          visible={drawerOrder}
          onClose={() => setDrawerOrder(false)}
          className={styles.drawer}
          destroyOnClose
        >
          <CreateNewOrder onClose={() => setDrawerOrder(false)} />
        </Drawer>
        <Drawer
          visible={drawerSelection}
          onClose={() => setDrawerSelection(false)}
          className={styles.drawer}
          destroyOnClose
          footer={
            <Row gutter={20}>
              <Col md={15} sm={24}>
                <Link to='/preparations'>
                  <Button block type='primary'>
                    Preparar
                  </Button>
                </Link>
              </Col>
              <Col md={9} sm={24}>
                {" "}
                <Button block type='success'>
                  Cancelar
                </Button>
              </Col>
            </Row>
          }
        >
          <ConfirmSelection
            onClose={() => setDrawerSelection(false)}
            selection={ordersSelected}
          />
        </Drawer>
        <Drawer
          visible={drawerDistpach}
          onClose={() => setDrawerDistpach(false)}
          className={styles.drawer}
          destroyOnClose
        >
          <DespachForm onClose={() => setDrawerDistpach(false)} />
        </Drawer>
      </Content>
    </AppLayout>
  );
};
