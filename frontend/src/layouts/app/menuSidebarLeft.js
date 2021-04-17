import { Divider, Menu } from "antd";
import React from "react";
import {
  DashboardOutlined,
  UserOutlined,
  GoldOutlined,
  UserSwitchOutlined,
  LogoutOutlined,
  AppstoreOutlined,
  AppstoreAddOutlined,
  BuildOutlined,
  FileOutlined,
} from "@ant-design/icons";

import styles from "./index.module.css";
import { Link, NavLink, useLocation } from "react-router-dom";

export default () => {
  const location = useLocation();

  return (
    <Menu
      theme='dark'
      mode='inline'
      className={styles.menuSidebarLeft}
      defaultSelectedKeys={["/home"]}
      selectedKeys={[location.pathname]}
    >
      <Menu.Item
        style={{ marginTop: "90px" }}
        key='/home'
        icon={<DashboardOutlined size={50} className={styles.iconSidebar} />}
      >
        <NavLink to='/home'>Inicio</NavLink>
      </Menu.Item>
      <Menu.Item
        key='/products'
        icon={<AppstoreAddOutlined className={styles.iconSidebar} />}
      >
        <NavLink to='/products'>Productos</NavLink>
      </Menu.Item>
      <Menu.Item
        key='/deposit'
        icon={<BuildOutlined className={styles.iconSidebar} />}
      >
        <NavLink to='/deposit'>Depósito</NavLink>
      </Menu.Item>
      <Menu.Item
        key='/orders'
        icon={<FileOutlined className={styles.iconSidebar} />}
      >
        <NavLink to='/orders'>Órdenes</NavLink>
      </Menu.Item>
      <Menu.Item
        key='/users'
        icon={<UserSwitchOutlined className={styles.iconSidebar} />}
      >
        <NavLink to='/users'>Usuarios</NavLink>
      </Menu.Item>

      <Divider />
      <Menu.Item
        key='/profile'
        icon={<UserOutlined className={styles.iconSidebar} />}
      >
        Mi perfil
      </Menu.Item>

      <Menu.Item
        key='6'
        icon={<LogoutOutlined className={styles.iconSidebar} />}
      >
        <NavLink to='/'>Salir</NavLink>
      </Menu.Item>
    </Menu>
  );
};
