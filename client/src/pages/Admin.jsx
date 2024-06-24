import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

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

const List = styled.div`
    display: flex;
    flex-direction: column;
    width: 75%;
    height: auto;
    margin-top: 10px;
`;

const Item = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
`;

const Category = styled.div`
    margin: 10px 0;
    font-weight: 800;
    font-size: 17px;
`;

const Section = styled.div`
    margin-top: 20px;
`;

const SubTitle = styled.h2`
    margin-top: 20px;
`;

function Admin() {
    const [data, setData] = useState({ data1: [], data2: [] });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost/api/admin.php');
            const result = await response.json();

            if (result.success) {
                setData(result);
            } else {
                console.error('Failed to fetch data:', result.message);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const renderItemsByCategory = (items) => {
        const groupedItems = items.reduce((acc, item) => {
            const category = item.CATEGORYNAME || 'Total';
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(item);
            return acc;
        }, {});

        return Object.keys(groupedItems).map((category, index) => (
            <Section key={index}>
                <Category>{category}</Category>
                {groupedItems[category].map((item, idx) => (
                    <Item key={idx}>
                        {item.FOODNAME && <p>{item.FOODNAME}</p>}
                        <p>Total Quantity: {item.TOTALQUANTITY}</p>
                        <p>Total Amount: {item.TOTALAMOUNT}</p>
                    </Item>
                ))}
            </Section>
        ));
    };

    const renderRankingsByCategory = (items) => {
        const groupedItems = items.reduce((acc, item) => {
            const category = item.CATEGORYNAME || 'Total';
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(item);
            return acc;
        }, {});

        return Object.keys(groupedItems).map((category, index) => (
            <Section key={index}>
                <Category>{category}</Category>
                {groupedItems[category].map((item, idx) => (
                    <Item key={idx}>
                        {item.FOODNAME && <p>{item.FOODNAME}</p>}
                        <p>Category Rank: {item.CATEGORYRANK}</p>
                        <p>Total Rank: {item.TOTALRANK}</p>
                    </Item>
                ))}
            </Section>
        ));
    };

    return (
        <Container>
            <Title>
                <Name>History</Name>
            </Title>
            <HorizontalLine />
            <List>
                {/* 데이터1 표시 */}
                <SubTitle>음식별 판매 수량 및 합계</SubTitle>
                {renderItemsByCategory(data.data1)}

                {/* 데이터2 표시 */}
                <SubTitle>음식별 판매 순위</SubTitle>
                {renderRankingsByCategory(data.data2)}
            </List>
        </Container>
    );
}

export default Admin;
