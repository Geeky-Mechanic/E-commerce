import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { userRequest, publicRequest } from '../reqMethods';
import styled from 'styled-components';


const Container = styled.div`
height: 100vh;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;

const Button = styled.button`
margin-top: 10px;
border:none;
padding: 15px 20px;
background-color: teal;
color: white;
cursor: pointer;
`;


const Success = (props) => {

    const location = useLocation();
    const data = location.state.stripeData;
    const cart = location.state.cart;
    const currentUser = useSelector(state=>state.user.currentUser);
    console.log(currentUser);
    const [orderId, setOrderId] = useState(null);

    useEffect(()=> {
        const createOrder = async () => {
            try {
                const res = userRequest.post("/orders",{
                    userId: currentUser._id,
                    products: cart.products.map((item)=>({
                        productId: item._id,
                        quantity: item.quantity,
                    })),
                    amount: cart.total,
                    address: data.billing_details.address,
                });
                console.log(res);
                res && setOrderId(res.data._id);
            }catch(err){}
        };
        data && createOrder();
    }, [cart, data, currentUser, setOrderId]);

  return (
    <Container>
    {orderId ? `Order succesfully created, your number is : ${orderId}`
    : `Successfull, your order is being prepared...`}
    <Link to="/">
    <Button>Go to homepage</Button>
    </Link>
    </Container>
  )
}

export default Success;