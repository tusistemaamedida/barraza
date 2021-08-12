import { LoadingOutlined } from "@ant-design/icons";
import { Col, List, Row, Tag } from "antd";
import React from "react";
import { useQuery } from "react-query";

import { requestParser } from "../../../utils";
import ItemListPreparation from "./classes/ItemListPreparation.class";

export default ({ id }) => {
  const responsePreparation = useQuery(
    "preparationsListProducts",
    requestParser("GET", `http://localhost:3100/v1/preparations/${id}`),
    { refetchOnWindowFocus: true }
  );

  return (
    <>
      <ListProducts responsePreparation={responsePreparation} />
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
        </Row>
      }
      loading={{
        spinning: responsePreparation.isLoading,
        indicator: <LoadingOutlined type='loading' />,
      }}
      dataSource={
        responsePreparation.isSuccess &&
        responsePreparation.data.body.length > 0
          ? responsePreparation.data.body.map(
              (rp) => new ItemListPreparation(rp)
            )
          : []
      }
      renderItem={(item) => (
        <List.Item>
          <Row align='middle' style={{ width: "100%" }}>
            <Col span={6}>
              <span style={{ fontSize: "14px" }}>{item.nombre}</span>
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
            {console.log(item)}
            <Col span={6} style={{ textAlign: "center" }}>
              <Tag color={!item.scan_preparation ? "red" : "green"}>
                {!item.scan_preparation ? "Pendiente" : "Escaneado"}
              </Tag>
            </Col>
          </Row>
        </List.Item>
      )}
    />
  );
};
