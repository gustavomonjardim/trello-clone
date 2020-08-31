import React, { useState, useRef, useEffect } from "react";

import { useClickOutside } from "../../hooks";
import { Container, Title, Input, EditTitleButton } from "./styles";

interface Props {
  id: number;
  title: string;
  onSuccess: (id: number, title: string) => void;
  onDismiss?: () => void;
  newCard?: boolean;
}

const Card: React.FC<Props> = ({
  title,
  id,
  onSuccess,
  onDismiss,
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
          onChange={({ target }) => setCurrentTitle(target.value)}
          onKeyDown={onKeyDown}
        />
      )}
    </Container>
  );
};

export default Card;
