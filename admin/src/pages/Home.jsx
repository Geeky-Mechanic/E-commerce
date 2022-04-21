import React, { useState, useEffect, useMemo } from 'react'
import styled from 'styled-components';
import Chart from '../components/Chart';
import FeaturedInfo from '../components/FeaturedInfo';
import WidgetLarge from '../components/WidgetLarge';
import WidgetSmall from '../components/WidgetSmall';
import { userData } from '../dummy';
import { userRequest } from '../reqMethods';

const Container = styled.div`
flex: 4;
`;

const Widgets = styled.div`
display: flex;
margin: 20px;
`;

const Home = () => {

  const [userStats, setUserStats] = useState([]);

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
        const res = await userRequest.get("/users/stats");
        res.data.map((item) => {
          setUserStats(prev => [...prev, {name:MONTHS[item._id - 1], "Active User": item.total}]);
        })
      }catch(err){
        console.log(err);
      }
    }
    getStats();
  },[MONTHS])

  console.log(userStats);

  return (
    <Container>
        <FeaturedInfo />
        <Chart data={userStats} title="User Analytics" grid dataKey="Active User"/>
        <Widgets>
          <WidgetSmall />
          <WidgetLarge />
        </Widgets>
    </Container>
  )
}

export default Home;