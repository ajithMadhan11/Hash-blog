import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Navbar from "./Core/Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import Loader from "./Loader";
import { auth } from "../firebase";

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

const Addpost = React.memo(function Addpost(props) {
  console.log(props);

  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (loading) {
      console.log(loading);
      return <Loader />;
    }
    if (user) {
      console.log(user);
    }
  }, [user, loading]);

  return (
    <>
      <Navbar />
      <MainContainer>
        <LeftForm />
        <RightView />
      </MainContainer>
    </>
  );
});

const mapStateToProps = (state) => ({
  auth: state.auth,
  data: state.data,
});
export default connect(mapStateToProps)(Addpost);
