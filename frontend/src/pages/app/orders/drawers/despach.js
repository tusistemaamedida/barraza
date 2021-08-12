import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  List,
  PageHeader,
  Row,
  Tag,
} from "antd";
import React from "react";

export default ({ onClose, selection }) => {
  const [form] = Form.useForm();
  /*   const responseOrders = useQuery(
    "orders",
    requestParser("GET", "http://localhost:3100/v1/orders")
  ); */

  const despachFormProps = { onClose, selection, form };
  return <DespachForm {...despachFormProps} />;
};

const DespachForm = (props) => {
  const { onClose, form, selection } = props;

  return (
    <>
      <PageHeader progressDot title='Información de despacho' />
      <Form form={form} layout='vertical'>
        <Form.Item label='Pallets asociados'>
          <Tag color='green'>3000330</Tag>
        </Form.Item>
        <Form.Item label='Órdenes asociadas'>
          {console.log(selection)}
          {selection.map((s) => (
            <Tag color='#108ee9'>{s.number}</Tag>
          ))}
        </Form.Item>
        <Form.Item label='Nombre completo del chofer' name='nombreChofer'>
          <Input size='large' />
        </Form.Item>
        <Form.Item label='Documento del chofer' name='dniChofer'>
          <Input size='large' />
        </Form.Item>
        <Form.Item label='Dominio del camión' name='dominio'>
          <Input size='large' />
        </Form.Item>
        <Form.Item label='Semis del camión' name='semis'>
          <Input size='large' />
        </Form.Item>
        <Row gutter={20}>
          <Col md={12} sm={24}>
            <Form.Item label='Tara' name='tara'>
              <Input size='large' />
            </Form.Item>
          </Col>
          <Col md={12} sm={24}>
            <Form.Item label='Neto' name='neto'>
              <Input size='large' />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={20}>
          <Col md={12} sm={24}>
            <Button type='primary'> Despachar pedido</Button>
          </Col>
          <Col md={12} sm={24}>
            <Button block onClick={() => onClose()} type='link'>
              Cancelar
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};
