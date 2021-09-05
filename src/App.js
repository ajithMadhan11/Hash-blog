import "./App.css";
import Navbar from "./Components/Core/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CardComponent from "./Components/CardComponent";
import styled from "styled-components";
import CategoryCards from "./Components/CategoryCards";
import { Icon } from "@iconify/react";
import { useHistory } from "react-router";
import { useState, useEffect } from "react";
import firebase from "firebase/app";
import { connect } from "react-redux";
import { authUser, hashdata } from "./action";
import { database, auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Loader from "./Components/Loader";

const MainContainer = styled.div`
  background-color: #edf0f9;
  width: 100%;
  height: fit-content;
`;
const CardContainer = styled.div`
  padding: 10px 20px 30px 50px;
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 720px) {
    padding: 10px;
  }
`;
const CategoryContainer = styled.div`
  padding: 30px 90px 30px 90px;
  display: flex;
  justify-content: space-evenly;
  @media (max-width: 720px) {
    padding: 10px;
    flex-wrap: wrap;
  }
`;

const AddPostBtn = styled.button`
  border-radius: 50%;
  height: 70px;
  background-color: #ffdf35;
  width: 70px;
  position: fixed;
  border: none;
  bottom: 20px;
  right: 20px;
  &:hover {
    cursor: pointer;
  }
`;

function App(props) {
  const [user, loading, error] = useAuthState(auth);

  const history = useHistory();
  const categories = ["global", "tech", "food", "health", "fashion", "others"];
  const [uid, setuid] = useState("");

  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       setuid(user.uid);
  //       props.dispatch(
  //         authUser({
  //           authenticated: true,
  //           uid: user.uid,
  //           error: "",
  //           isLoaded: true,
  //         })
  //       );
  //     } else {
  //       props.dispatch(
  //         authUser({
  //           authenticated: false,
  //           uid: "",
  //           error: "",
  //           isLoaded: false,
  //         })
  //       );
  //     }
  //   });
  // }, []);
  useEffect(() => {
    if (loading) {
      console.log(loading);
      return <Loader />;
    }
    if (user) {
      console.log(user);
      setuid(user.uid);
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

  useEffect(() => {
    if (uid) {
      const docRef = database.collection("users").doc(uid);
      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            props.dispatch(
              hashdata({
                data: "",
                user: doc.data(),
                error: "",
                isLoaded: true,
              })
            );
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    }
  }, [uid]);

  const addpost = () => {
    history.push("/add");
  };
  console.log(props);

  return (
    <>
      <Navbar />
      <MainContainer>
        <CategoryContainer>
          {categories.map((categoy) => (
            <CategoryCards category={categoy} total={40} />
          ))}
        </CategoryContainer>
        <CardContainer>
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
        </CardContainer>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <AddPostBtn onClick={addpost}>
          <Icon
            icon="ri:quill-pen-line"
            color="#ffffff"
            width="35"
            height="35"
          />
        </AddPostBtn>
      </MainContainer>
    </>
  );
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  data: state.data,
});
export default connect(mapStateToProps)(App);
