import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  min-height: 60px;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
  margin-bottom: 8px;
  padding: 6px 8px;
  overflow: hidden;
`;

export const Title = styled.span`
  font-size: 14px;
  flex-grow: 1;
  font-weight: 400;
  line-height: 20px;
  text-align: start;
  word-break: break-all;
`;

export const Input = styled.textarea`
  flex-grow: 1;
  font-family: sans-serif;
  width: 100%;
  background: #fff;
  border: none;
  border-radius: 3px;
  resize: none;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  min-height: 20px;
  display: block;
  overflow: hidden;

  ::placeholder {
    font-weight: 400;
    color: #838da1;
  }

  &:focus {
    outline: none;
  }
`;

export const EditTitleButton = styled.div`
  cursor: pointer;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const DeleteButton = styled.button`
  align-self: flex-start;
  position: relative;
  color: #42526e;
  background-color: transparent;
  padding: 4px;
  border-radius: 3px;
  margin-top: -2px;
  margin-right: -4px;
  opacity: 0.8;

  :hover {
    opacity: 1;
    color: #172b4d;
    background-color: rgba(9, 30, 66, 0.08);
  }
`;
