import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { userRequest } from '../reqMethods';
import { format } from 'timeago.js';

const Container = styled.div`
flex: 2;
-webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
padding: 20px;
`;

const Title = styled.h3`
font-size: 22px;
`;

/* ---->  Table section  <---- */

const Table = styled.table`
width: 100%;
border-spacing: 20px;
`;

const TableRow = styled.tr`

`;

const TableHeader = styled.th`
text-align: left;
`;

const UserCell = styled.td`
display: flex;
align-items: center;
font-weight: 600;
`;

/* const Image = styled.img`
width: 40px;
height: 40px;
border-radius: 50%;
object-fit: cover;
margin-right: 10px;
`;
 */
const Name = styled.span`

`;

const DateCell = styled.td`
font-weight: 300;
`;

const AmountCell = styled.td`
font-weight: 300;
`;

const StatusCell = styled.td`

`;

const Button = styled.button`
padding: 5px 7px;
border: none;
border-radius: 10px;
cursor: pointer;
${props => {
    if(props.type==="approved"){
        return ("background-Color:#e5faf2; color: #3bb077;");
    }
    else if(props.type==="declined"){
        return ("background-Color:#fff0f1; color: #d95087");
    }
    else if(props.type==="pending"){
        return ("background-Color:#ebf1fe; color: #2a7ade;");
    }
    
}}
`;

const WidgetLarge = () => {

    const [orders, setOrders] = useState([]);

    useEffect(()=> {
        const getOrders = async ()=>{
            try{
            const res = await userRequest.get("orders");
            setOrders(res.data);
            }catch(err){
                console.log(err);
            }
        }
        getOrders();
    },[])


  return (
    <Container>
        <Title>
            Latest transactions
        </Title>
        <Table>
            <TableRow>
                <TableHeader>
                    Customer
                </TableHeader>
                <TableHeader>
                    Date
                </TableHeader>
                <TableHeader>
                    Amount
                </TableHeader>
                <TableHeader>
                    Status
                </TableHeader>
            </TableRow>
            {orders.map((order)=>(
            <TableRow key={order._id}>
                <UserCell>
                    <Name>{order.userId}</Name>
                </UserCell>
                <DateCell>{format(order.createdAt)}</DateCell>
                <AmountCell> {order.amount}</AmountCell>
                <StatusCell>
                    <Button type={order.status}>{order.status}</Button>
                </StatusCell>
            </TableRow>
            ))}
        </Table>
    </Container>
  )
}

export default WidgetLarge;