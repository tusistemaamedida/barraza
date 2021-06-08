import React, { useEffect, useState } from "react";
import { Button, Drawer, Layout, Tabs } from "antd";
import { useQuery } from "react-query";

import styles from "../app.module.css";
import AppLayout from "../../../layouts/app/app";
import { requestParser } from "../../../utils";
import ProductForm from "./drawers/productForm";
import Lots from "./lots";
import Products from "./products";

const { Header, Footer, Sider, Content } = Layout;
const { TabPane } = Tabs;
export default () => {
  const [drawenProduct, setDrawenProduct] = useState(false);
  const [currentTab, setCurrentTab] = useState("2");

  useEffect(() => {
    console.log(currentTab);
  }, [currentTab]);

  return (
    <AppLayout>
      <Header className={styles.navTop}>
        <div className={styles.titleNav}>PRODUCTOS</div>
      </Header>

      <Content className={styles.content}>
        {currentTab === "2" && (
          <div className={styles.actionButtonsNavTab}>
            <Button onClick={() => setDrawenProduct(true)} type='primary'>
              Nuevo producto
            </Button>
          </div>
        )}
        <Tabs
          onChange={(key) => setCurrentTab(key)}
          defaultActiveKey={currentTab}
          type='card'
          size='large'
        >
          <TabPane tab='Lotes' key='1'>
            <Lots />
          </TabPane>
          <TabPane tab='Productos' key='2'>
            <Products />
          </TabPane>
          <TabPane tab='Establecimientos' key='3'>
            Establecimientos
          </TabPane>
          <TabPane tab='Envasados' key='4'>
            Envasados
          </TabPane>
        </Tabs>
      </Content>
      <Drawer
        visible={drawenProduct}
        onClose={() => setDrawenProduct(false)}
        className={styles.drawer}
        destroyOnClose
      >
        <ProductForm setDrawenProduct={setDrawenProduct} edit={false} />
      </Drawer>
    </AppLayout>
  );
};
