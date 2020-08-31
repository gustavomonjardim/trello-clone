import React, { useState, useEffect, useRef } from "react";

import Card from "../Card";
import { useClickOutside } from "../../hooks";

import {
  Container,
  Header,
  CardList,
  Title,
  Button,
  Input,
  EditTitleButton
} from "./styles";

interface Card {
  id: number;
  title: string;
}

interface AddNewCardProps {
  cards: Card[];
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
}

interface ColumnProps {
  id: number;
  title: string;
  newColumn?: boolean;
  onSuccess: (id: number, title: string) => void;
  onDismiss?: () => void;
}

const AddNewCard: React.FC<AddNewCardProps> = ({ cards, setCards }) => {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCard, setNewCard] = useState<Card>({
    id: cards.length + 1,
    title: ""
  });

  const cancelCardAddition = () => {
    setIsAddingCard(false);
    setNewCard((c) => ({ ...c, title: "" }));
  };

  const addCard = (id: number, title: string) => {
    setCards([...cards, { id, title }]);
    setIsAddingCard(false);
    setNewCard({ id: id + 1, title: "" });
  };

  if (isAddingCard) {
    return (
      <>
        <Card
          newCard
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
  onSuccess,
  onDismiss
}) => {
  const [currentTitle, setCurrentTitle] = useState(title);
  const [isEditing, setIsEditing] = useState(newColumn);
  const [cards, setCards] = useState<Card[]>([]);

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

  const editCardTitle = (id: number, title: string) => {
    setCards(cards.map((card) => (card.id === id ? { ...card, title } : card)));
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
          value={currentTitle}
          onChange={({ target }) => setCurrentTitle(target.value)}
          onKeyDown={onKeyDown}
        />
      </Header>
      <CardList>
        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            title={card.title}
            onSuccess={editCardTitle}
          />
        ))}
      </CardList>
      {!newColumn && <AddNewCard cards={cards} setCards={setCards} />}{" "}
    </Container>
  );
};

export default Column;
