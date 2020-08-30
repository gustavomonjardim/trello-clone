import React, { useState, useEffect } from "react";

import Card from "../Card";

import {
  Container,
  Header,
  CardList,
  Footer,
  Title,
  Button,
  Input,
  EditTitleButton
} from "./styles";

interface Card {
  id: string;
  title: string;
}

interface AddNewCardProps {
  cards: Card[];
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
}

const AddNewCard: React.FC<AddNewCardProps> = ({ cards, setCards }) => {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCard, setNewCard] = useState<Card>({
    id: String(cards.length + 1),
    title: ""
  });

  const cancelCardAddition = () => {
    setIsAddingCard(false);
    setNewCard((c) => ({ ...c, title: "" }));
  };

  const addCard = (id: string, title: string) => {
    setCards([...cards, { id, title }]);
    setIsAddingCard(false);
    setNewCard({ id: String(id + 1), title: "" });
  };

  useEffect(() => {
    const onClick = () => {
      if (isAddingCard) {
        setIsAddingCard(false);
      }
    };
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
    };
  }, [isAddingCard]);

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

const Column = () => {
  const [title, setTitle] = useState("To do");
  const [isShowingInput, setIsShowingInput] = useState(false);
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    const onClick = () => {
      if (isShowingInput) {
        setIsShowingInput(false);
      }
    };
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
    };
  }, [isShowingInput]);

  const onTitleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" || e.key === "Escape") {
      setIsShowingInput(false);
    }
  };

  const editCardTitle = (id: string, title: string) => {
    setCards(cards.map((card) => (card.id === id ? { ...card, title } : card)));
  };

  return (
    <Container>
      <Header>
        {!isShowingInput && (
          <>
            <EditTitleButton
              onClick={() => {
                setIsShowingInput(true);
              }}
            />
            <Title>{title}</Title>
          </>
        )}
        {isShowingInput && (
          <Input
            rows={1}
            value={title}
            autoFocus
            onChange={({ target }) => setTitle(target.value)}
            onKeyDown={onTitleKeyDown}
          />
        )}
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
      <Footer>
        <AddNewCard cards={cards} setCards={setCards} />
      </Footer>
    </Container>
  );
};

export default Column;
