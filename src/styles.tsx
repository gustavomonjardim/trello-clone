import styled from "styled-components";

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
  overflow: auto;

  ::-webkit-scrollbar {
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #0367a3;
    border-radius: 3px;
    margin: 12px;
  }

  ::-webkit-scrollbar-thumb {
    background: #72a4c7;
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #72a4c7;
  }

  ::-webkit-scrollbar:vertical {
    display: none;
  }

  ::-webkit-scrollbar-corner {
    display: none;
  }
`;

export const Header = styled.header`
  height: 40px;
  width: 100%;
  background-color: #0567a3;
  margin-bottom: 12px;
  display: flex;
  justify-content: flex-end;
  padding: 4px;
`;

export const List = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-start;
  height: 100%;
`;
