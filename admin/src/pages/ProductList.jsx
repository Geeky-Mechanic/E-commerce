import React, { useEffect } from 'react'
import styled from 'styled-components';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProducts, getProducts } from '../redux/apiCalls';

const Container = styled.div`
flex: 4;
`;

const TitleContainer = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`;

const ProductAddButton = styled.button`
width: 80px;
border: none;
padding: 5px;
background-color:teal;
color: white;
border-radius: 5px;
cursor: pointer;
font-size: 16px;
`;

const Title = styled.h1`

`;

const Product = styled.div`
display: flex;
align-items: center;
`;

const ProductImage = styled.img`
width: 32px;
height: 32px;
border-radius: 50%;
object-fit: cover;
margin-right: 10px;
`;

/* --->  Delete subsection  <--- */

const EditButton = styled.button`
 border: none;
 border-radius: 10px;
 padding: 5px 10px;
 background-color: #3bb077;
 color: white;
 cursor: pointer;
 margin-right: 20px;
`;

const deleteStyle = {
color: "red",
cursor: "pointer",
}

const ProductList = () => {

    const dispatch = useDispatch();
    const products = useSelector(state=>state.product.products);

    useEffect(()=> {
        getProducts(dispatch);
    }, [dispatch])

    const handleDelete = (id) => {
        deleteProducts(id, dispatch);
    }

    const columns = [
        { field: '_id', headerName: 'ID', width: 220 },
        { field: 'product', headerName: 'Product', width: 200, renderCell: (params) => {
            return (
                <Product>
                    <ProductImage
                    src={params.row.img}
                    alt={params.row.title}                    
                    />
                    {params.row.title}
                </Product>
            );
        } },
        { field: 'inStock', headerName: 'Stock', width: 200 },
        {
            field: 'price',
            headerName: 'Price',
            width: 160,
          },
          {
            field: 'action',
            headerName: 'Action',
            width: 160,
            renderCell: (params) => {
                return(
                    <>
                        <Link to={"/product/" + params.row._id}>
                            <EditButton>Edit</EditButton>
                        </Link>
                        <DeleteOutline 
                        style={deleteStyle}
                        onClick={() => handleDelete(params.row._id)}
                        />
                    </>
                );
            }
          },
        
      ];

  return (
    <Container> 
        <TitleContainer>
        <Title>Product List</Title>
        <Link to="/newproduct">
            <ProductAddButton>Create</ProductAddButton>
        </Link>
        </TitleContainer>
        <DataGrid
        rows={products}
        columns={columns}
        getRowId={row => row._id}
        rowsPerPageOptions={[5, 10, 15, 30, 50, 100]}
        checkboxSelection
        disableSelectionOnClick
        />
    </Container>
  )
}

export default ProductList;