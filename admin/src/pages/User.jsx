import React from 'react'
import styled from 'styled-components';
import { CalendarToday, LocationSearching, MailOutline, PermIdentity, PhoneAndroid, Publish } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Container = styled.div`
flex: 4;
padding: 20px;
`;

const TitleContainer = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`;

const UserTitle = styled.h3`

`;

const UserContainer = styled.div`
display: flex;
margin-top: 20px;
`;

/* ---->  Shows current selected user info section  <---------------------------------- */  

const UserInfo = styled.div`
flex: 1;
padding: 20px;
-webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;  

/* --->  top subsection  <--- */

const TopInfo = styled.div`
display: flex;
align-items: center;
`;

const TopImage = styled.img`
width: 40px;
height: 40px;
border-radius: 50%;
object-fit: cover;
`;

const TopTitle = styled.div`
display: flex;
flex-direction: column;
margin-left: 20px;
`;

const UserName = styled.span`
font-weight: 600;
`;

const UserJobTitle = styled.span`
font-weight: 300;
`;

/* --->  bottom subsection  <--- */

const BottomInfo = styled.div`
margin-top: 20px;
`;

const BottomTitle = styled.span`
font-size: 14px;
font-weight: 600;
color: rgb(175,170,170);
`;

const UserDetails = styled.span`
margin-left: 10px;
`;  

const InfoContainer = styled.div`
display: flex;
align-items: center;
margin: 20px 0;
color: #444;
`;

const iconStyle = {
fontSize: "16px",
};

/* ---->  Form to update users info section  <---------------------------------- */

const UserUpdate = styled.div`
flex: 2;
padding: 20px;
-webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
margin-left: 20px;
`;

const AddButton = styled.button`
width: 80px;
border: none;
padding: 5px;
background-color: teal; 
border-radius: 5px;
cursor: pointer;
color: white;
font-size: 16px;
`;

const UpdateTitle = styled.span`
font-style: 24px;
font-weight: 600;
`;

const UpdateForm = styled.form`
display: flex;
justify-content: space-between;
margin-top: 20px;
`;

/* --->  Left Form subsection  <--- */

const UpdateLeft = styled.div`

`;

const UpdateItem = styled.div`
display: flex;
flex-direction: column;
margin-top: 10px;
`;

const UpdateLabel = styled.label`
margin-bottom: 5px;
font-style: 40px;
`;

const UpdateInput = styled.input`
border: none;
width: 250px;
height: 30px;
border-bottom: 1px solid grey;
`;

/* --->  Right form subsection  <--- */

const UpdateRight = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
`;

const UpdateUpload = styled.div`
display: flex;
align-items: center;
`;

const UpdateImage = styled.img`
width: 100px;
height: 100px;
border-radius: 10px;
object-fit: cover;
margin-right: 20px;
`;

const UploadInput = styled.input`

`;

const UpdateButton = styled.button`
border-radius: 5px;
border: none;
padding: 5px;
cursor: pointer;
background-color: darkblue;
color: white;
font-weight: 600;
`;

const updateIcon = {
 cursor: "pointer;",
}

const User = () => {
  return (
    <Container>
        <TitleContainer>
            <UserTitle>Edit User</UserTitle>
            <Link to="/newuser">
              <AddButton>Create</AddButton>
            </Link>
        </TitleContainer>
        <UserContainer>
          <UserInfo>
            <TopInfo>
              <TopImage 
              src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt="" />
              <TopTitle>
                <UserName>Anna Becker</UserName>
                <UserJobTitle>Software engineer</UserJobTitle>
              </TopTitle>
            </TopInfo>
            <BottomInfo>
              <BottomTitle>Account Details</BottomTitle>
              <InfoContainer>
                <PermIdentity style={iconStyle}/>
                <UserDetails>annabeck99</UserDetails>
              </InfoContainer>
              <InfoContainer>
                <CalendarToday style={iconStyle}/>
                <UserDetails>1980-01-01</UserDetails>
              </InfoContainer>
              <BottomTitle>Contact Details</BottomTitle>
              <InfoContainer>
                <MailOutline style={iconStyle}/>
                <UserDetails>annabeck@gmail.com</UserDetails>
              </InfoContainer>
              <InfoContainer>
                <PhoneAndroid style={iconStyle}/>
                <UserDetails>+1 123 456 7891</UserDetails>
              </InfoContainer>
              <InfoContainer>
                <LocationSearching style={iconStyle}/>
                <UserDetails>New-York|USA</UserDetails>
              </InfoContainer>
            </BottomInfo>
          </UserInfo>



          <UserUpdate>
            <UpdateTitle>Edit</UpdateTitle>
              <UpdateForm>
                <UpdateLeft> 
                  <UpdateItem>
                    <UpdateLabel>Username</UpdateLabel>
                    <UpdateInput 
                    type="text" 
                    placeholder="annabeck99"/>
                  </UpdateItem>
                  <UpdateItem>
                    <UpdateLabel>Full Name</UpdateLabel>
                    <UpdateInput 
                    type="text" 
                    placeholder="Anna Beck"/>
                  </UpdateItem>
                  <UpdateItem>
                    <UpdateLabel>Email</UpdateLabel>
                    <UpdateInput 
                    type="text" 
                    placeholder="annabeck@gmail.com"/>
                  </UpdateItem>
                  <UpdateItem>
                    <UpdateLabel>Phone</UpdateLabel>
                    <UpdateInput 
                    type="text" 
                    placeholder="+1 123 456 7891"/>
                  </UpdateItem>
                  <UpdateItem>
                    <UpdateLabel>Address</UpdateLabel>
                    <UpdateInput 
                    type="text" 
                    placeholder="New-York|USA"/>
                  </UpdateItem>
                </UpdateLeft>




                <UpdateRight>
                    <UpdateUpload>
                      <UpdateImage
                      src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                      alt=""
                      />
                      <UpdateLabel htmlFor='file'><Publish style={updateIcon} /></UpdateLabel>
                      <UploadInput style={{display: "none"}} type="file" id="file" />
                    </UpdateUpload>
                    <UpdateButton>Update</UpdateButton>
                </UpdateRight>
              </UpdateForm>
          </UserUpdate>
        </UserContainer>
    </Container>
  )
}

export default User;