import React, { useState } from 'react'
import styled from 'styled-components';
import { mobile, laptop } from '../responsive';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/apiCalls';

const Container = styled.div`
width: 100vw;
height: 100vh;
background: linear-gradient(
    rgba(255,255,255,0.5), 
    rgba(255,255,255,0.5)), 
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
    center;
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: cover;
`;
const Wrapper = styled.div`
padding: 20px;
width: 40%;
background-color: white;
${laptop({width: "60%"})};
${mobile({width: "75%"})};
`;
const Title = styled.h1`
font-size: 24px;
font-weight: 300;
`;

const Form = styled.form`
display: flex;
flex-wrap: wrap;
`;

const Input = styled.input`
flex: 1;
min-width: 40%;
margin: 20px 10px 0 0;
padding: 10px;
`;
const Agreement = styled.span`
font-size: 12px;
margin: 20px 0;
`;
const Button = styled.button`
width: 40%;
border:none;
padding: 15px 20px;
background-color: teal;
color: white;
cursor: pointer;
&:disabled{
  background-color: lightgrey;
  cursor: not-allowed;
}
`;

const Error = styled.span`
  color: red;
`;

const Register = () => {

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    
    const dispatch = useDispatch();

    const {isFetching, error} = useSelector(state => state.user);

    const handleClick = (e) => {
        e.preventDefault();
        register(dispatch, {username, email, password})
    }

  return (
    <Container>
        <Wrapper>
            <Title>CREATE AN ACCOUNT</Title>
            <Form>
                <Input placeholder="name" value={name} onChange={(e)=> setName(e.target.value)}/>
                <Input placeholder="last name" value={lastName} onChange={(e)=> setLastName(e.target.value)} />
                <Input placeholder="username" value={username} onChange={(e)=> setUsername(e.target.value)} />
                <Input placeholder="email" value={email}onChange={(e)=> setEmail(e.target.value)} />
                <Input type="password" value={password} placeholder="password" onChange={(e)=> setPassword(e.target.value)} />
                <Input type="password" value={confPassword} placeholder="confirm password" onChange={(e)=> setConfPassword(e.target.value)} />
                {password === confPassword ? null : <Error>Passwords are not the same</Error> }
                <Agreement>
                    By creating an account, I consent to the processing of my personal
                    data in accordance with the <b>PRIVACY POLICY</b>
                </Agreement>
                <Button onClick={handleClick} disabled={isFetching || password !== confPassword}>REGISTER</Button>
                {error && <Error>Something went wrong...</Error>}
            </Form>
        </Wrapper>
    </Container>
  )
}

export default Register;