import {
  Avatar,
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
import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "react-query";
import { requestParser } from "../../../../utils";

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
    onChange({ file, fileList }) {
      if (file.status !== "uploading") {
        console.log(file, fileList);
      }
    },
    beforeUpload: async (file) => {
      /*  console.log(file.originFileObj);

      const fileBase64 = await toBase64(file.originFileObj); */
      console.log(file);
      setState((state) => ({
        fileList: [file],
      }));
      return false;
    },
    fileList,
  };

  return (
    <Upload
      listType='picture'
      {...props}
      action='http://127.0.0.1:3100/V1/products/upload'
    >
      <Button icon={<UploadOutlined />}>Seleccione una imagen</Button>
    </Upload>
  );
};

export default ({ edit, selectedItem, setDrawenProduct }) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [state, setState] = useState({
    fileList: [],
    uploading: false,
  });

  const createProduct = useMutation(
    async (values) => {
      await requestParser("POST", "http://localhost:3100/V1/products", values);
    },
    {
      onSuccess() {
        queryClient.invalidateQueries("products");
        setDrawenProduct(false);
      },
    }
  );

  const updateProduct = useMutation(
    async (values) => {
      await requestParser(
        "PUT",
        `http://localhost:3100/V1/products/${selectedItem.product._id}`,
        values
      );
    },
    {
      onSuccess() {
        queryClient.invalidateQueries("products");
        setDrawenProduct(false);
      },
    }
  );

  useEffect(() => {
    if (edit) {
      form.setFieldsValue(selectedItem.product);
    }
  }, [selectedItem]);

  const onFinish = (params) => {
    if (edit) {
      updateProduct.mutate({
        ...params,
      });
    } else {
      createProduct.mutate({
        ...params,
        image: state.fileList[0].response.body.url,
      });
    }
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
        {!edit ? (
          <Form.Item label='Imagen' name='image'>
            <UploadInput state={state} setState={setState} />
          </Form.Item>
        ) : (
          <Avatar
            src={selectedItem.product.image_product}
            style={{ marginBottom: "20px", width: "120px", height: "120px" }}
          />
        )}

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
            <Form.Item label='Insumo' name='id_supplies'>
              <Select size='large'>
                <Select.Option value='609aaffbf3014ed6cf09f68a'>
                  Leche
                </Select.Option>
                <Select.Option value='609ab01ef3014ed6cf09f68b'>
                  Suero
                </Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col md={12} sm={24}>
            <Form.Item label='Dia de vencimimento' name='expiration_day'>
              <Input size='large' />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={20} align='middle'>
          <Col md={12} sm={24}>
            <Form.Item label='' valuePropName='checked' name='label_per_piece'>
              <Checkbox>Posee etiqueta por pieza</Checkbox>
            </Form.Item>
          </Col>
          <Col md={12} sm={24}>
            <Form.Item label='Etiq. por pieza' name='label_quantity_per_piece'>
              <Input size='large' />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20} align='middle'>
          <Col md={12} sm={24}>
            <Form.Item label='' valuePropName='checked' name='box_label'>
              <Checkbox>Posee etiqueta por caja</Checkbox>
            </Form.Item>
          </Col>
          <Col md={12} sm={24}>
            <Form.Item label='Etiq. por caja' name='piece_box'>
              <Input size='large' />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20} align='middle'>
          <Col md={12} sm={24}>
            <Form.Item label='' valuePropName='checked' name='label_pallet'>
              <Checkbox>Posee etiqueta el pallet</Checkbox>
            </Form.Item>
          </Col>
          <Col md={6} sm={24}>
            <Form.Item label='Cajas por pellet' name='box_pallet'>
              <Input size='large' />
            </Form.Item>
          </Col>
          <Col md={6} sm={24}>
            <Form.Item label='Etiq. por pallet' name='amount_label_pallet'>
              <Input size='large' />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20} align='middle'>
          <Col md={12} sm={24}>
            <Form.Item
              label='Codigo barra artículo GS1'
              name='barcode_product_gs1'
            >
              <Input size='large' />
            </Form.Item>
          </Col>
          <Col md={12} sm={24}>
            <Form.Item label='Codigo barra caja GS1' name='barcode_box_gs1'>
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
