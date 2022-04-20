import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Home from './pages/Home';
import UserList from './pages/UserList';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import User from './pages/User';
import NewUser from './pages/NewUser';
import ProductList from './pages/ProductList';
import Product from './pages/Product';
import NewProduct from './pages/NewProduct';
import Login from './pages/Login';


const Container = styled.div`
margin-top: 10px;
`;  

const Body = styled.div`
display: flex;
`;  


function App() {

  const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
  const currentUser = user && JSON.parse(user).currentUser;
  const admin = currentUser?.isAdmin;

const navigate = useNavigate();

useEffect(()=> {
  if(!admin){
    navigate("/login", {replace: true});
  }
}, [admin, navigate])

  return (
      <Container>
        <Topbar />
        <Body>
          <Sidebar />
          <Routes>
            <Route exact path="/" element={<Home />}/>
            <Route exact path="/login" element={<Login />}/>
            <Route exact path="/users" element={<UserList />}/>
            <Route exact path="/user/:userId" element={<User />}/>
            <Route exact path="/newuser" element={<NewUser />}/>
            <Route exact path="/newproduct" element={<NewProduct />}/>
            <Route exact path="/products" element={<ProductList />}/>
            <Route exact path="/product/:productId" element={<Product />}/>
          </Routes>
        </Body>
      </Container>
  )
}

export default App;