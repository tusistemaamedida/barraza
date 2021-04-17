import React, { useEffect, useState } from "react";
import { Col, Divider, Input, List, Row } from "antd";

export default ({ order, setOrder, data, products }) => {
  const [loading, setLoading] = useState(false);

  const parseObjProducts = (obj) => {
    const result = Object.keys(obj)
      .map((id) => {
        if (obj[id] && obj[id] != 0) {
          let name = products.filter((p) => p.id == id);
          return {
            id,
            value: obj[id],
            name: name[0].name,
          };
        }
      })
      .filter((e) => typeof e !== "undefined");
    return result;
  };

  useEffect(() => {
    setLoading(true);
    let products = parseObjProducts(data);
    setOrder({
      ...order,
      products,
    });
    setLoading(false);
  }, []);

  return (
    <div style={{ marginTop: "20px" }}>
      <List.Item style={{ width: "100%" }}>
        <Row gutter={20} style={{ width: "100%" }}>
          <Col span={12}>Cliente</Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <p> {order.customer}</p>
          </Col>
        </Row>
      </List.Item>
      <Divider />
      <List
        loading={loading}
        dataSource={order.products}
        locale={{ emptyText: "No ingresaste ningún producto" }}
        renderItem={(item) => (
          <List.Item style={{ width: "100%" }}>
            <Row gutter={20} style={{ width: "100%" }}>
              <Col span={12}>{item.name}</Col>
              <Col span={12} style={{ textAlign: "right" }}>
                x {item.value}
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </div>
  );
};
