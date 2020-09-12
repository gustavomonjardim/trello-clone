import React, { useMemo, useCallback, useContext } from "react";
import { Card, Column } from "../types";
import {
  updateColumnById,
  addCardToColumn,
  updateCardById,
  deleteColumnById,
  deleteCardById
} from "../utils/listUtils";
import useLocalStorage from "../hooks/useLocalStorage";

interface Context {
  columns: Column[];
  setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
  addColumn: (id: string, title: string) => void;
  updateColumn: (id: string, title: string) => void;
  deleteColumn: (id: string) => void;
  addCard: (newCard: Card, columnId: string) => void;
  updateCard: (newCard: Card, columnId: string) => void;
  deleteCard: (columnId: string, cardId: string) => void;
}

const BoardContext = React.createContext<Context | undefined>(undefined);

const BoardProvider: React.FC = ({ children }) => {
  const [columns, setColumns] = useLocalStorage<Column[]>("board", []);

  const addColumn = useCallback(
    (id: string, title: string) => {
      setColumns([...columns, { id, title, cards: [] }]);
    },
    [setColumns, columns]
  );

  const updateColumn = useCallback(
    (id: string, title: string) => {
      setColumns(updateColumnById(columns, { id, title }));
    },
    [setColumns, columns]
  );

  const deleteColumn = useCallback(
    (id: string) => {
      setColumns(deleteColumnById(columns, id));
    },
    [setColumns, columns]
  );

  const addCard = useCallback(
    (newCard: Card, columnId: string) => {
      setColumns(addCardToColumn(columns, columnId, newCard));
    },
    [setColumns, columns]
  );

  const updateCard = useCallback(
    (newCard: Card, columnId: string) => {
      setColumns(updateCardById(columns, columnId, newCard));
    },
    [setColumns, columns]
  );

  const deleteCard = useCallback(
    (columnId: string, cardId: string) => {
      setColumns(deleteCardById(columns, columnId, cardId));
    },
    [setColumns, columns]
  );

  const defaultValue = useMemo(
    () => ({
      columns,
      setColumns,
      addColumn,
      updateColumn,
      deleteColumn,
      addCard,
      updateCard,
      deleteCard
    }),
    [
      columns,
      setColumns,
      addColumn,
      updateColumn,
      deleteColumn,
      addCard,
      updateCard,
      deleteCard
    ]
  );
  return (
    <BoardContext.Provider value={defaultValue}>
      {children}
    </BoardContext.Provider>
  );
};

function useBoard() {
  const context = useContext(BoardContext);
  if (context === undefined) {
    throw new Error(`useBoard must be used within a BoardProvider`);
  }
  return context;
}

export { BoardProvider, useBoard };
