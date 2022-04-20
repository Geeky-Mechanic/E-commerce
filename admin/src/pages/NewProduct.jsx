import React, { useState } from 'react'
import styled from 'styled-components';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../firebase';
import { addProduct } from '../redux/apiCalls';
import { useDispatch } from 'react-redux';

const Container = styled.div`
flex: 4;
`;

const ProductTitle = styled.h1`

`;

const AddForm = styled.form`
margin-top: 10px;
`;

const ProductItem = styled.div`
width: 250px;
display: flex;
flex-direction: column;
margin-bottom: 10px;
`;

const Label = styled.label`
color: grey;
font-weight: 600;
margin-bottom: 10px;
`;

const Input = styled.input`
padding: 10px;
`;

const Select = styled.select`
padding: 10px;
`;

const Option = styled.option`

`;

const Button = styled.button`
margin-top: 10px;
padding: 7px 10px;
border:none;
border-radius: 10px;
background-color: darkblue;
color: white;
font-weight: 600;
cursor: pointer;
`;

const NewProduct = () => {

    const dispatch = useDispatch();

    const [inputs, setInputs] = useState({});
    const [file, setFile] = useState(null);
    const [categories, setCategories] = useState([]);
    const [colors, setColors] = useState([]);
    const [size, setSize] = useState([]);

    const handleChange = (e) => {
        setInputs(prev => {
           return{...prev, [e.target.name]:e.target.value}
        })
    };

    const handleCategories = (e) => {
        setCategories(e.target.value.split(","));
    };

    const handleColors = (e) => {
        setColors(e.target.value.split(","));
    };

    const handleSizes = (e) => {
        setSize(e.target.value.split(","));
    };

    /* ---->  FIrebase docs please refer to it section  <---------------------------------- */

    const handleClick = (e) => {
        e.preventDefault();
        const filename = new Date().getTime() + file.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, filename);

        const uploadTask = uploadBytesResumable(storageRef, file);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed', 
        (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
         switch (snapshot.state) {
                case 'paused':
                console.log('Upload is paused');
                break;
                case 'running':
                console.log('Upload is running');
                break;
                default:
            }
        }, 
        (error) => {
            // Handle unsuccessful uploads
        }, 
        () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const product = {
                ...inputs,
                img:downloadURL,
                color:colors, 
                categories:categories,
                size:size,
                };
            addProduct(product, dispatch);
            });
        }
        );
    }


  return (
    <Container>
        <ProductTitle>New Product</ProductTitle>
        <AddForm>
            <ProductItem>
                <Label>Image</Label>
                <Input type="file" id="file" onChange={e => setFile(e.target.files[0])}/>
            </ProductItem>
            <ProductItem>
                <Label>Title</Label>
                <Input name="title" type="text" placeholder="Apple Airpods" onChange={handleChange}/>
            </ProductItem>
            <ProductItem>
                <Label>Price</Label>
                <Input name="price" type="number" placeholder="20" onChange={handleChange}/>
            </ProductItem>
            <ProductItem>
                <Label>Description</Label>
                <Input name="desc" type="text"  onChange={handleChange}placeholder="Creative and catchy description"/>
            </ProductItem>
            <ProductItem>
                <Label>Categories</Label>
                <Input name="categories" type="text" placeholder="jeans, skirts" onChange={handleCategories}/>
            </ProductItem>
            <ProductItem>
                <Label>Colors</Label>
                <Input name="color" type="text" placeholder="beige,lightblue" onChange={handleColors}/>
            </ProductItem>
            <ProductItem>
                <Label>Sizes</Label>
                <Input name="size" type="text" placeholder="S,M" onChange={handleSizes}/>
            </ProductItem>
            <ProductItem>
                <Label>Stock</Label>
                <Select name="inStock" onChange={handleChange}>
                    <Option value="true">Yes</Option>
                    <Option value="false">No</Option>
                </Select>
            </ProductItem>
            <Button onClick={handleClick}>Create</Button>
        </AddForm>
    </Container>
  )
}

export default NewProduct;