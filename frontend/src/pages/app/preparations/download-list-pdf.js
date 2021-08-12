import { DownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

export default ({ id }) => {
  const handleDownload = () => {
    console.log("ingresa");
    window.open(`http://localhost:3100/v1/preparations/download/${id}`);
  };

  return (
    <Button
      type='secondary'
      shape='round'
      onClick={() => handleDownload()}
      icon={<DownloadOutlined />}
    >
      Descargar Listado
    </Button>
  );
};
