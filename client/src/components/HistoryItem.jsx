import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%; 
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 1px solid #000000;
`;

const Day = styled.div`
    margin: 10px 0;
    font-weight: 800;
    font-size: 17px;
    width: 100%;
`;

const List = styled.div`
    display: flex;
    margin: 10px 0 0 30px;
    width: 100%;

    :nth-child(1) {
        width: 45%;
    }

    :nth-child(2) {
        width: 20%;
    }
`;

const Price = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: baseline;
    width: 100%;
    margin: 10px 0;

    :nth-child(2) {
        font-weight: 800;
        font-size: 17px;
        margin: 0 10px;
    }
`;

function HistoryItem({ date, details, totalPrice }) {
    const formattedDate = date.split('.')[0];

    return (
        <Container>
            <Day>{formattedDate}</Day>
            {details.map((item, index) => (
                <List key={index}>
                    <div>{item.name}</div>
                    <div>{item.quantity}</div>
                    <div>{item.price}</div>
                </List>
            ))}
            <Price>
                <span>total</span>
                <span>{totalPrice}</span>
                <span>won</span>
            </Price>
        </Container>
    );
}

export default HistoryItem;
