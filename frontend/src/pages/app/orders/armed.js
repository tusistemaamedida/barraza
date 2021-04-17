import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Divider,
  Drawer,
  Dropdown,
  Input,
  Layout,
  List,
  Menu,
  Modal,
  Result,
  Row,
  Select,
  Tag,
} from "antd";
import {
  BackwardFilled,
  BarcodeOutlined,
  DeleteOutlined,
  DownOutlined,
  EyeOutlined,
  LeftCircleFilled,
  SisternodeOutlined,
} from "@ant-design/icons";

import styles from "../app.module.css";
import AppLayout from "../../../layouts/app/app";
import PRODUCSSCANNER from "../../../MOCKDATA/PRODUCSSCANNER.json";
import ORDER from "../../../MOCKDATA/ORDER.json";
import { Link, useParams } from "react-router-dom";
import Search from "antd/lib/input/Search";

const { Header, Content } = Layout;

const children = [];

export default () => {
  const { id } = useParams();
  const [modalSuccess, setModalSuccess] = useState(false);
  const codebarRef = useRef(null);
  const [products, setProducts] = useState(PRODUCSSCANNER);

  useEffect(() => {
    if (codebarRef) {
      codebarRef.current.focus({
        cursor: "start",
        preventScroll: true,
      });
    }
  }, []);

  useEffect(() => {
    if (modalSuccess) {
      let auxProducts = products.map((p) => {
        return { ...p, scanning: true };
      });

      setProducts(auxProducts);

      setTimeout(() => {
        setModalSuccess(false);
      }, 3000);
    }
  }, [modalSuccess]);

  return (
    <AppLayout>
      <Header className={styles.navTop}>
        <Link to='/preparations' style={{ float: "left" }}>
          <LeftCircleFilled /> Volver
        </Link>
        <div className={styles.titleNav}>
          SCANEO DE PEDIDO: {"1".padStart(3, "0")} - {id.padStart(8, "0")}
        </div>
      </Header>
      <Content className={styles.content}>
        <Row gutter={[50, 30]}>
          <Col md={12}>
            <Select
              mode='tags'
              size='large'
              placeholder='Escanee el pallet'
              defaultValue={["300003000"]}
              style={{ width: "100%" }}
            >
              {children}
            </Select>
            <br />
            <br />
            <Search
              ref={codebarRef}
              placeholder='Ingrese el código del producto'
              enterButton='Agregar'
              size='large'
              suffix={<BarcodeOutlined />}
              onSearch={() => setModalSuccess(true)}
            />
          </Col>
          <Col md={12}>
            <Button style={{ float: "right" }} type='primary'>
              Guardar
            </Button>
          </Col>
        </Row>

        <br />
        <Row gutter={30}>
          <Col md={12}>
            <List
              dataSource={ORDER.map((o) => o.products)}
              renderItem={(item) => (
                <>
                  {item.map((p) => (
                    <Card>
                      <List.Item>
                        <Row align='middle' style={{ width: "100%" }}>
                          <Col span={12}>
                            <span style={{ fontSize: "18px" }}>{p.name}</span>
                            <br />
                            <span className='text-muted'>
                              Código: {p.productCode}
                            </span>
                          </Col>

                          <Col span={6} className={styles.countScanning}>
                            <Tag color='#217cbd'>{p.quantity}</Tag>
                          </Col>
                          <Col span={6} className={styles.countScanning}>
                            <Tag color='#87d068'>{p.scanning}</Tag>
                          </Col>
                        </Row>
                      </List.Item>
                    </Card>
                  ))}
                </>
              )}
            />
          </Col>
          <Col md={12}>
            <List
              header={
                <Row justify='center' align='middle' style={{ width: "100%" }}>
                  <Col span={12}>Producto</Col>

                  <Col span={10} style={{ textAlign: "center" }}>
                    Pallet
                  </Col>
                  <Col span={2} style={{ textAlign: "center" }}></Col>

                  <Divider />
                </Row>
              } /* loading={{
            indicator: <LoadingOutlined type='loading' />,
          }} */
              dataSource={products}
              renderItem={(item) => (
                <List.Item>
                  <Row align='middle' style={{ width: "100%" }}>
                    <Col span={12}>
                      <span style={{ fontSize: "18px" }}>{item.name}</span>
                      <br />
                      <span className='text-muted'>
                        Código: {item.productCode}
                      </span>
                    </Col>

                    <Col span={10} style={{ textAlign: "center" }}>
                      {item.palletCode}
                    </Col>
                    <Col span={2} style={{ textAlign: "center" }}>
                      <Button
                        shape='round'
                        type='link'
                        icon={<DeleteOutlined style={{ color: "red" }} />}
                      />
                    </Col>
                  </Row>
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </Content>
    </AppLayout>
  );
};
