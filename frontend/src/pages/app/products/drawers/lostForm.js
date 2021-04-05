import React from "react";

import {
  Button,
  Checkbox,
  Col,
  Descriptions,
  Form,
  Input,
  PageHeader,
  Row,
  Select,
} from "antd";

import styles from "../../app.module.css";

export default ({ lot }) => {
  const [form] = Form.useForm();

  const onFinish = (params) => {};

  return (
    <>
      <PageHeader title='Editar estado del lote' />
      <Descriptions bordered column={1}>
        <Descriptions.Item label='Estado'>
          <Select style={{ width: "100%" }} defaultValue={lot.status}>
            <Select.Option>RETENIDO</Select.Option>
            <Select.Option>LIBERADO</Select.Option>
          </Select>
        </Descriptions.Item>
        <Descriptions.Item label='Analisis'>
          <Select style={{ width: "100%" }} defaultValue={lot.analysis}>
            <Select.Option>DECOMISO</Select.Option>
            <Select.Option>REPROCESO</Select.Option>
          </Select>
        </Descriptions.Item>
        <Descriptions.Item label='Detalle de salida'>
          {lot.outputDetail ? lot.outputDetail : "-"}
        </Descriptions.Item>
        <Descriptions.Item label='Pallets asociados'>
          {lot.pallets.map((p) => (
            <>
              {p}
              <br />
            </>
          ))}
        </Descriptions.Item>
      </Descriptions>
      <Button type='primary' danger className={styles.buttonDrawer}>
        Editar lote
      </Button>
    </>
  );
};
