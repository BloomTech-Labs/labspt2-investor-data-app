import styled from "styled-components";

export const CardBlock = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  flex-wrap: wrap;
  width: 100%;
  height: 140px;
  margin: 0px auto 0px auto;
  color: black;
  font-weight: 500;
  font-size: 8px;
  border: 1px solid purple;
  border-radius: 10px;
`;

export const ColBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  color: black;
  font-weight: 500;
  font-size: 8px;
  border: 1px solid blue;
  border-radius: 10px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: auto;
  margin-right: auto;
  width: auto;
`;

export const Loading = styled.div`
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
`;
export const TickerContainer = styled.div`
  color: #000;
  margin: 20px;
`;

export const StockSymbol = styled.div`
  font-weight: bold;
  font-size: 1rem;
`;

export const Star = styled.div`
  //   display: flex;
  //   flex-wrap: wrap;
  //   align-items: center;
  font-size: 1rem;
  color: #daa520;
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  font-size: 12px;
  width: 100%;
`;