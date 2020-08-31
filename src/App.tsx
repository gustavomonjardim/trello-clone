import React, { useState } from "react";
import "./styles.css";

import Column from "./components/Column";
import AddColumnButton from "./components/AddColumnButton";

interface Column {
  id: number;
  title: string;
}

interface AddNewColumnProps {
  columns: Column[];
  setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
}

const AddNewColumn: React.FC<AddNewColumnProps> = ({ columns, setColumns }) => {
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [newColumn, setNewColumn] = useState<Column>({
    id: columns.length + 1,
    title: ""
  });

  const cancelCardAddition = () => {
    setIsAddingColumn(false);
    setNewColumn((c) => ({ ...c, title: "" }));
  };

  const addCard = (id: number, title: string) => {
    setColumns([...columns, { id, title }]);
    setIsAddingColumn(false);
    setNewColumn({ id: id + 1, title: "" });
  };

  if (isAddingColumn) {
    return (
      <>
        <Column
          newColumn
          id={newColumn.id}
          title={newColumn.title}
          onSuccess={addCard}
          onDismiss={cancelCardAddition}
        />
      </>
    );
  }

  return <AddColumnButton onClick={() => setIsAddingColumn(true)} />;
};

export default function App() {
  const [columns, setColumns] = useState<Column[]>([]);

  const editColumnTitle = (id: number, title: string) => {
    setColumns(
      columns.map((column) =>
        column.id === id ? { ...column, title } : column
      )
    );
  };

  return (
    <div className="App">
      {columns.map((column) => (
        <Column
          key={column.id}
          id={column.id}
          title={column.title}
          onSuccess={editColumnTitle}
        />
      ))}
      <AddNewColumn columns={columns} setColumns={setColumns} />
    </div>
  );
}
