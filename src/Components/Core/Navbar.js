import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import Ajith from "../../img/ajith.jpeg";
import firebase from "firebase/app";
import { connect } from "react-redux";
import { authUser } from "../../action";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import Loader from "../Loader";

const NavbarConatainer = styled.div`
  width: 100%;
  height: 80px;
  background-color: #ffffff;
  box-shadow: 0px 0px 20px -2px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Logo = styled.div`
  background-color: #ffffff;
`;
const Hashtext = styled.p`
  margin-left: 20px;
  font-family: "Pacifico", cursive;
  font-size: 25px;
  color: #ec1971;
  @media (max-width: 720px) {
    font-size: 18px;
  }
`;
const BlogText = styled.span`
  font-family: "Pacifico", cursive;
  color: #000000;
  font-size: 25px;
  @media (max-width: 720px) {
    font-size: 18px;
  }
`;
const Otherside = styled.div`
  margin-left: 40px;
  margin-right: 40px;
  display: flex;
`;
const SocialContainer = styled.div`
  display: flex;
  margin-left: 40px;
  margin-right: 40px;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 720px) {
    display: none;
  }
`;
const Profile = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;
const IconConatainer = styled.div`
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  color: #ec1971;
  &:hover {
    cursor: pointer;
  }
`;
const LoginBtn = styled.p`
  font-size: 15px;
  display: flex;
  align-items: center;
  font-weight: 800;
  &:hover {
    cursor: pointer;
  }
`;
const Navbar = (props) => {
  const history = useHistory();

  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      props.dispatch(
        authUser({
          authenticated: true,
          uid: user.uid,
          error: "",
          isLoaded: true,
        })
      );
    }
  }, [user, loading]);

  const signoutFromApp = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        props.dispatch(
          authUser({
            authenticated: false,
            uid: "",
            error: "",
            isLoaded: true,
          })
        );
      })
      .catch((error) => {
        toast.error(error.errorMessage, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const navSignin = () => {
    history.push("/signin");
  };

  return (
    <NavbarConatainer>
      <Logo>
        <Hashtext>
          Hash<BlogText> Blog</BlogText>
        </Hashtext>
      </Logo>
      <Otherside>
        <SocialContainer>
          <IconConatainer>
            <Icon icon="logos:linkedin-icon" width="25" height="25" />
          </IconConatainer>
          <IconConatainer>
            <Icon icon="icon-park:github" width="25" height="25" />
          </IconConatainer>
        </SocialContainer>
        {props.auth.authenticated ? (
          <>
            <IconConatainer onClick={signoutFromApp}>
              &nbsp;Logout
            </IconConatainer>
            <Profile src={props.data.user.profileUrl || Ajith} />
          </>
        ) : (
          <IconConatainer onClick={navSignin}>
            <Icon
              icon="heroicons-outline:logout"
              color="#ec1971"
              width="25"
              height="25"
            />
            &nbsp;Login
          </IconConatainer>
        )}
      </Otherside>
    </NavbarConatainer>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  data: state.data,
});
export default connect(mapStateToProps)(Navbar);
