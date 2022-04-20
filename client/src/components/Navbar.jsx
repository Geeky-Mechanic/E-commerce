import React, { useState } from 'react';
import styled from 'styled-components';
/* ---->  Responsiveness  <---- */
import { mobile } from '../responsive.js';
/* ---->  MUI - Icons  <---- */
import {Search, ShoppingCartOutlined, Menu} from '@mui/icons-material';
/* ---->  MUI - Badge  <---- */
import Badge from '@mui/material/Badge';
/* ---->  Hooks  <---- */
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

/* ---->  General  <---- */

const Container = styled.div`
height: 60px;
${mobile({height: "50px"})};
`;

const Wrapper = styled.div`
padding: 10px 20px;
display: flex;
justify-content: space-between;
align-items: center;
${mobile({padding: "10px 0"})};
`;

/* ---->  Left side  <---- */

const Left = styled.div`
flex: 1;
display: flex;
align-items: center;
`;

const Language = styled.span`
font-size: 14px;
cursor: pointer;
${mobile({display: "none"})};
`;

const SearchContainer = styled.div`
border: 0.5px solid lightgray;
display: flex;
align-items: center;
margin-left: 25px;
padding: 5px;
`;

const Input = styled.input`
border: none;
${mobile({width: "50px"})}
`;

/* ---->  Center  <---- */

const Center = styled.div`
flex: 1;
text-align: center;
`;

const Logo = styled.h1`
font-weight: bold;
${mobile({fontSize: "24px", margin: "auto"})};
`;

/* ---->  Right side  <---- */

const Right = styled.div`
flex: 1;
display: flex;
align-items: center;
justify-content: flex-end;
${mobile({justifyContent: "center"})}
`;

const MenuItem = styled.div`
font-size: 14px;
cursor: pointer;
margin-left: 25px;
//${mobile({fontSize: "12px", marginLeft: "10px"})}
${mobile({display: "none"})};
`;

/* --->  hamburger subsection  <--- */

const HamburgerContainer = styled.span`
cursor:pointer;
display: none;
${mobile({
 display: "inline",
 marginLeft: "60%",
 width: "80%",
 })};
`;

const DropDown = styled.div`
display:${props => props.activated ? "flex" : "none"};
width: 100vw;
position: sticky;
overflow-y: hidden;
z-index: 2 ; 
background-color: #eeeef7;
text-align: center;
justify-content: center;
transition: all 0.5s ease;
flex-direction: column;
`;

const DropDownItem = styled.div`
margin-top: 10px;
font-size: 1.3rem;
padding: 5px;
border-bottom: 1px solid lightgrey;
cursor: pointer;
`;



const Navbar = () => {

    /* ---->  Update badge number dynamically with redux  <---- */
    const quantity = useSelector(state=>state.cart.quantity);

    const [toggled, setToggle] = useState(false);

    const toggleBurger = () => {
        if(toggled === true){
            setToggle(false);
        } else {
            setToggle(true);
        }
    }


  return (
    <Container>
        <Wrapper>
            <Left>
                <Language>
                EN
                </Language>
                <SearchContainer>
                <Input placeholder="Search"/>
                    <Search style={{color:"grey", fontSize:16}} />
                </SearchContainer>
            </Left>
            <Center>
                <Link to="/" style={{textDecoration: "none", color: "black"}}>
                <Logo>
                    Ecommerce
                </Logo>
                </Link>
            </Center>
            <Right>
                <Link to="/register" style={{textDecoration: "none", color: "black"}}>
                <MenuItem>
                    REGISTER
                </MenuItem>
                </Link>
                <Link to="/login" style={{textDecoration: "none", color: "black"}}>
                <MenuItem>
                    LOGIN
                </MenuItem>
                </Link>
                <Link to="/cart">
                    <MenuItem>
                        <Badge badgeContent={quantity} color="primary">
                            <ShoppingCartOutlined color="action" />
                        </Badge>
                    </MenuItem>
                </Link>
                    <HamburgerContainer onClick={toggleBurger}>
                        <Menu />
                    </HamburgerContainer>
            </Right>
        </Wrapper>
        <DropDown activated={toggled}>
        <Link to="/login" style={{textDecoration: "none", color: "black"}}>
            <DropDownItem>
                Login
            </DropDownItem>
            </Link>
            <Link to="/register" style={{textDecoration: "none", color: "black"}}>
            <DropDownItem>
                Register
            </DropDownItem>
            </Link>
            <DropDownItem>
            <Link to="/cart">
                        <Badge badgeContent={quantity} color="primary">
                            <ShoppingCartOutlined color="action" />
                        </Badge>
                    </Link>
            </DropDownItem>
        </DropDown>
    </Container>
  )
}

export default Navbar;