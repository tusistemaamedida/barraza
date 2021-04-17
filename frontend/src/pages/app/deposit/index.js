import React, { useState } from "react";
import { Layout, Select, Tabs } from "antd";

import styles from "../app.module.css";
import AppLayout from "../../../layouts/app/app";
import { requestParser } from "../../../utils";
import { Option } from "antd/lib/mentions";
import BoardComponent from "./board";
import { useQuery } from "react-query";

const { Header, Content } = Layout;

export default (params) => {
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    street: "1",
    column: "A",
  });

  const { data: dataCurrent, isLoading: lCD, refetch } = useQuery(
    "depositCurrent",
    requestParser("GET", "http://localhost:3100/v1/deposits", selectedItem),
    {
      refetchOnWindowFocus: false,
    }
  );

  const {
    data: dataAvailable,
    isLoading: lDA,
    refetch: refecthAvailable,
  } = useQuery(
    "depositAvailable",
    requestParser("GET", "http://localhost:3100/v1/deposits", {
      street: "0",
      column: "0",
    }),
    {
      /*  onSuccess({ body }) {
        //transformamos la data en columnas de los boards
        setPalletsAvailable();
        setLoading(false);
      }, */
      refetchOnWindowFocus: false,
    }
  );

  const onChangeModule = (obj) => {
    setLoading(true);
    setSelectedItem(obj);
    setTimeout(() => {
      refetch();
      refecthAvailable();
      setLoading(false);
    }, 1000);
  };

  const handleDataBoard = () => {
    let pallets = [
      {
        id: "0",
        title: "Pallets Disponibles",
        cards: dataAvailable.body.map((pd) => {
          const { _id, title, description, label, draggable } = pd;
          return {
            id: _id,
            title,
            description,
            label,
            draggable,
            collasabel: false,
          };
        }),
      },
    ];

    ["1", "2", "3", "4"].map((currentLane) => {
      let currentCard = dataCurrent.body.filter(
        (card) => card.position === currentLane
      )[0];
      if (currentCard) {
        let { _id, title, description, label } = currentCard;
        pallets.push({
          id: currentLane,
          title: `Altura ${currentLane}`,
          cards: [
            {
              id: _id,
              title,
              description,
              label,
            },
          ],
          droppable: false,
        });
      } else {
        pallets.push({
          id: currentLane,
          title: `Altura ${currentLane}`,
          cards: [],
        });
      }
    });

    return pallets;
  };

  return (
    <AppLayout>
      <Header className={styles.navTop}>
        <Select
          style={{ width: "200px", marginTop: "10px", float: "left" }}
          defaultValue={selectedItem.street}
          onChange={(e) => onChangeModule({ ...selectedItem, street: e })}
        >
          <Option value='1'>Calle 1</Option>
          <Option value='2'>Calle 2</Option>
        </Select>
        <Select
          style={{ width: "200px", marginTop: "10px", float: "left" }}
          defaultValue={selectedItem.column}
          onChange={(e) => onChangeModule({ ...selectedItem, column: e })}
        >
          <Option value='A'>Columna A</Option>
          <Option value='B'>Columna B</Option>
        </Select>
        <div className={styles.titleNav}>DEPÓSITO</div>
      </Header>
      <Content className={styles.content}>
        {lDA || lCD || loading ? (
          <BoardComponent
            data={{
              lanes: [
                { id: "cargando", title: "Cargando depósito..", cards: [] },
              ],
            }}
            column={selectedItem.column}
            street={selectedItem.street}
          />
        ) : (
          <>
            <BoardComponent
              data={{
                lanes: handleDataBoard(),
              }}
              column={selectedItem.column}
              street={selectedItem.street}
            />
          </>
        )}
      </Content>
    </AppLayout>
  );
};
