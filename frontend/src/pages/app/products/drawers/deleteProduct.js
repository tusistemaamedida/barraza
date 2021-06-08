import { Descriptions, PageHeader, Button } from "antd";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { requestParser } from "../../../../utils";

export default ({ setDrawenProduct, selectedItem: { product } }) => {
  const queryClient = useQueryClient();

  const deleteProduct = useMutation(
    async (values) => {
      await requestParser(
        "DELETE",
        `http://localhost:3100/V1/products/${product._id}`,
        values
      );
    },
    {
      onSuccess() {
        queryClient.invalidateQueries("products");
        setDrawenProduct(false);
      },
    }
  );

  return (
    <>
      <PageHeader title='Eliminar Producto' />
      <br />
      <Descriptions layout='vertical'>
        <Descriptions.Item label='Código' span={2}>
          {product.code}
        </Descriptions.Item>
        <Descriptions.Item label='RPNA'>{product.rnpa}</Descriptions.Item>
        <Descriptions.Item label='Descripción' span={2}>
          {product.description}
        </Descriptions.Item>
        <Descriptions.Item label='Dias vencimiento'>
          {product.expiration_day}
        </Descriptions.Item>
      </Descriptions>

      <Button
        danger
        type='primary'
        style={{ position: "absolute", bottom: "30px", right: "20px" }}
        onClick={deleteProduct.mutate}
      >
        Eliminar producto
      </Button>
    </>
  );
};
