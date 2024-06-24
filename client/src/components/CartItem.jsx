import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%; 
  height: 140px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #000000;
`;

const Title = styled.div`
    display: flex;
    flex-direction: column;
    font-weight: 800;
    margin: 0 0 0 20px;
    width: 500px;
    :nth-child(1){
        font-size: 13px;
    }
`;

const Image = styled.div`
    background-color: #D9D9D9;
    margin: 0 10px;
    width: 120px;
    height: 120px;
`;

const Price = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: baseline;
    margin: 0 200px;
    
    :nth-child(1){
        font-weight: 800;
        font-size: 17px;
        margin: 0 10px;
    }
`;

const Input = styled.input`
    width: 45px;
    height: 27px;
    background-color: white;
    border: 1px solid #000000;
    border-radius: 7%;
    margin-right:5px;
`;

const DeleteBtn = styled.button`
    border: 0;
    background-color: white;
    font-size: 15px;
    cursor: pointer;
`;

function CartItem({ name, price, quantity,category, onRemove, onQuantityChange }) {
    const handleChange = (event) => {
        const value = parseInt(event.target.value); // 입력된 값이 문자열일 수 있으므로 숫자로 변환
        if (!isNaN(value) && value > 0) {
            onQuantityChange(name, value); //수량 변환
        }
    };
    
    const handleDelete = () => {
        onRemove(name); //해당 메뉴 삭제
    };

    return(
        <Container>
            <Image></Image>
            
            <Title>
                <span>{category}</span>
                <span>{name}</span>
            </Title>

            <Input
                type="number"
                value={quantity}
                onChange={handleChange}
                min={1} // 최소 수량 설정
            />

            <Price>
                <span>{price * quantity}</span>
                <span>won</span>
            </Price>

            <DeleteBtn onClick={handleDelete}>X</DeleteBtn>
        </Container>
    );  
}

export default CartItem;
