import { notification, PageHeader } from "antd";
import React, { useEffect, useState } from "react";
import Board from "react-trello";
import { useMutation } from "react-query";

import styles from "../app.module.css";
import { requestParser } from "../../../utils";

export default ({ column, street, data }) => {
  const [currentData, setCurrentData] = useState(null);
  const [cardId, setCardId] = useState(null);
  const updateCard = useMutation(async (event) => {
    return requestParser(
      "PUT",
      `http://localhost:3100/v1/deposits/card/${cardId}`,
      event
    );
  });

  updateCard.isError &&
    notification.error({
      description: "No puede haber 2 pallets en una misma columna",
    });

  useEffect(() => {
    console.log(data);
    setCurrentData(data);
  }, [data]);

  let events = {
    onDataChange: (e) => {
      if (e.lanes.length > 0) {
        let newData = {
          lanes: e.lanes.map((currentL, i) => {
            if (currentL.cards.length > 0 && i != 0) {
              return { ...currentL, droppable: false };
            } else {
              return { ...currentL, droppable: true };
            }
          }),
        };
        setCurrentData(newData);
      }
    },
    handleDragEnd: (
      cardId,
      sourceLaneId,
      targetLaneId,
      position,
      cardDetails
    ) => {
      setCardId(cardId);
      if (targetLaneId == 0) {
        column = "0";
        street = "0";
      }
      updateCard.mutate({
        position: targetLaneId.toString(),
        column: column.toString(),
        street: street.toString(),
      });
    },
  };

  return (
    <>
      <PageHeader title={`CALLE ${street} - ${column}`} />
      {currentData && (
        <Board
          {...events}
          className={styles.boardContainer}
          data={currentData}
          id={`board${column}`}
        />
      )}
    </>
  );
};
