import {
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Button, Col, Divider, Dropdown, List, Menu, Row, Tag } from "antd";
import React from "react";

export default (params) => {
  return (
    /*   <div className={styles.navAction}>
        <div className={styles.actionButtonsNav}>
          <Button
            onClick={() => setDrawenUser(true)}
            style={{ float: "right" }}
            type='primary'
          >
            Nuevo
          </Button>
        </div>
      </div> */

    <List
      loading={{
        spinning: isLoading,
        indicator: <LoadingOutlined type='loading' />,
      }}
      loa
      data={data}
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
      dataSource={data}
      renderItem={(item) => (
        <List.Item style={{ padding: "10px 20px" }}>
          <Row style={{ width: "100%" }} gutter={20}>
            <Col span={24}>
              <Row align='middle'>
                <Col md={2} xs={24} sm={24}>
                  <Avatar
                    icon={<UserOutlined />}
                    style={{ backgroundColor: "#001529" }}
                  />
                </Col>
                <Col md={6} xs={24} sm={24}>
                  {item.name}
                </Col>
                <Col md={5} xs={24} sm={24}>
                  {item.phone}
                </Col>
                <Col md={5} xs={24} sm={24}>
                  Empleado
                </Col>
                <Col md={4} xs={24} sm={24}>
                  <Tag color='#2db7f5'>ACTIVO</Tag>
                </Col>
                <Col md={2} xs={24} sm={24}>
                  <Dropdown
                    overlay={
                      <Menu>
                        <Menu.Item key='1' icon={<EditOutlined />}>
                          Editar
                        </Menu.Item>
                        <Menu.Item key='1' icon={<DeleteOutlined />}>
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
  );
};
