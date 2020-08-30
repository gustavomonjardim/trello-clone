import React, { useState, useEffect } from "react";

import { Container, Title, Input, EditTitleButton } from "./styles";

interface Props {
  id: string;
  title: string;
  editTitle: (id: string, title: string) => void;
}

const Card: React.FC<Props> = ({ title, id, editTitle }) => {
  const [isEditing, setIsEditing] = useState(false);

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
    if (e.key === "Enter" || e.key === "Escape") {
      setIsEditing(false);
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
          value={title}
          autoFocus
          onChange={({ target }) => editTitle(id, target.value)}
          onKeyDown={onKeyDown}
        />
      )}
    </Container>
  );
};

export default Card;
