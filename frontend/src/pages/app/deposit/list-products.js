import { LoadingOutlined } from "@ant-design/icons";
import { Col, Divider, List, Row, Tag, PageHeader, Descriptions } from "antd";
import React from "react";
import { useQuery } from "react-query";
import { requestParser } from "../../../utils";
import ItemListDeposit from "../preparations/classes/ItemListPreparation.class";

export default ({ id }) => {
  const responseDepositDetails = useQuery(
    "depositDetails",
    requestParser("GET", `http://localhost:3100/v1/deposits/${id}`),
    { refetchOnWindowFocus: true }
  );

  return (
    <>
      <HeaderDetailDeposit responseDepositDetails={responseDepositDetails} />
      {/*   <ListProducts responsePreparation={responsePreparation} /> */}
    </>
  );
};

const HeaderDetailDeposit = (props) => {
  const { responseDepositDetails } = props;

  return (
    <>
      {responseDepositDetails.isSuccess && (
        <>
          <Descriptions bordered size='small'>
            <Descriptions.Item label='Detalle' span={4}>
              {responseDepositDetails.data.body.title}
            </Descriptions.Item>
            <Descriptions.Item label='Descripción' span={4}>
              {responseDepositDetails.data.body.description}
            </Descriptions.Item>
            <Descriptions.Item label='Pallet' span={2}>
              {responseDepositDetails.data.body.code}
            </Descriptions.Item>
            <Descriptions.Item label='Calle' span={2}>
              {responseDepositDetails.data.body.street}
            </Descriptions.Item>
            <Descriptions.Item label='Columna' span={2}>
              {responseDepositDetails.data.body.column}
            </Descriptions.Item>
            <Descriptions.Item label='Posición' span={2}>
              {responseDepositDetails.data.body.position}
            </Descriptions.Item>
          </Descriptions>
          {/*  <Descriptions bordered size='small'></Descriptions>
          <Descriptions bordered span={4}>
            <Descriptions.Item label='Actualizado'>
              {responseDepositDetails.data.body.title}
            </Descriptions.Item>
            <Descriptions.Item label='Actualizado'>
              {responseDepositDetails.data.body.title}
            </Descriptions.Item>
            <Descriptions.Item label='Actualizado'>
              {responseDepositDetails.data.body.title}
            </Descriptions.Item>

            <Descriptions.Item label='Cliente'>
              {responseDepositDetails.client}
            </Descriptions.Item>
            <Descriptions.Item>
              {" "}
              {responseDepositDetails.cuit}
            </Descriptions.Item>
          </Descriptions> */}
        </>
      )}
    </>
  );
};

const ListProducts = (props) => {
  const { responsePreparation } = props;
  return (
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
          <Col span={4} style={{ textAlign: "center" }}>
            Calle - Columna - Altura
          </Col>
          <Col span={6} style={{ textAlign: "center" }}>
            Estado
          </Col>
          <Divider />
        </Row>
      }
      loading={{
        spinning: responsePreparation.isLoading,
        indicator: <LoadingOutlined type='loading' />,
      }}
      dataSource={
        responsePreparation.isSuccess &&
        responsePreparation.data.body.length > 0
          ? responsePreparation.data.body.map((rp) => new ItemListDeposit(rp))
          : []
      }
      renderItem={(item) => (
        <List.Item>
          <Row align='middle' style={{ width: "100%" }}>
            <Col span={6}>
              <span style={{ fontSize: "18px" }}>{item.nombre}</span>
              <br />
              <span className='text-muted'>Código: {item.CobBarraArt_Int}</span>
            </Col>
            <Col span={4} style={{ textAlign: "center" }}>
              {item.CobBarraCaja_Int}
            </Col>
            <Col span={4} style={{ textAlign: "center" }}>
              {item.pallet}
            </Col>
            <Col span={4} style={{ textAlign: "center" }}>
              {item.street} - {item.column} - {item.position}
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
  );
};
