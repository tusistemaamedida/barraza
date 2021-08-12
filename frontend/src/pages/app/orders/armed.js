import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  Col,
  Divider,
  Layout,
  List,
  Row,
  Select,
  Tag,
  Input,
  message,
  InputNumber,
  Alert,
} from "antd";
import {
  BarcodeOutlined,
  DeleteOutlined,
  LeftCircleFilled,
  LoadingOutlined,
} from "@ant-design/icons";

import styles from "../app.module.css";
import AppLayout from "../../../layouts/app/app";
import PRODUCSSCANNER from "../../../MOCKDATA/PRODUCSSCANNER.json";
import ORDER from "../../../MOCKDATA/ORDER.json";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { requestParser } from "../../../utils";
import ItemListPreparationClass from "../preparations/classes/ItemListPreparation.class";

const { Header, Content } = Layout;
const { Search } = Input;
const children = [];

export default () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [pallet, setPallet] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const responsePreparation = useQuery(
    "orderListProducts",
    requestParser(
      "GET",
      `http://localhost:3100/v1/orders/products-armeds&ids=${id}`
    ),
    { refetchOnWindowFocus: true }
  );

  const assingPalletDispatch = useMutation(
    async (values) => {
      await requestParser(
        "PUT",
        `http://localhost:3100/V1/orders/${id}/assing-pallet`,
        values
      );
    },
    {
      onSuccess() {
        queryClient.invalidateQueries("orderListProducts");
        queryClient.invalidateQueries("detailsOrderQuantities");
        message.success("Producto/s escaneados");
      },
      onError() {
        message.error("El producto no se encuentra en el pedido");
      },
    }
  );

  const responseDetailsOrderQuantities = useQuery(
    "detailsOrderQuantities",
    requestParser(
      "GET",
      `http://localhost:3100/v1/orders/${id}/products-armed-details/`
    ),
    { refetchOnWindowFocus: true }
  );

  const unassingPalletDispatch = useMutation(
    async (values) => {
      await requestParser(
        "PATCH",
        `http://localhost:3100/V1/orders/unassing-pallet`,
        values
      );
    },
    {
      onSuccess() {
        queryClient.invalidateQueries("orderListProducts");
        queryClient.invalidateQueries("detailsOrderQuantities");
        message.success("Producto eliminado");
      },
      onError() {
        message.error("El producto no se encuentra en el pedido");
      },
    }
  );

  const onSearch = (code) => {
    let messageError = false;
    if (!code) {
      messageError = "Ingrese un código de producto";
    }
    if (pallet.length === 0) {
      messageError = "Ingrese un nro. de pallet";
    }

    if (!quantity) {
      setQuantity(1);
    }
    console.log(messageError);
    if (messageError) {
      return message.error(messageError);
    }
    assingPalletDispatch.mutate({ code, quantity, pallet });
  };

  const onDeletePalletAssociated = (id) => {
    unassingPalletDispatch.mutate({ id });
  };

  useEffect(() => {
    ifArmed();
  });

  const ifArmed = () => {
    let armed = true;
    if (responseDetailsOrderQuantities?.data?.body) {
      responseDetailsOrderQuantities.data.body.map((oq) => {
        if (oq.total_unprepared > 0) {
          armed = false;
        }
      });
    }
    return armed;
  };

  const propsHeader = { pallet, setPallet, onSearch, setQuantity, ifArmed };
  const propsList = { responsePreparation, onDeletePalletAssociated };
  const propsScanned = { responseDetailsOrderQuantities };

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
        <HeaderProductsArmedPage {...propsHeader} />
        <br />
        <Row gutter={30}>
          <Col md={12}>
            <DetailsProductsScanned {...propsScanned} />
          </Col>
          <Col md={12}>
            <ListProductsArmed {...propsList} />
          </Col>
        </Row>
      </Content>
    </AppLayout>
  );
};

const HeaderProductsArmedPage = (propsHeader) => {
  const { pallet, setPallet, onSearch, setQuantity, ifArmed } = propsHeader;
  const codebarRef = useRef(null);

  useEffect(() => {
    if (codebarRef) {
      codebarRef.current.focus({
        cursor: "start",
        preventScroll: true,
      });
    }
  }, []);

  return (
    <Row gutter={[50, 30]}>
      <Col md={12}>
        <Select
          mode='tags'
          size='large'
          placeholder='Escanee el pallet'
          value={pallet}
          onSelect={(v) => {
            if (v.trim() !== "") {
              setPallet(v);
            }
          }}
          style={{ width: "100%" }}
        >
          {children}
        </Select>
        <br />
        <br />
        <Row gutter={10}>
          <Col span={6}>
            <InputNumber
              style={{ width: "100%" }}
              placeholder='Cant.'
              onChange={(v) => setQuantity(v)}
              size='large'
            />
          </Col>
          <Col span={18}>
            <Search
              ref={codebarRef}
              placeholder='Ingrese el código del producto'
              enterButton='Agregar'
              size='large'
              suffix={<BarcodeOutlined />}
              disabled={ifArmed()}
              onSearch={(value) => onSearch(value)}
            />
          </Col>
        </Row>
      </Col>
      <Col md={12}>
        {ifArmed() && (
          <Alert message='Armado de pedido completo' type='success' showIcon />
        )}
      </Col>
    </Row>
  );
};

const DetailsProductsScanned = (propsScanned) => {
  const {
    responseDetailsOrderQuantities: { status, data },
  } = propsScanned;

  return (
    <List
      loading={status && status === "loading"}
      dataSource={data ? data.body : []}
      renderItem={(item) => (
        <>
          <Card>
            <List.Item>
              <Row align='middle' style={{ width: "100%" }}>
                <Col span={12}>
                  <span style={{ fontSize: "18px" }}>{item.name}</span>
                  <br />
                  <span className='text-muted'>Código: {item.code}</span>
                </Col>

                <Col span={6} className={styles.countScanning}>
                  <Tag color='#ff4040'>{item.total_unprepared}</Tag>
                </Col>
                <Col span={6} className={styles.countScanning}>
                  <Tag color='#40a9ff'>{item.total_prepared}</Tag>
                </Col>
              </Row>
            </List.Item>
          </Card>
        </>
      )}
    />
  );
};

const ListProductsArmed = (propsList) => {
  const {
    responsePreparation: { status, data },
    onDeletePalletAssociated,
  } = propsList;
  console.log(data);
  return (
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
      }
      loading={{
        indicator: <LoadingOutlined type='loading' />,
        spinning: status === "loading",
      }}
      dataSource={
        data?.body.length > 0
          ? data.body.map((rp) => new ItemListPreparationClass(rp))
          : []
      }
      renderItem={(item) => (
        <List.Item>
          <Row align='middle' style={{ width: "100%" }}>
            <Col span={12}>
              <span style={{ fontSize: "18px" }}>{item.nombre}</span>
              <br />
              <span className='text-muted'>Código: {item.ID_Articulo}</span>
            </Col>

            <Col span={10} style={{ textAlign: "center" }}>
              {item.pallet_dispatch}
            </Col>
            <Col span={2} style={{ textAlign: "center" }}>
              {item.pallet_dispatch && (
                <Button
                  onClick={() => onDeletePalletAssociated(item._id)}
                  shape='round'
                  type='link'
                  icon={<DeleteOutlined style={{ color: "red" }} />}
                />
              )}
            </Col>
          </Row>
        </List.Item>
      )}
    />
  );
};
