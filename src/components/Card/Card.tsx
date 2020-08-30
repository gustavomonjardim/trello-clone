import React, { useState, useEffect } from "react";

import { Container, Title, Input, EditTitleButton } from "./styles";

interface Props {
  id: string;
  title: string;
  onSuccess: (id: string, title: string) => void;
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

  useEffect(() => {
    const onClick = () => {
      if (isEditing) {
        setIsEditing(false);
      }
    };
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
    };
  }, [isEditing]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
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
          rows={1}
          value={currentTitle}
          autoFocus
          onChange={({ target }) => setCurrentTitle(target.value)}
          onKeyDown={onKeyDown}
        />
      )}
    </Container>
  );
};

export default Card;
