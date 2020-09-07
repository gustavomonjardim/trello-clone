import styled, { css } from "styled-components";

interface TrashProps {
  isVisible: boolean;
  isFocused: boolean;
}

export const Board = styled.div`
  position: relative;
  flex: 1;
  box-sizing: border-box;
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 12px;
  margin-bottom: 12px;
  overflow-x: auto;
  overflow-y: auto;

  ::-webkit-scrollbar {
    height: 12px;
  }

  ::-webkit-scrollbar-track {
    background: #0367a3;
    border-radius: 3px;
    margin: 0 12px;
  }

  ::-webkit-scrollbar-thumb {
    background: #72a4c7;
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #72a4c7;
  }
`;

export const Header = styled.header`
  height: 40px;
  width: 100%;
  background-color: #0567a3;
  margin-bottom: 12px;
`;

export const List = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-start;
  height: 100%;
`;

export const Trash = styled.div<TrashProps>`
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100px;
  height: 100px;
  background-color: ${(props) => (props.isFocused ? "green" : "red")};
  z-index: 1000;
  transition: all 0.2s ease-in-out;
  transform: scale(1);

  ${(props) =>
    props.isFocused &&
    css`
      transform: scale(1.2);
    `};
`;
