import React, { useContext } from 'react';
import styled from 'styled-components';
import CartItem from '../components/CartItem';
import CartItemContext from '../context/CartItemContext';
import AuthContext from '../context/AuthContext';

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
    flex-direction: column;
    width: 75%;
    height: auto;
    margin-top: 10px;
`;

const Price = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: baseline;
    width: 90%;
    
    :nth-child(2){
        font-weight: 800;
        font-size: 17px;
        margin: 0 10px;
    }
`;

const BuyBtn = styled.button`
    width: 200px;
    height: 50px;
    background-color: #007B0C;
    border: 0;
    border-radius: 10px;
    margin: 20px 0 0 63%;
    font-size: 15px;
    color: white;
    cursor: pointer;
`;

function Cart() {
    const { items, setItems ,removeItem, updateQuantity, totalPrice } = useContext(CartItemContext);
    const { isLoggedIn } = useContext(AuthContext);

    const handleRemoveItem = (name) => {
        removeItem(name);
    };

    const handleQuantityChange = (name, quantity) => {
        updateQuantity(name, quantity);
    };

    const BuyCart = async () => {
        try {
            const cno = sessionStorage.getItem('cno');
            const id = Math.floor(Math.random() * 10000) + 1;

            const orderDetails = items.map(item => {
                return {
                    name: item.name,
                    quantity: item.quantity.toString(), 
                    totalPrice: (item.price * item.quantity).toString()
                };
            });

            const cartData = {
                items: orderDetails,
                cno: cno,
                id: id.toString(),
            };

            console.log(JSON.stringify(cartData));

            const response = await fetch('http://localhost/api/cart.php', {
                method: 'POST',
                body: JSON.stringify(cartData),
                headers: {
                    'Content-Type': 'application/json',
                },
                mode: 'cors'
            });

            const data = await response.json();

            if (data.success) {
            alert('모든 메뉴를 구매 완료했습니다.');
            setItems([]);
            console.log(data);
            } else {
                console.error('Login error:', data.message);
            }
            // if (!data.success) {
            //     throw new Error('구매를 처리하는 중에 문제가 발생했습니다.');
            // }            
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return(
        <Container>
            <Title>
                <Name>Cart</Name>
                <Count>{items.length} items</Count>
                <Price>
                    <span>total</span>
                    <span>{totalPrice}</span>
                    <span>won</span>
                </Price>
            </Title>
            <HorizontalLine />
            {isLoggedIn && (
                <Menu>
                    {items.map((item) => (
                        <CartItem
                            key={item.name} // Ensure each item has a unique key
                            name={item.name}
                            price={item.price}
                            quantity={item.quantity}
                            category={item.category}
                            onRemove={handleRemoveItem}
                            onQuantityChange={handleQuantityChange}
                        />
                    ))}
                </Menu>
            )}
            {isLoggedIn && (
                <BuyBtn onClick={BuyCart}>구매하기</BuyBtn>
            )}
        </Container>
    );  
}

export default Cart;
