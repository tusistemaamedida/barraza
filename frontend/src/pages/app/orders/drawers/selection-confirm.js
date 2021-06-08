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
          {console.log(s.number)}
          <Col span={16}>{s.number}</Col>
          <Col span={8}>
            {" "}
            <Tag color='blue'>Enviar a preparación</Tag>
          </Col>
          <Divider />
        </Row>
      ))}
    </>
  );
};
