import React ,{useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../Core/Navbar'
import Loader from '../Loader';
import firebase from "firebase/app";
import { connect } from 'react-redux';
import { authUser } from '../../action';
import { database } from '../../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainConatainer = styled.div`
background-color: #EDF0F9;
width: 100%;
height: 90vh;
display: flex;
justify-content: center;
`
const LoginContainer = styled.div`
background-color: #ffffff;
width: 38%;
height: fit-content;
margin-top:20px;
@media (max-width: 768px) {
      width: 330px;
      padding: 10px;
    }
`
const Title = styled.p`
font-size: 25px;
font-weight: 600;
margin:20px 20px 10px 20px;
`
const Label = styled.p`
font-size: 17px;
font-weight: 300;
margin:10px 20px 10px 20px;
`

const Input = styled.input.attrs((props) => ({
    type: props.type,
  }))`
    font-size: 15px;
    border: 1px solid grey;
    border-radius: 5px;
    width: 450px;
    height: 40px;
    padding: 5px;
    margin: 5px 20px 10px 20px;
    &:focus {
      outline: none;
      border-radius: 5px;
      border: 1px solid #EC1971;
    }
    @media (max-width: 768px) {
      width: 280px;
      padding: 10px;
    }
  `;


const Submitbtn = styled.button`
    border:none;
    color:#ffffff;
    border-radius: 5px;
    font-weight: 800;
    margin: 15px 20px 10px 20px;
    width: 464px;
    background-color: #EC1971;
    padding:15px;
    &:hover{
    cursor:pointer;
    background-color: #BE0D58;

}
    @media (max-width: 768px) {
        width: 300px;
    }
`
const AlterText = styled.p`
font-size:15px;
color:#000000;
font-weight: 600;
text-align: center;
margin-top: 15px;
margin-bottom: 20px;
@media (max-width: 768px) {
    
    text-align: center;
    }
`
const Span = styled.span`
font-size:15px;
color:#EC1971;
font-weight: 800;
&:hover{
    cursor:pointer;
    }
`

const Signup = (props) => {
    const history = useHistory()
    const [btnText,setbtnText] = useState('Signup')
    const [state, setstate] = useState({
        name:'',
        email:'',
        password:''
    });
    const {name,email,password} = state;

    const handleChange = name => e =>{
        e.preventDefault();
        setstate({...state,[name]:e.target.value})
    }
    const adduser = async(e)=>{

        e.preventDefault();

        if(name==''||email==''||password==''){
           return toast.error("Please fill all the fields 😕", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        }
        setbtnText("Creating user ...")
        await firebase.auth().createUserWithEmailAndPassword(email, password)
                .then( (user) => {
                    database.collection("users").doc(user.uid).set({
                        name: name,
                        email:user.user.email,
                        joinedOn:Date.now(),
                    })
                    .then(() => {
                        toast.success('Added user 🥳', {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            });

                            setstate({
                                name:'',
                                email:'',
                                password:''
                            });

                            setbtnText('Signup')

                            props.dispatch(authUser({
                                authenticated: true,
                                uid: user.user.uid,
                                error: "",
                                isLoaded: true,
                            }))
                            history.push('/')
                    })                
                    .catch((error) => {
                        setbtnText('Signup')
                        props.dispatch(authUser({
                            authenticated: false,
                            uid: '',
                            error: error,
                            isLoaded: true,
                        }))
                        toast.error(error, {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            });
                    });
             })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    toast.error(errorMessage, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                });
              
    }
    return (
        <>
         <Navbar/>
         <MainConatainer>
           <LoginContainer>
               <Title>Signup</Title>
               <Label>Name</Label>
               <Input type="text" placeholder="Enter your name" value={name} onChange={handleChange('name')}/>
               <Label>Email ID</Label>
               <Input type="text" placeholder="Enter your email" value={email} onChange={handleChange('email')}/>
               <Label>Password</Label>
               <Input type="password" placeholder="Enter your password" value={password} onChange={handleChange('password')}/>
               <Submitbtn onClick={adduser}>{btnText}</Submitbtn>
               <AlterText>Already a user? <Span><Link style={{border:'none',color:'#EC1971'}} to="/signin">Login</Link></Span></AlterText>
           </LoginContainer>

       </MainConatainer>
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
        <ToastContainer />

        </>
      
    );
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    data:state.data
  });
export default connect(mapStateToProps)(Signup);
