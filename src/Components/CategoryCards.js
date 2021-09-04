import React from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";

const Container = styled.div`
  width: 120px;
  height: 40px;
  background: #ffffff;
  box-shadow: 0px 0px 4px 3px #e0e6fb;
  border-radius: 21px;
  display: flex;
  align-items: center;
  font-weight: 600;
  justify-content: space-around;
  @media (max-width: 720px) {
    padding: 3px 1px px 3px;
    margin: 2px;
  }
  &:hover {
    cursor: pointer;
  }
`;
const Span = styled.span`
  background-color: #ec1971;
  color: #ffffff;
  border-radius: 50%;
  padding: 2px;
  width: fit-content;
  height: fit-content;
  text-align: center;
  display: flex;
  justify-content: center;
`;
const CategoryCards = ({ category, total }) => {
  const categoryIcon = {
    global: "ant-design:global-outlined",
    tech: "bx:bx-code-alt",
    food: "fluent:food-pizza-24-filled",
    health: "ic:round-health-and-safety",
    fashion: "pepicons:dress-print",
    others: "gg:media-podcast",
  };
  return (
    <Container>
      <Icon
        icon={categoryIcon[category]}
        color="#777777"
        width="20"
        height="20"
      />
      <p>{category}</p>
      <Span>{total}</Span>
    </Container>
  );
};

export default CategoryCards;
