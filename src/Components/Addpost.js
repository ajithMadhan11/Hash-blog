import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Navbar from "./Core/Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import Loader from "./Loader";
import { auth } from "../firebase";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import defaultpic from "../img/default.png";

const MainContainer = styled.div`
  display: flex;
  padding: 20px;
`;
const LeftForm = styled.div`
  height: fit-content;
  width: 55%;
  background: #ffffff;
  margin-right: 20px;
  box-shadow: 0px 0px 15px 2px rgba(0, 0, 0, 0.15);
  border-radius: 13px;
  @media (max-width: 768px) {
    width: 375px;
    /* padding: 10px; */
  }
`;
const RightView = styled.div`
  height: fit-content;
  width: 43%;
  background: #ffffff;
  box-shadow: 0px 0px 15px 2px rgba(0, 0, 0, 0.15);
  border-radius: 13px;
  @media (max-width: 768px) {
    display: none;
  }
`;
const Formcontainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
`;
const AddPostText = styled.p`
  font-size: 24px;
  font-weight: 800;
  padding: 5px;
  margin: 5px 20px 10px 20px;
`;
const Select = styled.select`
  background-color: #ffffff;
  font-size: 15px;
  border: 0.5px solid #cccccc;
  border-radius: 5px;
  width: 250px;
  height: 40px;
  padding: 5px;
  margin: 5px 20px 10px 20px;
  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
  &:focus {
    outline: none;
    border-radius: 5px;
    border: 1px solid #ec1971;
  }
  @media (max-width: 768px) {
    width: 280px;
    padding: 10px;
    margin: 5px 5px 10px 5px;
  }
`;
const QuillContainer = styled.div`
  margin: 5px 20px 10px 20px;
  @media (max-width: 768px) {
    margin: 5px 5px 10px 5px;
  }
`;
const Input = styled.input.attrs((props) => ({
  type: props.type,
}))`
  font-size: 15px;
  border: 0.5px solid #cccccc;
  border-radius: 5px;
  width: 640px;
  height: 40px;
  padding: 5px;
  margin: 5px 20px 10px 20px;
  &:focus {
    outline: none;
    border-radius: 5px;
    border: 1px solid #ec1971;
  }
  @media (max-width: 768px) {
    width: 260px;
    padding: 10px;
    margin: 5px 5px 10px 5px;
  }
`;
const InputFile = styled.input.attrs((props) => ({
  type: props.type,
}))`
  font-size: 15px;
  width: 650px;

  padding: 5px;
  margin: 5px 20px 5px 20px;
  @media (max-width: 768px) {
    width: 280px;

    margin: 5px 5px 10px 5px;
  }
`;
const Label = styled.p`
  font-size: 15px;
  padding: 5px;
  margin: 0px 20px 5px 20px;
  font-weight: 700;
  @media (max-width: 768px) {
    margin: 5px 5px 10px 5px;
  }
`;
const ViewCoverimage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;
const ViewContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const ViewCategory = styled.p`
  color: #ffffff;
  background-color: #ec1971;
  padding: 5px;
  border-radius: 50px;
  margin-top: 5px;
  font-size: 12px;
  font-weight: 600;
  width: fit-content;
`;
const ViewTitle = styled.p`
  font-weight: 700;
  font-size: 18px;
  margin-top: 5px;
`;
const Addpost = React.memo(function Addpost(props) {
  console.log(props);

  const [user, loading] = useAuthState(auth);
  const [state, setstate] = useState({
    image: "",
    category: "",
    title: "",
    tempUrl: "",
    error: "",
  });
  const [markup, setmarkup] = useState("");
  const { image, category, title, tempUrl, error } = state;
  useEffect(() => {
    if (loading) {
      return <Loader />;
    }
    if (user) {
      console.log(user);
    }
  }, [user, loading]);
  const handleChange = (name) => (e) => {
    e.preventDefault();
    if (name == "image") {
      setstate({
        ...state,
        image: e.target.files[0],
        tempUrl: URL.createObjectURL(e.target.files[0]),
      });
    } else {
      setstate({
        ...state,
        [name]: e.target.value,
      });
    }
  };
  const handleMarkup = (content) => {
    setmarkup(content);
  };
  return (
    <>
      <Navbar />
      <MainContainer>
        <LeftForm>
          <Formcontainer>
            <AddPostText>Add Post</AddPostText>
            <Label>Select Banner Image</Label>
            <InputFile
              type="file"
              accept="image/*"
              onChange={handleChange("image")}
            />
            <Label>Select category</Label>
            <Select onChange={handleChange("category")} value={category}>
              <option>Select Category</option>
              <option value="global">Global</option>
              <option value="health">Health</option>
              <option value="food">Food</option>
              <option value="tech">Tech</option>
              <option value="fasion">Fasion</option>
              <option value="other">Other</option>
            </Select>
            <Label>Enter Title</Label>
            <Input
              type="text"
              placeholder="Enter blog Title"
              value={title}
              onChange={handleChange("title")}
            />
            <Label>Enter Blog body</Label>
            <QuillContainer>
              <ReactQuill onChange={handleMarkup} value={markup} />
            </QuillContainer>
          </Formcontainer>
        </LeftForm>
        <RightView>
          <ViewContainer>
            <ViewCoverimage src={tempUrl || defaultpic} />
            <ViewCategory>{category}</ViewCategory>
            {title && <ViewTitle>{title}</ViewTitle>}
            <div></div>
          </ViewContainer>
        </RightView>
      </MainContainer>
    </>
  );
});

const mapStateToProps = (state) => ({
  auth: state.auth,
  data: state.data,
});
export default connect(mapStateToProps)(Addpost);
