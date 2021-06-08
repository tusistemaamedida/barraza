import {
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  FileImageOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Divider,
  Drawer,
  Dropdown,
  List,
  Menu,
  Row,
} from "antd";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { requestParser } from "../../../utils";

import styles from "../app.module.css";
import ProductForm from "./drawers/productForm";
import DeleteProduct from "./drawers/deleteProduct";

export default () => {
  const [drawenUpdateProduct, setDrawenUpdateProduct] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    action: "",
    product: null,
  });

  const responseProduct = useQuery(
    "products",
    requestParser("GET", "http://localhost:3100/v1/products")
  );

  const onSelectProduct = (product, action) => {
    setSelectedItem({ action, product });
    setDrawenUpdateProduct(true);
  };

  return (
    <>
      <ProductPage
        selectedItem={selectedItem}
        onSelectProduct={onSelectProduct}
        responseProduct={responseProduct}
      />
      <DrawenUpdate
        drawenUpdateProduct={drawenUpdateProduct}
        setDrawenUpdateProduct={setDrawenUpdateProduct}
        selectedItem={selectedItem}
      />
    </>
  );
};

const ProductPage = (props) => {
  const { onSelectProduct, responseProduct } = props;

  return (
    <>
      <List
        loading={{
          spinning: responseProduct.isLoading,
          indicator: <LoadingOutlined type='loading' />,
        }}
        header={
          <>
            <List.Item style={{ padding: "10px 20px" }}>
              <Row style={{ width: "100%" }} gutter={20}>
                <Col span={24}>
                  <Row className={styles.headerTable}>
                    <Col md={2} xs={24} sm={24}></Col>
                    <Col md={6} xs={24} sm={24}>
                      Código
                    </Col>
                    <Col md={5} xs={24} sm={24}>
                      Descripción
                    </Col>
                    <Col md={5} xs={24} sm={24}>
                      Cod. artículo GS1
                    </Col>
                    <Col md={4} xs={24} sm={24}>
                      Cod. caja GS1
                    </Col>
                    <Col md={2} xs={24} sm={24}></Col>
                  </Row>
                </Col>
              </Row>
            </List.Item>
            <Divider />
          </>
        }
        dataSource={
          responseProduct.isSuccess && responseProduct.data.body.length > 0
            ? responseProduct.data.body
            : []
        }
        key='_id'
        renderItem={(item) => (
          <List.Item style={{ padding: "10px 20px" }}>
            <Row style={{ width: "100%" }} gutter={20}>
              <Col span={24}>
                <Row align='middle'>
                  <Col md={2} xs={24} sm={24}>
                    <Avatar
                      src={item.image_product}
                      icon={<FileImageOutlined />}
                      style={{ backgroundColor: "#001529" }}
                    />
                  </Col>
                  <Col md={6} xs={24} sm={24}>
                    {item._id}
                  </Col>
                  <Col md={5} xs={24} sm={24}>
                    {item.description}
                  </Col>
                  <Col md={5} xs={24} sm={24}>
                    {item.barcode_product_gs1}
                  </Col>
                  <Col md={4} xs={24} sm={24}>
                    {item.expiration_day}
                  </Col>
                  <Col md={2} xs={24} sm={24}>
                    <Dropdown
                      overlay={
                        <Menu>
                          <Menu.Item
                            key='1'
                            onClick={() => onSelectProduct(item, "EDIT")}
                            icon={<EditOutlined />}
                          >
                            Editar
                          </Menu.Item>
                          <Menu.Item
                            key='1'
                            onClick={() => onSelectProduct(item, "DELETE")}
                            icon={<DeleteOutlined />}
                          >
                            Eliminar
                          </Menu.Item>
                        </Menu>
                      }
                    >
                      <Button>
                        Acción <DownOutlined />
                      </Button>
                    </Dropdown>
                  </Col>
                </Row>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </>
  );
};

const DrawenUpdate = (props) => {
  const { drawenUpdateProduct, setDrawenUpdateProduct, selectedItem } = props;

  return (
    <Drawer
      visible={drawenUpdateProduct}
      className={styles.drawer}
      onClose={() => setDrawenUpdateProduct(false)}
      destroyOnClose
    >
      {selectedItem.action === "EDIT" ? (
        <ProductForm
          edit={true}
          setDrawenProduct={setDrawenUpdateProduct}
          selectedItem={selectedItem}
        />
      ) : (
        <DeleteProduct
          setDrawenProduct={setDrawenUpdateProduct}
          selectedItem={selectedItem}
        />
      )}
    </Drawer>
  );
};
