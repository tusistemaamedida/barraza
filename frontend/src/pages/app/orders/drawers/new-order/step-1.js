import React from "react";
import { Col, Divider, Form, Input, InputNumber, Row } from "antd";
import { UserOutlined } from "@ant-design/icons";

export default ({ form, products, setOrder, order }) => {
  return (
    <div style={{ marginTop: "30px" }}>
      <Input
        prefix={<UserOutlined />}
        style={{ margin: "10px" }}
        placeholder='Ingrese un destinatario'
        onChange={(e) => setOrder({ ...order, customer: e.target.value })}
        required
      />
      <Divider />
      <Form form={form}>
        <Row gutter={10}>
          {products.map((p) => (
            <>
              <Col span={18}>{p.name}</Col>

              <Col span={6}>
                <Form.Item name={p.id}>
                  <InputNumber min={0} />
                </Form.Item>
              </Col>
            </>
          ))}
        </Row>
      </Form>
    </div>
  );
};
