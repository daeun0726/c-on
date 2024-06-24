import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MenuItem from '../components/MenuItem';

const Container = styled.div`
    height: 80%;
    position: absolute;
    width: 100%;
    top: 100px;
    display: flex;
    flex-direction: column; /* 가로선을 수직으로 배치하기 위해 추가 */
    align-items: center; /* 가로선과 제목을 가운데 정렬하기 위해 추가 */
`;

const Title = styled.div`
    display: flex;
    align-items: baseline;
    width: 80%;
    margin-bottom: 10px; /* 가로선과 간격을 두기 위해 추가 */
`;

const HorizontalLine = styled.hr`
    width: 80%; /* 가로선의 너비 조절 */
    border: 1px solid #000000; /* 가로선의 색상 및 굵기 설정 */
    margin: 0; /* 기본 margin 제거 */
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
    height: 40px;
    margin-top: 10px;
`;

function Tea() {
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        fetch('http://localhost/api/foods.php') 
            .then(response => response.json())
            .then(data => {
                if (data.records) {
                    const coffeeFoods = data.records.filter(food => food.CATEGORYNAME === '티');
                    setFoods(coffeeFoods);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return(
        <Container>
            <Title>
                <Name>Tea</Name>
                <Count>{foods.length}items</Count>
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

export default Tea;