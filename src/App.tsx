import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import "./styles.css";

import Column, { NewColumn } from "./components/Column";
import AddColumnButton from "./components/AddColumnButton";

export interface Card {
  id: string;
  title: string;
}

export interface Column {
  id: string;
  title: string;
  cards: Card[];
}

interface AddNewColumnProps {
  columns: Column[];
  setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
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

  return <AddColumnButton onClick={() => setIsAddingColumn(true)} />;
};

export default function App() {
  const [columns, setColumns] = useState<Column[]>([
    { id: "1", title: "Teste", cards: [] },
    { id: "2", title: "Teste", cards: [] }
  ]);

  const editColumnTitle = (id: string, title: string) => {
    setColumns(
      columns.map((column) =>
        column.id === id ? { ...column, title } : column
      )
    );
  };

  const updateCard = (newCard: Card, columnId: string) => {
    setColumns(
      columns.map((column) =>
        column.id === columnId
          ? {
              ...column,
              cards: column.cards.map((card) =>
                card.id === newCard.id ? newCard : card
              )
            }
          : column
      )
    );
  };

  const addCard = (newCard: Card, columnId: string) => {
    setColumns(
      columns.map((column) =>
        column.id === columnId
          ? {
              ...column,
              cards: [...column.cards, newCard]
            }
          : column
      )
    );
  };

  const reorder = (list: Card[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result: DropResult) => {
    const sourceColumnIndex = columns.findIndex(
      (column) => column.id === result.source.droppableId
    );
    const sourceCardIndex = Number(result.source.index);
    const card = { ...columns[sourceColumnIndex].cards[sourceCardIndex] };

    if (!result.destination) {
      return;
    }

    const destinationColumnIndex = columns.findIndex(
      (column) => column.id === result.destination?.droppableId
    );
    const destinationCardIndex = result.destination.index;

    if (sourceColumnIndex === destinationColumnIndex) {
      setColumns(
        columns.map((column, index) =>
          index === sourceColumnIndex
            ? {
                ...column,
                cards: reorder(
                  column.cards,
                  sourceCardIndex,
                  destinationCardIndex
                )
              }
            : column
        )
      );
      return;
    }

    setColumns(
      columns.map((column, index) => {
        if (index === sourceColumnIndex) {
          return {
            ...column,
            cards: column.cards.filter(
              (ccard, cindex) => cindex !== sourceCardIndex
            )
          };
        }
        if (index === destinationColumnIndex) {
          const temp = [...column.cards];
          temp.splice(destinationCardIndex, 0, card);

          return {
            ...column,
            cards: temp
          };
        }
        return column;
      })
    );
  };

  return (
    <div className="App">
      <DragDropContext onDragEnd={onDragEnd}>
        {columns.map((column) => (
          <Column
            key={column.id}
            id={column.id}
            title={column.title}
            cards={column.cards}
            addCard={addCard}
            updateCard={updateCard}
            editColumn={editColumnTitle}
          />
        ))}
        <AddNewColumn columns={columns} setColumns={setColumns} />
      </DragDropContext>
    </div>
  );
}
