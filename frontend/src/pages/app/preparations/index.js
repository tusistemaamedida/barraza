import React, { useState } from "react";
import {
  Button,
  Col,
  Drawer,
  Dropdown,
  Layout,
  List,
  Menu,
  Row,
  Tag,
  PageHeader,
} from "antd";
import {
  DownOutlined,
  EyeOutlined,
  LoadingOutlined,
  SisternodeOutlined,
} from "@ant-design/icons";

import styles from "../app.module.css";
import AppLayout from "../../../layouts/app/app";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { requestParser } from "../../../utils";
import PreparationsList from "./classes/Preparations.class";
import ListProducts from "./list-products";

const { Header, Content } = Layout;

export default () => {
  const responsePreparations = useQuery(
    "preparations",
    requestParser("GET", "http://localhost:3100/v1/preparations")
  );
  return <ListPreparationsPage responsePreparations={responsePreparations} />;
};

const ListPreparationsPage = (props) => {
  const [drawerDetails, setDrawerDetails] = useState(false);
  const [preparationSelected, setPreparationSelected] = useState(null);
  const { responsePreparations } = props;
  return (
    <AppLayout>
      <Header className={styles.navTop}>
        <div className={styles.titleNav}>ÓRDENES EN PREPARACIÓN</div>
      </Header>
      <Content className={styles.content}>
        <List
          loading={{
            spinning: responsePreparations.isLoading,
            indicator: <LoadingOutlined type='loading' />,
          }}
          dataSource={
            responsePreparations.isSuccess &&
            responsePreparations.data.body.length > 0
              ? responsePreparations.data.body.map(
                  (o) => new PreparationsList(o)
                )
              : []
          }
          renderItem={(item) => (
            <List.Item>
              <Row align='middle' style={{ width: "100%" }}>
                <Col span={8}>
                  {" "}
                  <span style={{ fontSize: "18px" }}>
                    Preparación nro. {item.id}
                  </span>
                  <br />
                  <span className='text-muted'>Creada el {item.createdAt}</span>
                </Col>
                <Col span={6}>
                  {" "}
                  <Tag color={item.handleStatus.background}>
                    {item.handleStatus.label}
                  </Tag>
                </Col>
                <Col span={8}>
                  {" "}
                  {console.log(item.orders)}
                  {item.orders.map((o) => (
                    <>
                      {o.toUpperCase()}
                      <br />
                    </>
                  ))}
                </Col>
                <Col span={2}>
                  <Dropdown
                    overlay={
                      <Menu>
                        <Menu.Item
                          key='1'
                          icon={<EyeOutlined />}
                          onClick={() => {
                            setPreparationSelected(item._id);
                            setDrawerDetails(true);
                          }}
                        >
                          Ver detalle
                        </Menu.Item>
                        {item.status === "PENDING" && (
                          <Menu.Item key='2' icon={<SisternodeOutlined />}>
                            <Link to={`/preparations/scanner/${item._id}`}>
                              Escanear productos{" "}
                            </Link>
                          </Menu.Item>
                        )}
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
      <Drawer
        visible={drawerDetails}
        onClose={() => setDrawerDetails(false)}
        destroyOnClose
      >
        <ListProducts id={preparationSelected} />
      </Drawer>
    </AppLayout>
  );
};
