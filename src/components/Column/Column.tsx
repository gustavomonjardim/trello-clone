import React, { useState, useEffect, useRef, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { Draggable, Droppable } from "react-beautiful-dnd";

import Card, { NewCard } from "../Card";
import { useClickOutside } from "../../hooks";
import PlusIcon from "../../assets/PlusIcon";
import { useBoard } from "../../context/BoardContext";
import TrashIcon from "../../assets/TrashIcon";

import { ColumnProps, NewColumnProps } from "./types";

import {
  Container,
  Header,
  CardList,
  Title,
  Button,
  Input,
  EditTitleButton,
  IconContainer,
  DeleteButton
} from "./styles";

export const NewColumn: React.FC<NewColumnProps> = ({
  onSuccess,
  onDismiss
}) => {
  const [currentTitle, setCurrentTitle] = useState("");

  const ref = useRef<HTMLTextAreaElement>();

  useClickOutside(ref, () => {
    onDismiss();
  });

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = ref.current.scrollHeight + "px";
    }
  }, [currentTitle]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (currentTitle) {
        onSuccess(uuidv4(), currentTitle);
      }
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
          placeholder="Insira o título da lista..."
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

let cardListRef: HTMLDivElement | null = null;

const Column: React.FC<ColumnProps> = ({ id, title, cards, currentIndex }) => {
  const { updateColumn, deleteColumn, addCard } = useBoard();
  const [currentTitle, setCurrentTitle] = useState(title);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const ref = useRef<HTMLTextAreaElement>();

  const cardListRefCallback = useCallback((node: HTMLDivElement | null) => {
    if (node !== null) {
      cardListRef = node;
    }
  }, []);

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

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = ref.current.scrollHeight + "px";
    }
  }, [currentTitle]);

  useEffect(() => {
    if (cardListRef) {
      cardListRef.scrollTop = cardListRef.scrollHeight;
    }
  }, [isAddingCard]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setIsEditing(false);
      updateColumn(id, currentTitle);
    }
    if (e.key === "Escape") {
      setCurrentTitle(title);
      setIsEditing(false);
    }
  };

  const onNewCardDissmiss = () => {
    setIsAddingCard(false);
  };

  const onNewCardSuccess = (cardId: string, title: string) => {
    addCard({ id: cardId, title }, id);
    setIsAddingCard(false);
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
            <DeleteButton onClick={() => deleteColumn(id)}>
              <TrashIcon />
            </DeleteButton>
          </Header>
          <Droppable droppableId={id} type="card">
            {(provided, snapshot) => (
              <CardList
                ref={(realRef) => {
                  provided.innerRef(realRef);
                  cardListRefCallback(realRef);
                }}
                {...provided.droppableProps}
              >
                {cards.map((card, index) => (
                  <Card
                    columnId={id}
                    currentIndex={index}
                    key={card.id}
                    id={card.id}
                    title={card.title}
                  />
                ))}
                {isAddingCard && (
                  <NewCard
                    onSuccess={onNewCardSuccess}
                    onDismiss={onNewCardDissmiss}
                  />
                )}
                {provided.placeholder}
              </CardList>
            )}
          </Droppable>
          {!isAddingCard && (
            <Button onClick={() => setIsAddingCard(true)}>
              <IconContainer>
                <PlusIcon />
              </IconContainer>
              <span>
                {cards?.length >= 1
                  ? "Adicionar outro cartão"
                  : "Adicionar um cartão"}
              </span>
            </Button>
          )}
        </Container>
      )}
    </Draggable>
  );
};

export default Column;
