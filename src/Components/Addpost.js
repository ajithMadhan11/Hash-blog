import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Navbar from "./Core/Navbar";

const MainContainer = styled.div`
  display: flex;
  padding: 20px;
`;

const LeftForm = styled.div`
  height: 100vh;
  width: 55%;
  background: #ffffff;
  box-shadow: 0px 0px 15px 2px rgba(0, 0, 0, 0.15);
  border-radius: 13px;
`;
const RightView = styled.div`
  height: 100vh;
  width: 40%;
  background: #ffffff;
  box-shadow: 0px 0px 15px 2px rgba(0, 0, 0, 0.15);
  border-radius: 13px;
`;

const Addpost = (props) => {
  return (
    <>
      <Navbar />
      <MainContainer>
        <LeftForm />
        <RightView />
      </MainContainer>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  data: state.data,
});
export default connect(mapStateToProps)(Addpost);
