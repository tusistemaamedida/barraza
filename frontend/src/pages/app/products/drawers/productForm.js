import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  PageHeader,
  Row,
  Select,
  Switch,
  Upload,
} from "antd";
import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";

const UploadInput = ({ state, setState }) => {
  const { fileList, uploading } = state;

  function toBase64(file) {
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      console.log(file);
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const props = {
    onRemove: (file) => {
      setState((state) => {
        return {
          fileList: [],
        };
      });
    },
    beforeUpload: async (file) => {
      /*  console.log(file.originFileObj);

      const fileBase64 = await toBase64(file.originFileObj); */
      setState((state) => ({
        fileList: [file],
      }));
      return false;
    },
    fileList,
  };

  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>Seleccione una imagen</Button>
    </Upload>
  );
};

export default ({ edit }) => {
  const [form] = Form.useForm();
  const [state, setState] = useState({
    fileList: [],
    uploading: false,
  });

  const onFinish = (params) => {
    const formData = new FormData();
    formData.append("files[]", state.fileList[0]);
    console.log(params, state.fileList[0]);
  };

  return (
    <>
      <PageHeader title={`${edit ? `Editar` : `Nuevo`} producto`} />
      <Form
        form={form}
        layout='vertical'
        onFinish={onFinish}
        initialValues={{ rol: "Operativo" }}
      >
        <Form.Item label='Imagen' name='image'>
          <UploadInput state={state} setState={setState} />
        </Form.Item>
        <Form.Item label='Código' name='code'>
          <Input size='large' />
        </Form.Item>
        <Form.Item label='Descripción' name='description'>
          <Input size='large' />
        </Form.Item>
        <Form.Item label='RNPA' name='rnpa'>
          <Input size='large' />
        </Form.Item>
        <Row gutter={20} align='middle'>
          <Col md={12} sm={24}>
            <Form.Item label='Insumo' name='supplie'>
              <Select size='large'>
                <Select.Option value='Gerente'>Leche</Select.Option>
                <Select.Option value='Administrativo'>Suero</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col md={12} sm={24}>
            <Form.Item label='Dia de vencimimento' name='expirationDay'>
              <Input size='large' />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={20} align='middle'>
          <Col md={12} sm={24}>
            <Form.Item label='' name='pieceLabel'>
              <Checkbox>Posee etiqueta por pieza</Checkbox>
            </Form.Item>
          </Col>
          <Col md={12} sm={24}>
            <Form.Item label='Etiq. por pieza' name='labelsPerPiece'>
              <Input size='large' />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20} align='middle'>
          <Col md={12} sm={24}>
            <Form.Item label='' name='boxLabel'>
              <Checkbox>Posee etiqueta por caja</Checkbox>
            </Form.Item>
          </Col>
          <Col md={12} sm={24}>
            <Form.Item label='Etiq. por caja' name='labelsPerBox'>
              <Input size='large' />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20} align='middle'>
          <Col md={12} sm={24}>
            <Form.Item label='' name='palletLabel'>
              <Checkbox>Posee etiqueta el pallet</Checkbox>
            </Form.Item>
          </Col>
          <Col md={6} sm={24}>
            <Form.Item label='Cajas por pellet' name='boxPerPallet'>
              <Input size='large' />
            </Form.Item>
          </Col>
          <Col md={6} sm={24}>
            <Form.Item label='Etiq. por pallet' name='labelsPerPallet'>
              <Input size='large' />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20} align='middle'>
          <Col md={12} sm={24}>
            <Form.Item
              label='Codigo barra artículo GS1'
              name='barcodeArticleGS1'
            >
              <Input size='large' />
            </Form.Item>
          </Col>
          <Col md={12} sm={24}>
            <Form.Item label='Codigo barra caja GS1' name='barcodeArticleGS1'>
              <Input size='large' />
            </Form.Item>
          </Col>
        </Row>

        <Button htmlType='submit' type='primary'>
          {edit ? `Editar` : `Guardar`} producto
        </Button>
      </Form>
    </>
  );
};
