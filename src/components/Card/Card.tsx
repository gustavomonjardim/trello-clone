import React, { useState, useRef, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";

import { useClickOutside } from "../../hooks";
import { Container, Title, Input, EditTitleButton } from "./styles";

interface Props {
  id: string;
  title: string;
  onSuccess: (id: string, title: string) => void;
  onDismiss?: () => void;
  newCard?: boolean;
  columnId: number;
  currentIndex: number;
}

const Card: React.FC<Props> = ({
  title,
  id,
  onSuccess,
  onDismiss,
  columnId,
  currentIndex,
  newCard = false
}) => {
  const [currentTitle, setCurrentTitle] = useState(title);
  const [isEditing, setIsEditing] = useState(newCard);

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
    }
  }, [isEditing]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (currentTitle) {
        setIsEditing(false);
        onSuccess(id, currentTitle);
      }
    }
    if (e.key === "Escape") {
      setCurrentTitle(title);
      setIsEditing(false);
      if (typeof onDismiss === "function") {
        onDismiss();
      }
    }
  };

  if (newCard) {
    return (
      <Container>
        {!isEditing && (
          <>
            <EditTitleButton
              onClick={() => {
                setIsEditing(true);
              }}
            />
            <Title>{title}</Title>
          </>
        )}
        {isEditing && (
          <Input
            ref={ref as any}
            rows={1}
            value={currentTitle}
            spellCheck={false}
            onChange={({ target }) => setCurrentTitle(target.value)}
            onKeyDown={onKeyDown}
          />
        )}
      </Container>
    );
  }

  return (
    <Draggable draggableId={id + "-" + columnId} index={currentIndex}>
      {(provided, snapshot) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {!isEditing && (
            <>
              <EditTitleButton
                onClick={() => {
                  setIsEditing(true);
                }}
              />
              <Title>{title}</Title>
            </>
          )}
          {isEditing && (
            <Input
              ref={ref as any}
              rows={1}
              value={currentTitle}
              spellCheck={false}
              onChange={({ target }) => setCurrentTitle(target.value)}
              onKeyDown={onKeyDown}
            />
          )}
        </Container>
      )}
    </Draggable>
  );
};

export default Card;
