import React, { useState } from "react";
import { Layout, Select, Tabs } from "antd";

import styles from "../app.module.css";
import AppLayout from "../../../layouts/app/app";
import { requestParser } from "../../../utils";
import { Option } from "antd/lib/mentions";
import BoardComponent from "./board";

const { Header, Content } = Layout;
const { TabPane } = Tabs;

export default (params) => {
  const [selectedItem, setSelectedItem] = useState({ street: 1, column: "B" });
  const [data, setData] = useState([
    {
      columnId: "A",
      streetId: 1,
      lanesData: {
        lanes: [
          {
            id: "lane0",
            title: "Pallets disponibles",
            label: "2",
            cards: [
              {
                id: "123033320",
                title: "Cod: 23303233",
                description: "200 x Queso barra 3kg.",
                label: "5 mins",
                draggable: true,
              },
              {
                id: "Card2",
                title: "Pay Rent",
                description: "Transfer via NEFT",
                label: "15 mins",
                metadata: { sha: "be312a1" },
              },
              {
                id: "Card3",
                title: "Pay Rent",
                description: "Transfer via NEFT",
                label: "15 mins",
                metadata: { sha: "be312a1" },
              },
              {
                id: "Card4",
                title: "Pay Rent",
                description: "Transfer via NEFT",
                label: "15 mins",
                metadata: { sha: "be312a1" },
              },
            ],
          },
          {
            id: "lane1",
            title: "Altura 1",
            label: "0/0",
            cards: [],
          },
          {
            id: "lane2",
            title: "Altura 2",
            label: "0/0",
            cards: [],
          },
          {
            id: "lane3",
            title: "Altura 3",
            label: "0/0",
            cards: [],
          },
          {
            id: "lane4",
            title: "Altura 4",
            label: "0/0",
            cards: [],
          },
        ],
      },
    },
    {
      columnId: "B",
      streetId: 1,
      lanesData: {
        lanes: [
          {
            id: "lane0",
            title: "Pallets disponibles",
            label: "2",
            cards: [
              {
                id: "123033320",
                title: "Cod: 23303233",
                description: "200 x Queso barra 3kg.",
                label: "5 mins",
                draggable: true,
              },
              {
                id: "Card2",
                title: "Pay Rent",
                description: "Transfer via NEFT",
                label: "15 mins",
                metadata: { sha: "be312a1" },
              },
              {
                id: "Card3",
                title: "Pay Rent",
                description: "Transfer via NEFT",
                label: "15 mins",
                metadata: { sha: "be312a1" },
              },
              {
                id: "Card4",
                title: "Pay Rent",
                description: "Transfer via NEFT",
                label: "15 mins",
                metadata: { sha: "be312a1" },
              },
            ],
          },
          {
            id: "lane1",
            title: "Altura 1",
            label: "0/0",
            cards: [],
          },
          {
            id: "lane2",
            title: "Altura 2",
            label: "0/0",
            cards: [],
          },
          {
            id: "lane3",
            title: "Altura 3",
            label: "0/0",
            cards: [],
          },
          {
            id: "lane4",
            title: "Altura 4",
            label: "0/0",
            cards: [],
          },
        ],
      },
    },
    {
      columnId: "C",
      streetId: 1,
      lanesData: {
        lanes: [
          {
            id: "lane0",
            title: "Pallets disponibles",
            label: "2",
            cards: [
              {
                id: "123033320",
                title: "Cod: 23303233",
                description: "200 x Queso barra 3kg.",
                label: "5 mins",
                draggable: true,
              },
              {
                id: "Card2",
                title: "Pay Rent",
                description: "Transfer via NEFT",
                label: "15 mins",
                metadata: { sha: "be312a1" },
              },
              {
                id: "Card3",
                title: "Pay Rent",
                description: "Transfer via NEFT",
                label: "15 mins",
                metadata: { sha: "be312a1" },
              },
              {
                id: "Card4",
                title: "Pay Rent",
                description: "Transfer via NEFT",
                label: "15 mins",
                metadata: { sha: "be312a1" },
              },
            ],
          },
          {
            id: "lane1",
            title: "Altura 1",
            label: "0/0",
            cards: [],
          },
          {
            id: "lane2",
            title: "Altura 2",
            label: "0/0",
            cards: [],
          },
          {
            id: "lane3",
            title: "Altura 3",
            label: "0/0",
            cards: [],
          },
          {
            id: "lane4",
            title: "Altura 4",
            label: "0/0",
            cards: [],
          },
        ],
      },
    },
  ]);

  const [retenidos, setRetenidos] = useState({
    lanes: [
      {
        id: "lane0",
        title: "Pallets disponibles",
        label: "2",
        cards: [
          {
            id: "123033320",
            title: "Cod: 23303233",
            description: "200 x Queso barra 3kg.",
            label: "5 mins",
            draggable: true,
          },
          {
            id: "Card2",
            title: "Pay Rent",
            description: "Transfer via NEFT",
            label: "15 mins",
            metadata: { sha: "be312a1" },
          },
          {
            id: "Card3",
            title: "Pay Rent",
            description: "Transfer via NEFT",
            label: "15 mins",
            metadata: { sha: "be312a1" },
          },
          {
            id: "Card4",
            title: "Pay Rent",
            description: "Transfer via NEFT",
            label: "15 mins",
            metadata: { sha: "be312a1" },
          },
        ],
      },
      {
        id: "lane1",
        title: "Altura 1",
        label: "0/0",
        cards: [],
      },
      {
        id: "lane2",
        title: "Altura 2",
        label: "0/0",
        cards: [],
      },
      {
        id: "lane3",
        title: "Altura 3",
        label: "0/0",
        cards: [],
      },
      {
        id: "lane4",
        title: "Altura 4",
        label: "0/0",
        cards: [],
      },
    ],
  });

  const columns = [
    {
      id: "A",
      data,
      setData,
    },
    {
      id: "B",
      data,
      setData,
    },
    {
      id: "C",
      data,
      setData,
    },
    {
      id: "D",
      data,
      setData,
    },
    {
      id: "E",
      data: retenidos,
      setData: setRetenidos,
    },
  ];

  const onSetData = (obj) => {
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

        /* columns.cards.lenght > 0 && console.log("tiene mas de uno"); */
        /* */
      }
    });
  };

  return (
    <AppLayout>
      <Header className={styles.navTop}>
        <Select
          style={{ width: "200px", marginTop: "10px", float: "left" }}
          defaultValue={selectedItem.street}
          onChange={(e) => setSelectedItem({ ...setSelectedItem, street: e })}
        >
          <Option value='1'>Calle 1</Option>
          <Option value='2'>Calle 2</Option>
        </Select>
        <Select
          style={{ width: "200px", marginTop: "10px", float: "left" }}
          defaultValue={selectedItem.column}
          onChange={(e) => setSelectedItem({ ...setSelectedItem, column: e })}
        >
          <Option value='A'>Columna A</Option>
          <Option value='B'>Columna B</Option>
        </Select>
        <div className={styles.titleNav}>DEPÓSITO</div>
      </Header>
      <Content className={styles.content}>
        <BoardComponent
          onSetData={onSetData}
          data={
            data.filter((d) => d.columnId == selectedItem.column)[0].lanesData
          }
          id={selectedItem.column}
        />
      </Content>
    </AppLayout>
  );
};
