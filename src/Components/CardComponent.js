import React from "react";
import styled from "styled-components";
import sample from "../img/sm3.jpeg";
import Ajith from "../img/ajith.jpeg";
import { Icon } from "@iconify/react";

const MainContainer = styled.div`
  width: 350px;
  height: 450px;
  background: #ffffff;
  border: 1px solid #982525;
  box-sizing: border-box;
  border-radius: 20px;
  margin: 40px;
  padding: 7px;
  @media (max-width: 720px) {
    margin: 10px;
  }
  &:hover {
    cursor: pointer;
  }
`;
const CoverImage = styled.img`
  width: 100%;
  height: 60%;
  border-radius: 20px;
  object-fit: cover;
`;
const Title = styled.p`
  font-size: 15px;
  font-weight: 700;
  margin: 10px 10px 5px 10px;
`;
const Description = styled.p`
  font-size: 15px;
  margin: 0px 10px 5px 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
`;

const CardFooter = styled.div`
  display: flex;
  margin: 0px 10px 5px 10px;
  align-items: center;
  justify-content: space-between;
`;
const CreatorConatainer = styled.div`
  display: flex;
`;
const UserProfile = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;
const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 5px;
`;
const UserName = styled.p`
  margin-top: 2px;
  font-size: 15px;
  font-weight: 700;
`;
const UserDate = styled.p`
  margin-top: 2px;
  font-size: 11px;
  font-weight: 600;
  color: #777777;
`;
const FooterAligns = styled.div`
  display: flex;
  justify-content: space-between;
`;
const PostDetails = styled.div`
  display: flex;
  margin: 0px 5px 0px 5px;
  justify-content: center;
  align-items: center;
`;
const CardComponent = () => {
  return (
    <>
      <MainContainer>
        <CoverImage src={sample} />
        <Title>
          Lorem Ipsum is simply of dummy text of the and at printing and of
          typesetting
        </Title>
        <Description>
          when an unknown printer took a galley of type and scrambled it to make
          a type specimen book. It has survived not only five centuries...
        </Description>
        <CardFooter>
          <CreatorConatainer>
            <UserProfile src={Ajith} />
            <UserDetails>
              <UserName>Ajithmadhan</UserName>
              <UserDate>Mar 11,2021</UserDate>
            </UserDetails>
          </CreatorConatainer>
          <FooterAligns>
            <PostDetails>
              <Icon
                icon="flat-color-icons:like"
                color="#777"
                width="20"
                height="20"
              />
              <span> &nbsp;201</span>
            </PostDetails>
            <PostDetails>
              <Icon
                icon="fluent:comment-24-filled"
                color="#3F83A9"
                width="20"
                height="20"
              />
              <span> &nbsp;21</span>
            </PostDetails>
            <PostDetails>
              <Icon
                icon="emojione:grinning-face-with-big-eyes"
                color="#777"
                width="20"
                height="20"
              />
              <span> &nbsp;261</span>
            </PostDetails>
          </FooterAligns>
        </CardFooter>
      </MainContainer>
    </>
  );
};

export default CardComponent;
