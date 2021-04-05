import {
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Drawer,
  Dropdown,
  List,
  Menu,
  Row,
  Spin,
  Tag,
} from "antd";
import React, { useState } from "react";
import { useQuery } from "react-query";

import { requestParser } from "../../../utils";
import styles from "../app.module.css";
import LotsForm from "./drawers/lostForm";

export default (params) => {
  const [drawerLots, setDrawerLots] = useState(false);
  const [selectedLot, setSelectedLot] = useState(null);

  const { data, isLoading } = useQuery(
    "lots",
    requestParser("GET", "http://localhost:3100/v1/lots"),
    {
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) {
    return (
      <Spin
        indicator={<LoadingOutlined type='loading' />}
        spinning={true}
        className={styles.indicator}
      />
    );
  }

  return (
    <>
      <List
        dataSource={data.body}
        header={
          <>
            <List.Item style={{ padding: "10px 20px" }}>
              <Row style={{ width: "100%" }} gutter={20}>
                <Col span={24}>
                  <Row className={styles.headerTable}>
                    <Col md={2} xs={24} sm={24}></Col>
                    <Col md={6} xs={24} sm={24}>
                      Pallets
                    </Col>
                    <Col md={5} xs={24} sm={24}>
                      Estado
                    </Col>
                    <Col md={5} xs={24} sm={24}>
                      Última nota
                    </Col>
                    <Col md={4} xs={24} sm={24}>
                      Fecha ingreso
                    </Col>
                    <Col md={2} xs={24} sm={24}></Col>
                  </Row>
                </Col>
              </Row>
            </List.Item>
            <Divider />
          </>
        }
        renderItem={(item) => (
          <List.Item style={{ padding: "10px 20px" }}>
            {console.log(item)}
            <Row style={{ width: "100%" }} gutter={20}>
              <Col span={24}>
                <Row align='middle'>
                  <Col md={2} xs={24} sm={24}></Col>
                  <Col md={6} xs={24} sm={24}>
                    {item.pallets.map((p) => (
                      <>
                        {p}
                        <br />
                      </>
                    ))}
                  </Col>
                  <Col md={5} xs={24} sm={24}>
                    {item.status}
                  </Col>
                  <Col md={5} xs={24} sm={24}>
                    {item.notes}
                  </Col>
                  <Col md={4} xs={24} sm={24}>
                    {item.createdAt}
                  </Col>
                  <Col md={2} xs={24} sm={24}>
                    <Dropdown
                      overlay={
                        <Menu>
                          <Menu.Item
                            key='1'
                            icon={<EditOutlined />}
                            onClick={() => {
                              setSelectedLot(item);
                              setDrawerLots(true);
                            }}
                          >
                            Editar
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
      <Drawer
        visible={drawerLots}
        onClose={() => setDrawerLots(false)}
        className={styles.drawer}
      >
        <LotsForm lot={selectedLot} />
      </Drawer>
    </>
  );
};
