import { Divider, Menu } from "antd";
import React from "react";
import {
  DashboardOutlined,
  UserOutlined,
  GoldOutlined,
  UserSwitchOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import styles from "./index.module.css";
import { Link } from "react-router-dom";

export default () => {
  return (
    <>
      <Menu
        theme='dark'
        mode='inline'
        className={styles.menuSidebarLeft}
        defaultSelectedKeys={["1"]}
      >
        <Menu.Item
          style={{ marginTop: "90px" }}
          key='1'
          icon={<DashboardOutlined size={50} className={styles.iconSidebar} />}
        >
          <Link to='/home'>Inicio</Link>
        </Menu.Item>
        <Menu.Item
          key='2'
          icon={<GoldOutlined className={styles.iconSidebar} />}
        >
          Productos
        </Menu.Item>
        <Menu.Item
          key='3'
          icon={<UserSwitchOutlined className={styles.iconSidebar} />}
        >
          <Link to='/users'>Usuarios</Link>
        </Menu.Item>
        <Divider />
        <Menu.Item
          key='4'
          icon={<UserOutlined className={styles.iconSidebar} />}
        >
          Mi perfil
        </Menu.Item>

        <Menu.Item
          key='4'
          icon={<LogoutOutlined className={styles.iconSidebar} />}
        >
          <Link to='/'>Salir</Link>
        </Menu.Item>
      </Menu>
    </>
  );
};
