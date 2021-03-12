import { notification, PageHeader } from "antd";
import React from "react";
import Board from "react-trello";

import styles from "../app.module.css";

export default ({ id, data, onSetData }) => {
  let events = {
    onDataChange: (e) => {
      onSetData(e);
    },
    handleDragEnd: (
      cardId,
      sourceLaneId,
      targetLaneId,
      position,
      cardDetails
    ) => console.log(cardId, sourceLaneId, targetLaneId, position, id),
    /*  onCardMoveAcrossLanes: (fromLaneId, toLaneId, cardId, index) =>
          console.log(fromLaneId, toLaneId, cardId, index), */
  };

  return (
    <>
      <PageHeader title={`COLUMNA ${id}`} />
      <Board
        {...events}
        className={styles.boardContainer}
        data={data}
        /*  onCardMoveAcrossLanes={(fromLaneId, toLaneId, cardId, index) =>
            console.log(fromLaneId, toLaneId, cardId, index)
          }
          onLaneUpdate={(laneId, data) => console.log(laneId, data)} */
        id={`board${id}`}
      />
    </>
  );
};
