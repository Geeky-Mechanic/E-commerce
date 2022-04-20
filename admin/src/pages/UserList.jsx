import React, { useState } from 'react'
import styled from 'styled-components';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import { userRows } from '../dummy';
import { Link } from 'react-router-dom';


const Container = styled.div`
flex: 4;
`;

const UserCellContainer = styled.div`
display: flex;
align-items: center;
`;

const UserCellImage = styled.img`
width: 32px;
height: 32px;
border-radius: 50%;
object-fit: cover;
margin-right: 10px;
`;

const EditListButton = styled.button`
border: none;
border-radius: 10px;
padding: 5px 10px;
background-color: #3bb077;
color: white;
cursor: pointer;
margin-right: 20px;
`;

const UserList = () => {

    const [data, setData] = useState(userRows);

    const handleDelete = (id) => {
        setData(data.filter(item => item.id !== id));
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'user', headerName: 'User', width: 200, renderCell: (params) => {
            return (
                <UserCellContainer>
                    <UserCellImage src={params.row.avatar} alt=""/>
                    {params.row.username}
                </UserCellContainer>
            );
        } },
        { field: 'email', headerName: 'Username', width: 200 },
        {
          field: 'status',
          headerName: 'Status',
          width: 120,
        },
        {
            field: 'transaction',
            headerName: 'Transaction Volume',
            width: 160,
          },
          {
            field: 'action',
            headerName: 'Action',
            width: 160,
            renderCell: (params) => {
                return(
                    <>
                        <Link to={"/user/" + params.row.id}>
                            <EditListButton>Edit</EditListButton>
                        </Link>
                        <DeleteOutline style={{color: "red", cursor: "pointer"}} onClick={()=> handleDelete(params.row.id)}/>
                    </>
                );
            }
          },
        
      ];

  return (
    <Container>
        <DataGrid
        rows={data}
        columns={columns}
        rowsPerPageOptions={[5, 10, 15, 30, 50]}
        checkboxSelection
        disableSelectionOnClick
        />
    </Container>
  )
}

export default UserList;