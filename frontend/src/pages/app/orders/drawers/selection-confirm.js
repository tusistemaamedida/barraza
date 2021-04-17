import { Col, Divider, List, PageHeader, Row, Tag } from "antd";
import React from "react";

export default ({ selection }) => {
  return (
    <>
      <PageHeader progressDot title='Desea enviar a preparar estos pedidos?' />
      <h4>Una vez que confirmes debes terminarlo para cerrar</h4>
      <p>Los pedidos a confirmar son: </p>
      <Divider />
      {selection.map((s) => (
        <Row>
          <Col span={16}>{s}</Col>
          <Col span={8}>
            {" "}
            <Tag color='blue'>En preparación</Tag>
          </Col>
          <Divider />
        </Row>
      ))}
    </>
  );
};
