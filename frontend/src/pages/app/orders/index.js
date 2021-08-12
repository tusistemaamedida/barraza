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
  LoadingOutlined,
  SisternodeOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

import styles from "../app.module.css";
import AppLayout from "../../../layouts/app/app";
import ViewOrder from "./drawers/view";
import ConfirmSelection from "./drawers/selection-confirm";
import DespachForm from "./drawers/despach";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { requestParser } from "../../../utils";
import OrdersList from "./Orders.class";

const { Header, Content } = Layout;

export default () => {
  const [ordersSelected, setOrdersSelected] = useState([]);
  const [ordersDespachSelected, setOrdersDespachSelected] = useState([]);
  const queryClient = useQueryClient();

  const responseOrders = useQuery(
    "orders",
    requestParser("GET", "http://localhost:3100/v1/orders")
  );

  const updateProduct = useMutation(
    async (values) => {
      await requestParser(
        "PUT",
        `http://localhost:3100/V1/orders/sendToPreparation`,
        values
      );
    },
    {
      onSuccess() {
        queryClient.invalidateQueries("orders");
      },
    }
  );

  const sendToPreparations = () => {
    updateProduct.mutate({
      orders: ordersSelected.map((o) => o._id),
      status: "EN PREPARACION",
    });
  };

  const propsOrderPage = {
    ordersDespachSelected,
    setOrdersDespachSelected,
    responseOrders,
    sendToPreparations,
    ordersSelected,
    setOrdersSelected,
  };
  return <OrdersPage {...propsOrderPage} />;
};

const OrdersPage = (props) => {
  const {
    responseOrders,
    sendToPreparations,
    ordersSelected,
    setOrdersSelected,
    ordersDespachSelected,
    setOrdersDespachSelected,
  } = props;

  const [drawerOrder, setDrawerOrder] = useState(false);
  const [orderViewSelected, setOrderViewSelected] = useState(null);
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
            <Link to='/preparations'>
              <Button style={{ float: "right" }} type='primary'>
                Listado
              </Button>
            </Link>

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
          onChange={(selection) => {
            //busco todas las ordenes de la seleeción
            let arrayArmed = [],
              arrayPrepared = [];

            let ordersSelecteds = selection.map((s) =>
              responseOrders.data.body.find((o) => o._id === s)
            );
            //las mapeo, si son PREPARED las mando a un array, SI SON ARMED las mando al array de despacho

            ordersSelecteds.map((os) => {
              switch (os.status) {
                case "SOLICITADO":
                  arrayPrepared = [...arrayPrepared, os];
                  break;
                case "ARMED":
                  arrayArmed = [...arrayArmed, os];
                  break;

                default:
                  break;
              }
            });
            setOrdersDespachSelected(arrayArmed);
            setOrdersSelected(arrayPrepared);
          }}
          style={{ width: "100%" }}
        >
          <List
            loading={{
              spinning: responseOrders.isLoading,
              indicator: <LoadingOutlined type='loading' />,
            }}
            dataSource={
              responseOrders.isSuccess && responseOrders.data.body.length > 0
                ? responseOrders.data.body.map((o) => new OrdersList(o))
                : []
            }
            renderItem={(item) => (
              <List.Item>
                <Row align='middle' style={{ width: "100%" }}>
                  <Col span={1}>
                    <Checkbox
                      disabled={
                        item.status !== "SOLICITADO" && item.status !== "ARMED"
                      }
                      value={item._id}
                    />
                  </Col>
                  <Col span={7}>
                    {" "}
                    <span style={{ fontSize: "18px" }}>
                      Pedido nro. {item.number}
                    </span>
                    <br />
                    <span>
                      Para <b>{item.client}</b>
                    </span>
                    <br />
                    <span className='text-muted'>
                      Creado el {item.created_at}
                    </span>
                  </Col>
                  <Col span={6}>
                    <Tag color={item.handleStatus.background}>
                      {item.handleStatus.label}
                    </Tag>
                  </Col>
                  <Col span={8}> Actualizado el {item.updated_at}</Col>
                  <Col span={2}>
                    <Dropdown
                      overlay={
                        <Menu>
                          <Menu.Item
                            key='1'
                            icon={<EyeOutlined />}
                            onClick={() => {
                              setOrderViewSelected(item);
                              setDrawerOrder(true);
                            }}
                          >
                            Ver pedido
                          </Menu.Item>
                          {item.status == "PREPARED" && (
                            <Menu.Item key='2' icon={<SisternodeOutlined />}>
                              <Link to={`orders/armed/${item._id}`}>
                                Pasar a armado
                              </Link>
                            </Menu.Item>
                          )}

                          <Menu.Item
                            onClick={() => setDrawerDistpach(true)}
                            key='4'
                            icon={<DropboxOutlined />}
                          >
                            Despachar
                          </Menu.Item>

                          {/*  <Menu.Item key='3' icon={<DeleteOutlined />}>
                            Eliminar
                          </Menu.Item> */}
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
          <ViewOrder
            orderViewSelected={orderViewSelected}
            onClose={() => setDrawerOrder(false)}
          />
        </Drawer>
        <Drawer
          visible={drawerSelection}
          onClose={() => setDrawerSelection(false)}
          className={styles.drawer}
          destroyOnClose
          footer={
            <Row gutter={20}>
              <Col md={15} sm={24}>
                <Button block type='primary' onClick={sendToPreparations}>
                  Preparar
                </Button>
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
          <DespachForm
            onClose={() => setDrawerDistpach(false)}
            selection={ordersDespachSelected}
          />
        </Drawer>
      </Content>
    </AppLayout>
  );
};
