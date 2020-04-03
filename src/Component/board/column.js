import React from "react";
import { Droppable } from "react-beautiful-dnd";

import Card from "./card";

export const Column = ({ task }) => {
  const RenderList = (arr = []) => {
    if (arr.length === 0) {
      return;
    }
    return arr.map((item, idx) => (
      <Card key={item.id + "~" + item.title} {...item} index={idx} />
    ));
  };
  return (
    <Droppable droppableId={task.id}>
      {provided => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="col bg-light p-3"
        >
          {RenderList(task.taskIds)}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
