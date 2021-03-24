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
  const [palletsAvailable, setPalletsAvailable] = useState([]);
  const [palletsCurrent, setPalletsCurrent] = useState([]);

  const { isLoading: lCD, refetch } = useQuery(
    "depositCurrent",
    requestParser("GET", "http://localhost:3100/v1/deposits", selectedItem),
    {
      onSuccess({ body }) {
        setLoading(true);

        var pallets = [];
        //creo cada carril (currentLane) de la fila y columna correspondiente (de 1 a 4)
        ["1", "2", "3", "4"].map((currentLane) => {
          let currentCard = body.filter(
            (card) => card.position === currentLane
          )[0];
          if (currentCard) {
            const { _id, title, description, label } = currentCard;
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
            });
          } else {
            pallets.push({
              id: currentLane,
              title: `Altura ${currentLane}`,
              cards: [],
            });
          }
        });
        setPalletsCurrent(pallets);
        setLoading(false);

        setTimeout(() => {
          console.log(palletsCurrent);
        }, 5000);
      },
      refetchOnWindowFocus: false,
    }
  );

  const { isLoading: lDA, refetch: refecthAvailable } = useQuery(
    "depositAvailable",
    requestParser("GET", "http://localhost:3100/v1/deposits", {
      street: "0",
      column: "0",
    }),
    {
      onSuccess({ body }) {
        setLoading(true);
        //transformamos la data en columnas de los boards
        if (body.length > 0) {
          setPalletsAvailable({
            id: "0",
            title: "Pallets Disponibles",
            cards: body.map((pd) => {
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
          });
        } else {
          setPalletsAvailable({
            id: "0",
            title: "Pallets Disponibles",
            cards: [],
          });
        }
        setLoading(false);
      },
      refetchOnWindowFocus: false,
    }
  );

  /*   const onSetData = (obj) => {
    var currentLane = data.filter((d) => d.columnId == selectedItem.column)[0]
      .lanesData;
    console.log(currentLane);
    currentLane.lanes.map((columns, index) => {
      if (index != 0) {
        if (columns.cards.length == 1) {
          columns.droppable = false;
          setData(obj);
        } else {
          columns.droppable = true;
        }

        columns.cards.lenght > 0 && console.log("tiene mas de uno");
      }
    });
  }; */

  const onChangeModule = (obj) => {
    setLoading(true);
    setSelectedItem(obj);
    setTimeout(() => {
      refetch();
      refecthAvailable();
    }, 1000);
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
        <BoardComponent
          data={{
            lanes:
              lDA || lCD || loading
                ? [{ id: "cargando", title: "Cargando depósito..", cards: [] }]
                : [palletsAvailable, ...palletsCurrent],
          }}
          column={selectedItem.column}
          street={selectedItem.street}
        />
      </Content>
    </AppLayout>
  );
};
