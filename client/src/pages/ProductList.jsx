import {React, useState } from 'react'
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Newsletter from '../components/Newsletter';
import Products from '../components/Products';
import Footer from '../components/Footer';
import { mobile } from '../responsive';
import { useLocation } from 'react-router-dom';

const Container = styled.div`

`;  
const Title = styled.h1`
margin: 20px;
`;

/* ---->  Filter section  <---- */

const FilterContainer = styled.div`
display: flex;
justify-content: space-between;

`;
const Filter = styled.div`
margin: 20px;
${mobile({margin: "0 20px", display: "flex", flexDirection: "column"})};
`;
const FilterText = styled.span`
font-size: 20px;
font-weight: 600;
margin-right: 20px;
${mobile({marginRight: "0"})};
`;

const Select = styled.select`
padding: 10px;
margin-right: 20px;
${mobile({margin: "10px 0"})};
`;
const Option = styled.option`

`;

const ProductList = () => {
  const location = useLocation();
  const category = location.pathname.split("/")[2];

  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest")

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  }

  const handleSort = (e) => {
    setSort(e.target.value);
  }
  

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>{category}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>
            Filter Products:
          </FilterText>
          <Select name="color" defaultValue={"default"} onChange={handleFilters}>
            <Option disabled value={"default"}>
              Color
            </Option>
            <Option>white</Option>
            <Option>black</Option>
            <Option>red</Option>
            <Option>blue</Option>
            <Option>yellow</Option>
            <Option>green</Option>
            <Option>pink</Option>
            <Option>orange</Option>
            <Option>beige</Option>
          </Select>
          <Select name="size" defaultValue={"default"} onChange={handleFilters}>
            <Option disabled value={"default"}>
              Size
            </Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>
            Sort Products:
          </FilterText>
          <Select defaultValue={"newest"} onChange={handleSort}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={category} filters={filters} sort={sort} />
      <Newsletter />
      <Footer />
    </Container>
  )
}

export default ProductList