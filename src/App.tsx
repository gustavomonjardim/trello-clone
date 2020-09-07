import React, { useState } from "react";
import {
  DragDropContext,
  DropResult,
  Droppable,
  DraggableLocation,
  DragStart,
  DragUpdate,
  ResponderProvided
} from "react-beautiful-dnd";
import "./styles.css";

import {
  reorderList,
  switchCards,
  updateColumnById,
  addCardToColumn,
  updateCardById,
  deleteColumnById,
  deleteCardById
} from "./utils/listUtils";

import Column, { NewColumn } from "./components/Column";
import AddColumnButton from "./components/AddColumnButton";
import { useLocalStorage } from "./hooks";

import { Card, Column as ColumnInterface } from "./types";
import { Board, Header, List, Trash } from "./styles";

interface AddNewColumnProps {
  columns: ColumnInterface[];
  setColumns: React.Dispatch<React.SetStateAction<ColumnInterface[]>>;
}

const AddNewColumn: React.FC<AddNewColumnProps> = ({ columns, setColumns }) => {
  const [isAddingColumn, setIsAddingColumn] = useState(false);

  const cancelColumnAddition = () => {
    setIsAddingColumn(false);
  };

  const addColumn = (id: string, title: string) => {
    setColumns([...columns, { id, title, cards: [] }]);
    setIsAddingColumn(false);
  };

  if (isAddingColumn) {
    return <NewColumn onSuccess={addColumn} onDismiss={cancelColumnAddition} />;
  }

  return (
    <AddColumnButton
      isFirst={columns?.length === 0}
      onClick={() => setIsAddingColumn(true)}
    />
  );
};

export default function App() {
  const [columns, setColumns] = useLocalStorage<ColumnInterface[]>("board", []);
  const [isColumnTrashVisible, setIsColumnTrashVisible] = useState(false);
  const [isCardTrashVisible, setIsCardTrashVisible] = useState(false);
  const [isTrashFocused, setIsTrashFocused] = useState(false);

  const updateColumn = (id: string, title: string) => {
    setColumns(updateColumnById(columns, { id, title }));
  };

  const updateCard = (newCard: Card, columnId: string) => {
    setColumns(updateCardById(columns, columnId, newCard));
  };

  const addCard = (newCard: Card, columnId: string) => {
    setColumns(addCardToColumn(columns, columnId, newCard));
  };

  const onCardDrag = (result: DropResult) => {
    const sourceColumnIndex = columns.findIndex(
      (column) => column.id === result.source.droppableId
    );
    const sourceCardIndex = result.source.index;

    const destinationColumnIndex = columns.findIndex(
      (column) => column.id === result.destination?.droppableId
    );
    const destinationCardIndex = (result.destination as DraggableLocation)
      .index;

    setColumns(() =>
      switchCards(
        columns,
        sourceColumnIndex,
        sourceCardIndex,
        destinationColumnIndex,
        destinationCardIndex
      )
    );
  };

  const onColumnDrag = (result: DropResult) => {
    setColumns(
      reorderList<ColumnInterface>(
        columns,
        result.source.index,
        (result.destination as DraggableLocation).index
      )
    );
  };

  const onDragEnd = (result: DropResult) => {
    setIsColumnTrashVisible(false);
    setIsCardTrashVisible(false);

    if (!result.destination) {
      return;
    }

    if (result.destination.droppableId === "column-trash") {
      setColumns(deleteColumnById(columns, result.draggableId));
      return;
    }

    if (result.destination.droppableId === "card-trash") {
      const cardId = result.draggableId;
      const columnId = result.source.droppableId;
      setColumns(deleteCardById(columns, columnId, cardId));
      return;
    }

    if (result.type === "card") {
      onCardDrag(result);
      return;
    }

    if (result.type === "column") {
      onColumnDrag(result);
      return;
    }
  };

  const onDragStart = (initial: DragStart, provided: ResponderProvided) => {
    if (initial.type === "column") {
      setIsColumnTrashVisible(true);
      return;
    }

    if (initial.type === "card") {
      setIsCardTrashVisible(true);
      return;
    }
  };

  const onDragUpdate = (initial: DragUpdate, provided: ResponderProvided) => {
    console.log(initial);
    if (
      initial.destination?.droppableId === "column-trash" ||
      initial.destination?.droppableId === "card-trash"
    ) {
      setIsTrashFocused(true);
    } else {
      setIsTrashFocused(false);
    }
  };

  return (
    <DragDropContext
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      <Header></Header>
      <Board>
        <Droppable droppableId="column-trash" type="column">
          {(provided, snapshot) => (
            <Trash
              ref={provided.innerRef}
              {...provided.droppableProps}
              isVisible={isColumnTrashVisible}
              isFocused={isTrashFocused}
            />
          )}
        </Droppable>
        <Droppable droppableId="card-trash" type="card">
          {(provided, snapshot) => (
            <Trash
              ref={provided.innerRef}
              {...provided.droppableProps}
              isVisible={isCardTrashVisible}
              isFocused={isTrashFocused}
            />
          )}
        </Droppable>
        <Droppable droppableId="board" direction="horizontal" type="column">
          {(provided, snapshot) => (
            <List ref={provided.innerRef} {...provided.droppableProps}>
              {columns.map((column, index) => (
                <Column
                  currentIndex={index}
                  key={column.id}
                  id={column.id}
                  title={column.title}
                  cards={column.cards}
                  addCard={addCard}
                  updateCard={updateCard}
                  editColumn={updateColumn}
                />
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
        <div>
          <AddNewColumn columns={columns} setColumns={setColumns} />
        </div>
      </Board>
    </DragDropContext>
  );
}
