import React from 'react'
import styled from 'styled-components';
import { NotificationsNone, Language, Settings } from '@mui/icons-material';
import { Badge } from '@mui/material';

const Container = styled.div`
    width: 100%;
    height: 50px;
    backgroung-color: white;
    padding: 5px 0;
    position: sticky;
    top: 0;
    z-index: 999;
`;

const Wrapper = styled.div`
height: 100%;
padding: 0 20px;
display: flex;
align-items: center;
justify-content: space-between;
`;

/* ---->  Left side elements  <---- */

const Left = styled.div`

`;  

const Logo = styled.span`
font-weight: bold;
font-size: 30px;
color: darkcyan;
cursor: pointer;
`;

/* ---->  Right side elements  <---- */

const Right = styled.div`
display: flex;
align-items: center;
height: 100%;
`;

const IconContainer = styled.div`
cursor: pointer;
margin-right: 10px;
`;

const ImageContainer = styled.div`
height: 100%;
`;

const TopAvatar = styled.img`
height: 80%;
border-radius: 50%;
cursor: pointer;
`;

function Topbar() {
  return (
    <Container>
        <Wrapper>
            <Left>
                <Logo>
                    Admin Panel
                </Logo>
            </Left>
            <Right>
                <IconContainer>
                    <Badge badgeContent={2} color="secondary">
                        <NotificationsNone />
                    </Badge>  
                </IconContainer>
                <IconContainer>
                    <Language />
                </IconContainer>
                <IconContainer>
                    <Settings />
                </IconContainer>
                <ImageContainer>
                    <TopAvatar 
                    src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    alt="avatar picture"
                    />
                </ImageContainer>
                
            </Right>
        </Wrapper>
    </Container>
  )
}

export default Topbar;