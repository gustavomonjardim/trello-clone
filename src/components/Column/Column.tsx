import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { Draggable, Droppable } from "react-beautiful-dnd";

import Card, { NewCard } from "../Card";
import { useClickOutside } from "../../hooks";

import { Card as CardInterface } from "../../types";

import {
  Container,
  Header,
  CardList,
  Title,
  Button,
  Input,
  EditTitleButton
} from "./styles";

interface AddNewCardProps {
  addCard: (card: CardInterface, columnId: string) => void;
  columnId: string;
}

interface ColumnProps {
  id: string;
  title: string;
  cards: CardInterface[];
  addCard: (card: CardInterface, columnId: string) => void;
  updateCard: (card: CardInterface, columnId: string) => void;
  editColumn: (id: string, title: string) => void;
  currentIndex: number;
}

interface NewColumnProps {
  onSuccess: (id: string, title: string) => void;
  onDismiss: () => void;
}

export const NewColumn: React.FC<NewColumnProps> = ({
  onSuccess,
  onDismiss
}) => {
  const [currentTitle, setCurrentTitle] = useState("");

  const ref = useRef<HTMLTextAreaElement>();

  useClickOutside(ref, () => {
    onDismiss();
  });

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSuccess(uuidv4(), currentTitle);
    }
    if (e.key === "Escape") {
      setCurrentTitle("");
      onDismiss();
    }
  };

  return (
    <Container>
      <Header>
        <Title>{currentTitle}</Title>
        <Input
          autoFocus
          isEditing
          ref={ref as any}
          rows={1}
          spellCheck={false}
          value={currentTitle}
          onChange={({ target }) => setCurrentTitle(target.value)}
          onKeyDown={onKeyDown}
        />
      </Header>
    </Container>
  );
};

const AddNewCard: React.FC<AddNewCardProps> = ({ addCard, columnId }) => {
  const [isAddingCard, setIsAddingCard] = useState(false);

  const cancelCardAddition = () => {
    setIsAddingCard(false);
  };

  const onSuccess = (id: string, title: string) => {
    addCard({ id, title }, columnId);

    setIsAddingCard(false);
  };

  if (isAddingCard) {
    return (
      <>
        <NewCard onSuccess={onSuccess} onDismiss={cancelCardAddition} />
      </>
    );
  }

  return (
    <Button onClick={() => setIsAddingCard(true)}>
      Adicionar outro cartão
    </Button>
  );
};

const Column: React.FC<ColumnProps> = ({
  id,
  title,
  cards,
  addCard,
  updateCard,
  editColumn,
  currentIndex
}) => {
  const [currentTitle, setCurrentTitle] = useState(title);
  const [isEditing, setIsEditing] = useState(false);

  const ref = useRef<HTMLTextAreaElement>();

  useClickOutside(ref, () => {
    if (isEditing) {
      setIsEditing(false);
    }
  });

  useEffect(() => {
    if (isEditing) {
      ref?.current?.focus?.();
      ref?.current?.select?.();
    } else {
      ref?.current?.blur?.();
    }
  }, [isEditing]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setIsEditing(false);
      editColumn(id, currentTitle);
    }
    if (e.key === "Escape") {
      setCurrentTitle(title);
      setIsEditing(false);
    }
  };

  const editCardTitle = (cardId: string, title: string) => {
    updateCard({ id: cardId, title }, id);
  };

  return (
    <Draggable draggableId={id} index={currentIndex}>
      {(provided, snapshot) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Header>
            <Title>{currentTitle}</Title>
            {!isEditing && (
              <>
                <EditTitleButton
                  onClick={() => {
                    setIsEditing(true);
                  }}
                />
              </>
            )}
            <Input
              isEditing={isEditing}
              ref={ref as any}
              rows={1}
              spellCheck={false}
              value={currentTitle}
              onChange={({ target }) => setCurrentTitle(target.value)}
              onKeyDown={onKeyDown}
            />
          </Header>
          <Droppable droppableId={id} type="card">
            {(provided, snapshot) => (
              <CardList ref={provided.innerRef} {...provided.droppableProps}>
                {cards.map((card, index) => (
                  <Card
                    currentIndex={index}
                    key={card.id}
                    id={card.id}
                    title={card.title}
                    editCard={editCardTitle}
                  />
                ))}
                {provided.placeholder}
              </CardList>
            )}
          </Droppable>
          <AddNewCard addCard={addCard} columnId={id} />
        </Container>
      )}
    </Draggable>
  );
};

export default Column;
