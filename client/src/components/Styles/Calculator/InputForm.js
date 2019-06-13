import styled from "styled-components";

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  font-size: 12px;
  width: 100%;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const InputLeft = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InputRight = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BigContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  text-align: center;
  height: 40px;
`;

export const Results = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Input1 = styled.input`
  display: flex;
  text-align: right;
  width: 100px;
  height: 20px;
  background-color: rgb(231, 229, 248);
  border-radius: 5px;
  border: 1px solid black;
`;

export const Result = styled.div`
  text-align: right;
  width: 100px;
  height: 20px;
  background-color: rgb(211, 209, 231);
  border-radius: 5px;
  border: 1px solid black;
`;