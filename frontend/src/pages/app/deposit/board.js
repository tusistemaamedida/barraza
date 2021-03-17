import { notification, PageHeader } from "antd";
import React from "react";
import Board from "react-trello";
import { useMutation } from "react-query";

import styles from "../app.module.css";
import { requestParser } from "../../../utils";

export default ({ column, street, data }) => {
  const { isError, isLoading, isSuccess } = useMutation(requestParser("POST"));

  let events = {
    onDataChange: (e) => {
      console.log("columana", column, "street", street, "data", e);
      //onSetData(e);
    },
    handleDragEnd: (
      cardId,
      sourceLaneId,
      targetLaneId,
      position,
      cardDetails
    ) => console.log(cardId, sourceLaneId, targetLaneId, position, column),
    /*  onCardMoveAcrossLanes: (fromLaneId, toLaneId, cardId, index) =>
          console.log(fromLaneId, toLaneId, cardId, index), */
  };

  return (
    <>
      <PageHeader title={`COLUMNA ${column}`} />
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
    </>
  );
};
