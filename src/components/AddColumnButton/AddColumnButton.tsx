import React from "react";

import { Container, IconContainer } from "./styles";

import PlusIcon from "../../assets/PlusIcon";

interface Props {
  onClick: () => void;
  isFirst: boolean;
}

const AddColumnButton: React.FC<Props> = ({ onClick, isFirst }) => {
  return (
    <Container onClick={onClick}>
      <IconContainer>
        <PlusIcon />
      </IconContainer>
      <span>{isFirst ? "Adicionar uma lista" : "Adicionar outra lista"}</span>
    </Container>
  );
};

export default AddColumnButton;
