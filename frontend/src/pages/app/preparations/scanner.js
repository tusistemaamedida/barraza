import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Drawer,
  Dropdown,
  Input,
  Layout,
  List,
  Menu,
  message,
  Modal,
  Result,
  Row,
  Tag,
} from "antd";
import { BarcodeOutlined, LeftCircleFilled } from "@ant-design/icons";

import styles from "../app.module.css";
import AppLayout from "../../../layouts/app/app";
import PRODUCSSCANNER from "../../../MOCKDATA/PRODUCSSCANNER.json";
import { Link, useParams } from "react-router-dom";
import Search from "antd/lib/input/Search";
import ListProducts from "./list-products";
import DownloadListProducts from "./download-list-pdf";
import { useMutation, useQueryClient } from "react-query";
import { requestParser } from "../../../utils";

const { Header, Content } = Layout;

export default () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const codebarRef = useRef(null);

  const scanCode = useMutation(
    async (values) => {
      await requestParser(
        "PUT",
        `http://localhost:3100/V1/preparations/scan`,
        values
      );
    },
    {
      onSuccess() {
        queryClient.invalidateQueries("preparationsListProducts");
        message.success("Producto/s escaneados");
      },
      onError() {
        message.error("El producto no se encuentra en el pedido");
      },
    }
  );

  useEffect(() => {
    if (codebarRef) {
      codebarRef.current.focus({
        cursor: "start",
        preventScroll: true,
      });
    }
  }, []);

  const onSearch = (params) => {
    scanCode.mutate({ preparation: id, id: params });
  };

  return (
    <AppLayout>
      <Header className={styles.navTop}>
        <Link to='/preparations' style={{ float: "left" }}>
          <LeftCircleFilled /> Volver
        </Link>
        <div className={styles.titleNav}>
          SCANEO DE PEDIDO: {"1".padStart(3, "0")} - {id.padStart(8, "0")}
        </div>
      </Header>
      <Content className={styles.content}>
        <Row>
          <Col md={12}>
            <DownloadListProducts id={id} />
          </Col>
          <Col md={12}>
            <Search
              ref={codebarRef}
              placeholder='Ingrese el código de barras'
              enterButton='Agregar'
              size='large'
              suffix={<BarcodeOutlined />}
              onSearch={onSearch}
            />
          </Col>
        </Row>

        <br />
        <ListProducts id={id} />
      </Content>
    </AppLayout>
  );
};
