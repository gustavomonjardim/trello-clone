import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ebecf0;
  width: 272px;
  max-width: 272px;
  min-width: 272px;
  border-radius: 3px;
  overflow: none;
  padding: 0 8px 8px;
`;

export const Header = styled.div`
  padding: 10px;
  position: relative;
`;

export const CardList = styled.div``;

export const Footer = styled.div``;

export const Button = styled.button`
  width: 100%;
  color: #5e6c84;
  background-color: transparent;
  border-radius: 3px;
  padding: 8px;
  font-size: 14px;
  cursor: pointer;

  &:hover,
  &:focus {
    outline: none;
    background-color: rgba(9, 30, 66, 0.08);
    color: #172b4d;
  }
`;

export const Title = styled.h2`
  text-align: start;
  color: #172b4d;
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  min-height: 20px;
`;

export const Input = styled.textarea`
  width: 100%;
  background: #fff;
  border: none;
  border-radius: 3px;
  box-shadow: inset 0 0 0 2px #0079bf;
  resize: none;
  font-size: 14px;
  line-height: 20px;
  font-weight: 600px;
  padding: 4px 8px;
  min-height: 20px;
  display: block;

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
