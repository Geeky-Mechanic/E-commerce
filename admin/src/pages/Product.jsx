import { Publish } from '@mui/icons-material';
import React, { useEffect, useMemo, useState }from 'react'
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Chart from '../components/Chart';
import { useSelector, useDispatch } from 'react-redux';
import { userRequest } from '../reqMethods';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../firebase';
import { updateProducts } from '../redux/apiCalls';

const Container = styled.div`
flex: 4;
padding: 20px;
`;

const TitleContainer = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`;

const ProductTitle = styled.h1`

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

/* ---->  Top section  <---------------------------------- */ 

const Top = styled.div`
display: flex;
`;

/* --->  Left subsection  <--- */

const TopLeft = styled.div`
flex:1;
`;

/* --->  Right subsection  <--- */

const TopRight = styled.div`
flex: 1;
padding: 20px;
margin: 20px;
-webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const ProductInfoTop = styled.div`
display: flex;
align-items: center;
`;

const ProductInfoImage = styled.img`
width: 40px;
height: 40px;
border-radius: 50%;
object-fit: cover;
margin-right: 20px;
`;

const ProductName = styled.span`
font-weight: 600;
`;

const ProductInfoBottom = styled.div`
margin-top: 10px;
`;

const InfoItem = styled.div`
width: 150px;
display: flex;
justify-content: space-between;
`;

const InfoKey = styled.span`

`;

const InfoValue = styled.span`
font-weight: 300;
`;

/* ---->  Bottom section  <---------------------------------- */

const Bottom = styled.div`
flex: 1;
padding: 20px;
margin: 20px;
-webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const ProductForm = styled.form`
display: flex;
justify-content: space-between;
`;

/* --->  Form Left subsection  <--- */

const FormLeft = styled.div`
display: flex;
flex-direction: column;
`;

const LeftLabel = styled.label`
margin-bottom: 10px;
color: grey;
`;

const Input = styled.input`
margin-bottom: 10px;
border: none;
padding: 5px;
border-bottom: 1px solid grey;
`;

const Select = styled.select`
margin-bottom: 10px;
`;

const Option = styled.option`

`;

/* --->  Form right subsection  <--- */

const FormRight = styled.div`
display: flex;
flex-direction: column;
justify-content: space-around;
`;

const RightLabel = styled.label`

`;

const ProductUpload = styled.div`
display: flex;
align-items: center;

`;  

const UploadImage = styled.img`
width: 100px;
height: 100px;
border-radius: 10px;
object-fit: cover;
margin-right: 20px;
`;

const ProductButton = styled.button`
border: none;
padding: 5px;
border-radius: 5px;
background-color: darkblue;
color: white;
font-weight: 600;
cursor: pointer;
`;

const Product = () => {

    const dispatch = useDispatch();

    const location = useLocation();
    const productId = location.pathname.split("/")[2];
    const [productStats, setProductStats] = useState([]);
    
    const product = useSelector(
        state => state.product.products.find(
            product => product._id === productId
            )
    );

    const [file, setFile] = useState(null);
    const [categories, setCategories] = useState(product.categories);
    const [colors, setColors] = useState(product.color);
    const [size, setSize] = useState(product.size);
    const [title, setTitle] = useState(product.title);
    const [price, setPrice] = useState(product.price);
    const [desc, setDesc] = useState(product.desc);
    const [uploaded, setUploaded] = useState(false);
    const [url, setUrl] = useState(product.img);

/*     const getProduct = async ()=> {
        try {
            const res = await publicRequest.get(`products/find/${productId}`);
            setProduct(res.data);
        }catch(err){
            console.log(err);
        }
    } */
    
    const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );


  useEffect(()=> {
    const getStats = async () => {
        try{
            const res = await userRequest.get(`/orders/income?pid=${productId}`);
            const list = res.data.sort((a,b)=> {
                return a._id - b._id
            });
            list.map((item) => setProductStats((prev) => [
                ...prev,
                {name: MONTHS[item._id - 1], Sales: item.total},
            ])
            );
        }catch(err){
            console.log(err);
        }
    }
    getStats();
  },[MONTHS, productId])

