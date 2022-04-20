import { Visibility } from '@mui/icons-material';
import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { userRequest } from '../reqMethods';

const Container = styled.div`
flex: 1;
-webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
padding: 20px;
margin-right: 20px;
`;

const Title = styled.span`
font-size: 32px;
font-weight: 600;
`;

const List = styled.ul`
margin: 0;
padding: 0;
list-style: none;
`;

const ListItem = styled.li`
display: flex;
align-items: center;
justify-content: space-between;
margin: 20px 0;
`;

const Image = styled.img`
width: 40px;
height: 40px;
border-radius: 50%;
object-fit: cover;
`;

const User = styled.div`
display: flex;
flex-direction: column;
`;

const Username = styled.span`
font-weight: 600;
`;

const JobTitle = styled.span`
font-weight: 300;
`;

const Button = styled.button`
display: flex;
align-items: center;
border: none;
border-radius: 10px;
padding: 7px 10px;
background-color: #eeeef7;
cursor: pointer;
color: #555;
`;

const visibilityIcon = {
    fontSize: "16px",
    marginRight: "5px",
}

const WidgetSmall = () => {

    const [users, setUsers] = useState([]);

    useEffect(()=> {
        
        const getUsers = async () => {
            try {
            const res = await userRequest.get("users/?new=true");
            setUsers(res.data);
        }catch(err){
            console.log(err);
        }
        }
        getUsers();
    },[])

  return (
    <Container>
        <Title>New members</Title>
        <List>
        {users.map((user)=>(
            <ListItem key={user._id}>
                <Image  
                src={user.img || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif" }
                alt=""/>
                <User>
                    <Username>
                        {user.username}
                    </Username>
                </User>
                <Button>
                    <Visibility style={visibilityIcon} />
                    Display
                </Button>
            </ListItem>
            ))}
        </List>
    </Container>
  )
}

export default WidgetSmall;