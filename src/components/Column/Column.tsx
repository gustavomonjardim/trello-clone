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

const Column = () => {
  const [title, setTitle] = useState("To do");
  const [isShowingInput, setIsShowingInput] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [cards, setCards] = useState<Card[]>([
    { id: "1", title: "Criar clone do Trello" }
  ]);

  useEffect(() => {
    const onClick = () => {
      if (isShowingInput) {
        setIsShowingInput(false);
      }
      if (isAddingCard) {
        setIsAddingCard(false);
      }
    };
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
    };
  }, [isShowingInput, isAddingCard]);

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
            editTitle={editCardTitle}
          />
        ))}
      </CardList>
      <Footer>
        {!isAddingCard && (
          <Button onClick={() => setIsAddingCard(true)}>
            Adicionar outro cartão
          </Button>
        )}
      </Footer>
    </Container>
  );
};

export default Column;
