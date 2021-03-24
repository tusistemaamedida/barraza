import { notification, PageHeader } from "antd";
import React, { useState } from "react";
import Board from "react-trello";
import { useMutation } from "react-query";

import styles from "../app.module.css";
import { requestParser } from "../../../utils";

export default ({ column, street, data }) => {
  const [cardId, setCardId] = useState(null);
  const updateCard = useMutation(async (event) => {
    console.log(event);
    return requestParser(
      "PUT",
      `http://localhost:3100/v1/deposits/card/${cardId}`,
      event
    );
  });

  let events = {
    onDataChange: (e) => {
      /*   console.log("columana", column, "street", street, "data", e); */
      //onSetData(e);
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
      //street, column, position = targetLaneId, cardId
      console.log(cardId, targetLaneId, column, street);
    },
    /*  onCardMoveAcrossLanes: (fromLaneId, toLaneId, cardId, index) =>
          console.log(fromLaneId, toLaneId, cardId, index), */
  };

  return (
    <>
      <PageHeader title={`CALLE ${street} - ${column}`} />
      {console.log(data)}
      {data && (
        <Board
          {...events}
          className={styles.boardContainer}
          data={data}
          /*  onCardMoveAcrossLanes={(fromLaneId, toLaneId, cardId, index) =>
            console.log(fromLaneId, toLaneId, cardId, index)
          }
          onLaneUpdate={(laneId, data) => console.log(laneId, data)} */
          id={`board${column}`}
        />
      )}
    </>
  );
};
