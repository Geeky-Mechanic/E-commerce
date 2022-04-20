import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
flex: 4;
`;

const Title = styled.h1`

`;

const UserForm = styled.form`
display: flex;
flex-wrap: wrap;
`;

const Item = styled.div`
width: 400px;
display: flex;
flex-direction: column;
margin-top: 10px;
margin-right: 20px;
`;

const Label = styled.label`
margin-bottom: 10px;
font-style: 14px;
font-weight: 600;
color: grey;
`;

const Input = styled.input`
height: 20px;
padding: 10px;
border: 1px solid grey;
border-radius: 5px;
`;

const Gender = styled.div`

`;

const GenderInput = styled.input`
margin-top: 14px;
`;

const GenderLabel = styled.label`
margin: 10px;
font-style: 18px;
color: #555;
`;

const ActiveSelect = styled.select`
height: 40px;
border-radius: 5px;
`;

const ActiveOption = styled.option`

`;

const NewUserButton = styled.button`
width: 200px;
border: none;
background-color:darkblue;
color: white;
padding: 7px 10px;
font-weight: 600;
border-radius:10px;
margin-top: 30px;
cursor: pointer;
`;



const NewUser = () => {
  return (
    <Container>
        <Title>New User</Title>
        <UserForm>
            <Item>
                <Label>Username</Label>
                <Input type="text" placeholder="john" />
            </Item>
            <Item>
                <Label>Full Name</Label>
                <Input type="text" placeholder="John Smith" />
            </Item>
            <Item>
                <Label>Email</Label>
                <Input type="email" placeholder="John@gmail.com" />
            </Item>
            <Item>
                <Label>Password</Label>
                <Input type="password" placeholder="password" />
            </Item>
            <Item>
                <Label>Address</Label>
                <Input type="text" placeholder="NY" />
            </Item>
            <Item>
                <Label>Phone</Label>
                <Input type="text" placeholder="123 456 7891" />
            </Item> 
            <Item>
                <Label>Gender</Label>
                <Gender>
                    <GenderInput type="radio" name="gender" id="male" value="male" />
                    <GenderLabel for="male">Male</GenderLabel>
                    <GenderInput type="radio" name="gender" id="female" value="female" />
                    <GenderLabel for="female">Female</GenderLabel>
                    <GenderInput type="radio" name="gender" id="other" value="other" />
                    <GenderLabel for="other">Other</GenderLabel>
                </Gender>
            </Item> 
            <Item>
                <Label>Active</Label>
                <ActiveSelect  name="active" id="active" >
                    <ActiveOption value="yes" >Yes</ActiveOption>
                    <ActiveOption value="no" >No</ActiveOption>
                </ActiveSelect>
            </Item>  
            <NewUserButton>Create</NewUserButton>
        </UserForm>
    </Container>
  )
}

export default NewUser;