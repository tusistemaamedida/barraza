import {
  Button,
  Col,
  Form,
  Input,
  PageHeader,
  Row,
  Select,
  Switch,
} from "antd";
import React from "react";

export default ({ edit }) => {
  const [form] = Form.useForm();
  return (
    <>
      <PageHeader title={`${edit ? `Editar` : `Crear`} usuario`} />
      <Form form={form} layout='vertical' initialValues={{ rol: "Operativo" }}>
        <Form.Item label='Nombre completo' name='nombreCompleto'>
          <Input size='large' />
        </Form.Item>
        <Form.Item label='Documento' name='documento'>
          <Input size='large' />
        </Form.Item>
        <Form.Item label='Celular' name='celular'>
          <Input size='large' />
        </Form.Item>
        <Form.Item label='Dirección' name='direccion'>
          <Input size='large' />
        </Form.Item>
        <Form.Item label='Legajo' name='legajo'>
          <Input size='large' />
        </Form.Item>
        <Row gutter={20}>
          <Col md={16} sm={24}>
            <Form.Item label='Rol' name='rol'>
              <Select size='large'>
                <Select.Option value='Gerente'>Gerente</Select.Option>
                <Select.Option value='Administrativo'>
                  Administrativo
                </Select.Option>
                <Select.Option value='Encargado de cámara'>
                  Encargado de cámara
                </Select.Option>
                <Select.Option value='Operativo'>Operativo</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col md={8} sm={24}>
            <Form.Item label='Activo'>
              <Switch />
            </Form.Item>
          </Col>
        </Row>

        <Button type='primary'>{edit ? `Editar` : `Guardar`} usuario</Button>
      </Form>
    </>
  );
};
