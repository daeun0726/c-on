import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import AuthContext from '../context/AuthContext';
import  CartItemContext from '../context/CartItemContext';

const Container = styled.div`
    position: relative;
    width: 170px;
    height: 280px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 20px;
    margin-right: 30px;
`;

const Title = styled.div`
    width: 160px;
    margin: 5px 0;
    font-weight: 700;
`;

const Image = styled.div`
    background-color: #D9D9D9;
    width: 160px;
    height: 180px;
`;

const Price = styled.div`
    width: 170px;
    margin-bottom: 15px;
`;

const AddButton = styled.button`
    width: 45px;
    height: 30px;
    background-color: #007B0C;
    border: 0;
    border-radius: 7%;
    font-size: 15px;
    color: white;
    cursor: pointer;
    margin-right: 5px;
`;

const Form = styled.form`
    width: 160px;
    display: flex;
    justify-content: flex-end;
    position: absolute;
    bottom: 0;
`;

const Input = styled.input`
    width: 45px;
    height: 27px;
    background-color: white;
    border: 1px solid #000000;
    border-radius: 7%;
    margin-right:5px
`;

function MenuItem({ name, price, category }) {
    const { isLoggedIn } = useContext(AuthContext);
    const { addToCart } = useContext(CartItemContext);
    const [quantity, setQuantity] = useState(1); // 초기 수량은 1로 설정

    const handleChange = (event) => {
        const value = parseInt(event.target.value); // 입력된 값이 문자열일 수 있으므로 숫자로 변환
        if (!isNaN(value)) {
          setQuantity(value); // 수량 변경
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // 기본 form 제출 동작 방지
    };

    const handleAddToCart = () => {
        if (isLoggedIn) {
            alert(`${name} ${quantity}개 추가!`);

            const item = {
            name,
            price,
            quantity,
            category,
            };

            addToCart(item); // Add item to cart
        } else {
            // 비로그인 상태에서의 처리
            alert('로그인이 필요합니다.');
        }
    };

    return (
        <Container>
            <Image></Image>
            <Title>{name}</Title>
            <Price>{price}</Price>
            <Form onSubmit={handleSubmit}>
                <Input
                    type="number"
                    value={quantity}
                    onChange={handleChange}
                    min={1} // 최소 수량 설정
                />
                <AddButton type="button" onClick={handleAddToCart}>추가</AddButton>
            </Form>
        </Container>
    );  
}

export default MenuItem;
