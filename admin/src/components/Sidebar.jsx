import { 
    LineStyle,
    Timeline,
    TrendingUp,
    PermIdentity,
    Storefront,
    AttachMoney,
    BarChart,
    MailOutline,
    DynamicFeed,
    ChatBubbleOutline,
    WorkOutline,
    Report, } from '@mui/icons-material';
import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';


const Container = styled.div`
flex: 1;
height: calc(100vh - 60px);
position: sticky;
top: 60px;
`;

const Wrapper = styled.div`
padding: 5px;
`;

const Menu = styled.div`
margin-bottom: 10px;
`;

const Title = styled.h3`
font-size: 17px;
color: rgb(187,186,186);
`;

const List = styled.ul`
list-style: none;
padding: 5px;
`;

const ListItem = styled.li`
padding: 5px;
cursor: pointer;
display: flex;
align-items: center;
border-radius: 10px;
&:hover, &:active{
background-color: rgb(228,228,250);
}
`;

const sidebarIcon = {
    marginRight: "5px",
    fontSize: "20px"
}

const link = {
textDecoration: "none",
color: "inherit",
};

const Sidebar = () => {
  return (
    <Container>
        <Wrapper>
            <Menu>
                <Title>
                    Dashboard
                </Title>
                <List>
                    <Link to="/" style={link}>
                    <ListItem>
                        <LineStyle style={sidebarIcon} /> Home
                    </ListItem>
                    </Link>
                    <ListItem>
                        <Timeline style={sidebarIcon}/> Analystics
                    </ListItem>
                    <ListItem>
                        <TrendingUp style={sidebarIcon}/> Sales
                    </ListItem>
                </List>
            </Menu>
            <Menu>
                <Title>
                    Quick Menu
                </Title>
                <List>
                    <Link to="/users" style={link}>
                    <ListItem>
                        <PermIdentity style={sidebarIcon} /> Users
                    </ListItem>
                    </Link>
                    <Link to="/products" style={link}>
                    <ListItem>
                        <Storefront style={sidebarIcon}/> Products
                    </ListItem>
                    </Link>
                    <ListItem>
                        <AttachMoney style={sidebarIcon}/> Transactions
                    </ListItem>
                    <ListItem>
                        <BarChart style={sidebarIcon}/> Reports
                    </ListItem>
                </List>
            </Menu>
            <Menu>
                <Title>
                    Notifications
                </Title>
                <List>
                    <ListItem>
                        <MailOutline style={sidebarIcon} /> Mail
                    </ListItem>
                    <ListItem>
                        <DynamicFeed style={sidebarIcon}/> Feedback
                    </ListItem>
                    <ListItem>
                        <ChatBubbleOutline style={sidebarIcon}/> Messages
                    </ListItem>
                </List>
            </Menu>
            <Menu>
                <Title>
                    Staff
                </Title>
                <List>
                    <ListItem>
                        <WorkOutline style={sidebarIcon} /> Manage
                    </ListItem>
                    <ListItem>
                        <Timeline style={sidebarIcon}/> Analystics
                    </ListItem>
                    <ListItem>
                        <Report style={sidebarIcon}/> Reports
                    </ListItem>
                </List>
            </Menu>
        </Wrapper>
    </Container>
  )
}

export default Sidebar;