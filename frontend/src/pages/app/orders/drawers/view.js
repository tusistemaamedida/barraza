import { Badge, Descriptions, Divider, PageHeader, Tag } from "antd";
import React from "react";

export default ({ orderViewSelected }) => {
  return (
    <>
      <PageHeader title='Detalle del pedido' />
      <Descriptions bordered>
        <Descriptions.Item label='Nro.' span={4}>
          {orderViewSelected.number}
        </Descriptions.Item>
        <Descriptions.Item label='Estado' span={4}>
          <Tag color={orderViewSelected.handleStatus.background}>
            {orderViewSelected.handleStatus.label}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label='Creado' span={4}>
          {orderViewSelected.created_at}
        </Descriptions.Item>
        <Descriptions.Item label='Actualizado' span={4}>
          {orderViewSelected.updated_at}
        </Descriptions.Item>

        <Descriptions.Item label='Cliente' span={2}>
          {orderViewSelected.client}
        </Descriptions.Item>
        <Descriptions.Item span={2}>
          {" "}
          {orderViewSelected.cuit}
        </Descriptions.Item>

        <Descriptions.Item label='Productos'>
          {orderViewSelected.products.map((p) => (
            <>
              {p.name} x {p.quantity} unidades
              <br />
            </>
          ))}
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};
