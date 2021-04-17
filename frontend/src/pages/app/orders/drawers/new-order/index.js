import React, { useEffect, useState } from "react";
import { Alert, Button, Form, message, PageHeader, Steps } from "antd";

import MOCKDATAPRODUCTS from "../../../../../MOCKDATA/PRODUCTS.json";
import Step1 from "./step-1";
import Step2 from "./step-2";
const { Step } = Steps;

export default ({ onClose }) => {
  const [current, setCurrent] = useState(0);
  const [errors, setErrors] = useState([]);
  const [form] = Form.useForm();
  const [order, setOrder] = useState({
    products: [],
    customer: "",
  });

  const steps = [
    {
      title: "Cliente y productos",
      content: (
        <Step1
          form={form}
          order={order}
          setOrder={setOrder}
          products={MOCKDATAPRODUCTS}
        />
      ),
    },
    {
      title: "Confirmar",
      content: (
        <Step2
          products={MOCKDATAPRODUCTS}
          data={form.getFieldsValue()}
          order={order}
          setOrder={setOrder}
        />
      ),
    },
  ];

  const next = () => {
    setErrors([]);
    if (!order.customer) {
      setErrors(["Debes ingresar un cliente"]);
      return;
    }

    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <>
      <PageHeader progressDot title='Crear nuevo pedido' />
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className='steps-content'>{steps[current].content}</div>
      <div className='steps-action'>
        {current < steps.length - 1 && (
          <div style={{ display: "flex" }}>
            <Button type='primary' onClick={() => next()}>
              Siguiente
            </Button>
            {"  "}
            {errors.length > 0 && (
              <Alert
                style={{ marginLeft: "10px" }}
                type='error'
                banner
                message={errors.map((e) => (
                  <>
                    {e}
                    <br />
                  </>
                ))}
              />
            )}
          </div>
        )}
        {current === steps.length - 1 && (
          <Button
            style={{ marginTop: "30px" }}
            type='primary'
            onClick={() => {
              message.success("Pedido enviado!");
              onClose();
            }}
            disabled={!order.products.length || !order.customer}
          >
            Solicitar preparación
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Anterior
          </Button>
        )}
      </div>
    </>
  );
};
