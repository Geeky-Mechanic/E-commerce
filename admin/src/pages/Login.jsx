import React, { useState }from 'react'
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { login } from '../redux/apiCalls';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
display: flex;
flex-direction: column;
flex: 4;
padding-left: 100px;
padding-top: 100px;
`;  

const Input = styled.input`
margin-bottom: 20px;
padding: 5px;
width: 200px;
`;

const Button = styled.button`
background-color: darkblue;
color: white;
border: none;
border-radius: 10px;
padding: 5px;
width: 200px;
cursor: pointer;
`;

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.preventDefault();
        login(dispatch, {username, password});
        navigate("/", {replace: true})
    };


  return (
    <Container>
        <Input 
        type="text" 
        placeholder="username" 
        value={username} 
        onChange={e=>setUsername(e.target.value)}/>
        <Input 
        placeholder="password" 
        type="password" 
        value={password} 
        onChange={e=>setPassword(e.target.value)} />
        <Button onClick={handleClick}>Login</Button>
    </Container>
  )
}

export default Login;