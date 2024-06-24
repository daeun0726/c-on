import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MenuItem from '../components/MenuItem';

const Container = styled.div`
    height: 80%;
    position: absolute;
    width: 100%;
    top: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.div`
    display: flex;
    align-items: baseline;
    width: 80%;
    margin-bottom: 10px;
`;

const HorizontalLine = styled.hr`
    width: 80%;
    border: 1px solid #000000;
    margin: 0;
`;

const Name = styled.div`
    font-weight: 800;
    font-size: 25px;
`;

const Count = styled.div`
    margin-left: 10px;
`;

const Menu = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 75%;
    margin-top: 10px;
`;

function Home() {
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        fetch('http://localhost/api/foods.php')
            .then(response => response.json())
            .then(data => {
                if (data.records) {
                    const uniqueFoods = removeDuplicates(data.records, 'FOODNAME');
                    setFoods(uniqueFoods);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const removeDuplicates = (array, key) => {
        return array.reduce((acc, current) => {
            const x = acc.find(item => item[key] === current[key]);
            if (!x) {
                return acc.concat([current]);
            } else {
                return acc;
            }
        }, []);
    };

    return (
        <Container>
            <Title>
                <Name>All</Name>
                <Count>{foods.length} items</Count>
            </Title>
            <HorizontalLine />
            <Menu>
                {foods.map(food => (
                    <MenuItem key={food.FOODNAME} name={food.FOODNAME} price={food.PRICE} category={food.CATEGORYNAME}/>
                ))}
            </Menu>
        </Container>
    );
}

export default Home;
