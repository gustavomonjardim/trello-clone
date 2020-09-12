import styled from "styled-components";

interface InputProps {
  readonly isEditing: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ebecf0;
  width: 272px;
  max-width: 272px;
  min-width: 272px;
  max-height: 100%;
  border-radius: 3px;
  padding: 0 4px 8px;
  margin-right: 12px;
`;

export const CardList = styled.div`
  min-height: 1px;
  height: 100%;
  overflow-y: auto;
  padding: 0 4px;
  margin-bottom: 4px;

  ::-webkit-scrollbar {
    width: 4px;
  }
  /* Track */
  ::-webkit-scrollbar-track {
    background: #dadbe2;
    border-radius: 5px;
    margin: 0 12px;
  }
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #bfc3cd;
    border-radius: 5px;
  }
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #bfc3cd;
  }
`;

export const Button = styled.button`
  display: flex;
  align-items: flex-end;
  color: #5e6c84;
  background-color: transparent;
  border-radius: 3px;
  padding: 4px 8px;
  margin: 0 4px;
  font-size: 14px;
  cursor: pointer;

  & > span {
    line-height: 20px;
  }

  &:hover,
  &:focus {
    outline: none;
    background-color: rgba(9, 30, 66, 0.08);
    color: #172b4d;
  }
`;

export const Header = styled.div`
  padding: 8px 4px;
  position: relative;
  display: flex;
`;

export const Title = styled.h2`
  display: none;
  text-align: start;
  color: #172b4d;
  font-size: 14px;
  line-height: 14px;
  font-weight: 600;
  min-height: 20px;
  padding: 8px;
  margin: 0;
`;

export const Input = styled.textarea<InputProps>`
  font-family: sans-serif;
  width: 100%;
  color: #172b4d;
  background: ${({ isEditing }) => (isEditing ? "#fff" : "transparent")};
  border: none;
  border-radius: 3px;
  box-shadow: ${({ isEditing }) =>
    isEditing ? "inset 0 0 0 2px #0079bf" : "none"};
  resize: none;
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  min-height: 20px;
  padding: 4px 8px;
  margin: 0;
  display: block;
  transition: all 0.1s linear;

  ::placeholder {
    font-weight: 400;
    color: #838da1;
  }

  &:focus {
    outline: none;
  }
`;

export const IconContainer = styled.div`
  margin-right: 4px;
  height: 20px;
  opacity: 0.8;
  display: flex;
  color: #5e6c84;
`;

export const EditTitleButton = styled.div`
  cursor: pointer;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 4px;
`;

export const DeleteButton = styled.button`
  align-self: flex-start;
  position: relative;
  color: #42526e;
  background-color: transparent;
  padding: 4px;
  border-radius: 3px;
  opacity: 0.8;

  :hover {
    opacity: 1;
    color: #172b4d;
    background-color: rgba(9, 30, 66, 0.08);
  }
`;
