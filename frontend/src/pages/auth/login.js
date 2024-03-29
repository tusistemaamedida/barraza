import React from "react";
import { Alert, Button, Form, Input, message } from "antd";

import Layout from "./layout";
import styles from "./index.module.css";
import { useMutation } from "react-query";
import { requestParser } from "../../utils";
import { Redirect, useHistory } from "react-router-dom";

export default () => {
  const history = useHistory()
  message.config({ maxCount: 1 });

  const login = useMutation(async (values) => {
    const result = await requestParser("POST", "http://localhost:3100/login", values);
    console.log(result)
    if(result.statusCode == 200){
      localStorage.setItem('jwt', result.body.token)
      history.push('/home')
    }
  });

  const onFinish = (values) => {
    login.mutate(values);
  };

  return <LoginPage onFinish={onFinish} {...login} />;
};

const LoginPage = (params) => {
  const { onFinish, isLoading, isError } = params;
  const [form] = Form.useForm();

  return (
    <Layout>
      <Form
        className={styles.form}
        form={form}
        onFinish={onFinish}
        layout='vertical'
      >
        {isError && (
          <>
            <Alert
              type='error'
              showIcon
              message='Revise sus credenciales de acceso'
            />{" "}
            <br />
          </>
        )}

        <Form.Item
          label='Email'
          name='email'
          rules={[{ type: "email", message: "Ingrese un email correcto" }]}
        >
          <Input size='large' />
        </Form.Item>
        <Form.Item label='Contraseña' name='password'>
          <Input.Password size='large' className={styles.password} />
        </Form.Item>

        <br />

        <Button loading={isLoading} block type='primary' htmlType='submit'>
          INGRESAR
        </Button>
      </Form>
    </Layout>
  );
};
