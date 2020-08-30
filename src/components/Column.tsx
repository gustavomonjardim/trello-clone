import React, { useState, useEffect, TextareaHTMLAttributes } from "react";

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

const Column = () => {
  const [title, setTitle] = useState("To do");
  const [isShowingInput, setIsShowingInput] = useState(false);

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

  const onPressEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      setIsShowingInput(false);
    }
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
            onKeyDown={onPressEnter}
          />
        )}
      </Header>
      <CardList />
      <Footer>
        <Button>Adicionar outro cartão</Button>
      </Footer>
    </Container>
  );
};

export default Column;
