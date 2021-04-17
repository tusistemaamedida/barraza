import React, { useEffect, useRef, useState } from "react";
import {
  Button,
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
import { Link, useParams } from "react-router-dom";
import Search from "antd/lib/input/Search";

const { Header, Content } = Layout;

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
        <Row>
          <Col md={12}></Col>
          <Col md={12}>
            <Search
              ref={codebarRef}
              placeholder='Ingrese el cóidog de barras'
              enterButton='Agregar'
              size='large'
              suffix={<BarcodeOutlined />}
              onSearch={() => setModalSuccess(true)}
            />
          </Col>
        </Row>

        <br />

        <List
          header={
            <Row justify='center' align='middle' style={{ width: "100%" }}>
              <Col span={6}>Producto</Col>
              <Col span={4} style={{ textAlign: "center" }}>
                Caja
              </Col>
              <Col span={4} style={{ textAlign: "center" }}>
                Pallet
              </Col>
              <Col span={2} style={{ textAlign: "center" }}>
                Calle
              </Col>{" "}
              <Col span={2} style={{ textAlign: "center" }}>
                Columna
              </Col>
              <Col span={6} style={{ textAlign: "center" }}>
                Estado
              </Col>
              <Divider />
            </Row>
          } /* loading={{
            indicator: <LoadingOutlined type='loading' />,
          }} */
          dataSource={products}
          renderItem={(item) => (
            <List.Item>
              <Row align='middle' style={{ width: "100%" }}>
                <Col span={6}>
                  <span style={{ fontSize: "18px" }}>{item.name}</span>
                  <br />
                  <span className='text-muted'>Código: {item.productCode}</span>
                </Col>
                <Col span={4} style={{ textAlign: "center" }}>
                  {item.boxCode}
                </Col>
                <Col span={4} style={{ textAlign: "center" }}>
                  {item.palletCode}
                </Col>
                <Col span={2} style={{ textAlign: "center" }}>
                  1
                </Col>
                <Col span={2} style={{ textAlign: "center" }}>
                  B
                </Col>
                <Col span={6} style={{ textAlign: "center" }}>
                  <Tag color={!item.scanning ? "red" : "green"}>
                    {!item.scanning ? "Pendiente" : "Escaneado"}
                  </Tag>
                </Col>
              </Row>
            </List.Item>
          )}
        />
      </Content>
      <Modal visible={modalSuccess} footer={[]}>
        <Result
          status='success'
          title='Producto 5021344304 fue escaneado con éxito'
          subTitle='Pallet número: 2017182818828182881'
        />
      </Modal>
    </AppLayout>
  );
};