const handleTitle = (e) => {
    setTitle(e.target.value)
}

const handlePrice = (e) => {
    setPrice(e.target.value);
}

const handleDesc = (e) => {
    if (e.target.value === ""){
    setDesc(product.desc);
    }else {
        setDesc(e.target.value);
    }
}

const handleCategories = (e) => {
    setCategories(e.target.value.split(","));
};

const handleColors = (e) => {
    setColors(e.target.value.split(","));
};

const handleSizes = (e) => {
    setSize(e.target.value.split(","));
};



const handleClick = (e) => {
    e.preventDefault();

    const product = {
        title:title,
        desc:desc,
        price:price,
        img:url,
        color:colors, 
        categories:categories,
        size:size,
        };
    updateProducts(productId,product, dispatch);

}

const handleUpload = (e) => {
    setFile(e.target.files[0]);

    const filename = new Date(product.updatedAt).getTime() + file.name;
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
        setUploaded(false);
    }, 
    () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUrl(downloadURL);
            setUploaded(true);
        });
    }
    );
}


  return (
    <Container>
        <TitleContainer>
            <ProductTitle>Product</ProductTitle>
            <Link to="/newproduct">
                <ProductAddButton>Create</ProductAddButton>
            </Link>
        </TitleContainer>
        <Top>
            <TopLeft>
                <Chart 
                    data={productStats}
                    dataKey="Sales"
                    title="Sales Performance"
                />
            </TopLeft>
            <TopRight>
                <ProductInfoTop>
                    <ProductInfoImage
                    src={product.img} alt=""
                    />
                    <ProductName>{product.title}</ProductName>
                </ProductInfoTop>
                <ProductInfoBottom>
                    <InfoItem>
                        <InfoKey>ID: </InfoKey>
                        <InfoValue>{product._id}</InfoValue>
                    </InfoItem>
                    <InfoItem>
                        <InfoKey>sales:</InfoKey>
                        <InfoValue>5123</InfoValue>
                    </InfoItem>
                    <InfoItem>
                        <InfoKey>In stock:</InfoKey>
                        <InfoValue>{product.inStock}</InfoValue>
                    </InfoItem>
                </ProductInfoBottom>
            </TopRight>
        </Top>
        <Bottom>
            <ProductForm>
                <FormLeft>
                    <LeftLabel>Title</LeftLabel>
                    <Input name="title" type="text" onChange={handleTitle} placeholder={product.title}/>
                    <LeftLabel>Description</LeftLabel>
                    <Input name="desc" type="text" onChange={handleDesc} placeholder={product.desc}/>
                    <LeftLabel>Price</LeftLabel>
                    <Input name="price" type="number" onChange={handlePrice} placeholder={product.price}/>
                    <LeftLabel>Categories</LeftLabel>
                    <Input name="categories" type="text" onChange={handleCategories} placeholder={product.categories}/>
                    <LeftLabel>Colors</LeftLabel>
                    <Input name="color" type="text" onChange={handleColors} placeholder={product.color}/>
                    <LeftLabel>Sizes</LeftLabel>
                    <Input name="size" type="text" onChange={handleSizes} placeholder={product.size}/>
                    <LeftLabel>In Stock</LeftLabel>
                    <Select name="inStock" id="inStock">
                        <Option value="true">Yes</Option>
                        <Option value="false">No</Option>
                    </Select>
                </FormLeft>
                <FormRight>
                    <ProductUpload>
                        <UploadImage
                        src={product.img} alt=""
                        />
                        {uploaded && <span>Upload successful</span>}
                        <RightLabel htmlFor="file">
                            <Publish style={{cursor: 'pointer'}} />
                        </RightLabel>
                        <Input type="file" id="file" onChange={handleUpload} style={{display: "none"}}/>
                    </ProductUpload>
                    <ProductButton onClick={handleClick} >Update</ProductButton>
                </FormRight>
            </ProductForm>
        </Bottom>
    </Container>
  )
}

export default Product;