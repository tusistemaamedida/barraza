import { Button, Form, Input } from "antd";
import React from "react";
import Layout from "./layout";
import styles from "./index.module.css";
import { Link } from "react-router-dom";

export default () => {
  return (
    <Layout>
      <Form className={styles.form} layout='vertical'>
        <Form.Item label='Usuario'>
          <Input size='large' />
        </Form.Item>
        <Form.Item label='Contraseña'>
          <Input.Password size='large' className={styles.password} />
        </Form.Item>
        <br />
        <Link to='/home'>
          <Button block type='primary'>
            INGRESAR
          </Button>
        </Link>
      </Form>
    </Layout>
  );
};
