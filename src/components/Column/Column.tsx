import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

import Card from "../Card";
import { useClickOutside } from "../../hooks";
import { Droppable } from "react-beautiful-dnd";

import { Card as CardInterface } from "../../App";

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
  cards: CardInterface[];
  setCards?: (card: CardInterface, columnId: number) => void;
  columnId: number;
}

interface ColumnProps {
  id: number;
  title: string;
  cards: CardInterface[];
  setCards?: (card: CardInterface, columnId: number) => void;
  newColumn?: boolean;
  onSuccess: (id: number, title: string) => void;
  onDismiss?: () => void;
}

const AddNewCard: React.FC<AddNewCardProps> = ({
  cards,
  setCards,
  columnId
}) => {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCard, setNewCard] = useState<CardInterface>({
    id: uuidv4(),
    title: ""
  });

  const cancelCardAddition = () => {
    setIsAddingCard(false);
    setNewCard((c) => ({ ...c, title: "" }));
  };

  const addCard = (id: string, title: string) => {
    if (typeof setCards === "function") {
      setCards({ id, title }, columnId);
    }
    setIsAddingCard(false);
    setNewCard({ id: id + 1, title: "" });
  };

  if (isAddingCard) {
    return (
      <>
        <Card
          columnId={columnId}
          newCard
          currentIndex={0}
          id={newCard.id}
          title={newCard.title}
          onSuccess={addCard}
          onDismiss={cancelCardAddition}
        />
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
  newColumn = false,
  id,
  title,
  cards,
  setCards,
  onSuccess,
  onDismiss
}) => {
  const [currentTitle, setCurrentTitle] = useState(title);
  const [isEditing, setIsEditing] = useState(newColumn);

  const ref = useRef<HTMLTextAreaElement>();

  useClickOutside(ref, () => {
    if (isEditing) {
      setIsEditing(false);

      if (typeof onDismiss === "function") {
        onDismiss();
      }
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
      onSuccess(id, currentTitle);
    }
    if (e.key === "Escape") {
      setCurrentTitle(title);
      setIsEditing(false);
      if (typeof onDismiss === "function") {
        onDismiss();
      }
    }
  };

  const editCardTitle = (cardId: string, title: string) => {
    if (typeof setCards === "function") {
      setCards({ id: cardId, title }, id);
    }
  };

  return (
    <Container>
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
      <Droppable droppableId={`${id}`} type="Column">
        {(provided, snapshot) => (
          <CardList
            ref={provided.innerRef}
            style={{}}
            {...provided.droppableProps}
          >
            {cards.map((card, index) => (
              <Card
                currentIndex={index}
                columnId={id}
                key={card.id}
                id={card.id}
                title={card.title}
                onSuccess={editCardTitle}
              />
            ))}
            {provided.placeholder}
          </CardList>
        )}
      </Droppable>
      {!newColumn && (
        <AddNewCard cards={cards} setCards={setCards} columnId={id} />
      )}
    </Container>
  );
};

export default Column;
