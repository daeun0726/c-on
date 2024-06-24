import React, { useState,useEffect, useContext } from 'react';
import styled from 'styled-components';
import HistoryItem from '../components/HistoryItem';
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

const DateFilter = styled.div`
    margin-left: auto;
    display: flex;
    align-items: center;

    & > label {
        margin-right: 10px;
        font-weight: 600;
    }

    & > input {
        margin-right: 20px;
        padding: 5px;
        border: 1px solid #000;
        border-radius: 5px;
    }
`;

function MyPage() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [items, setItems] = useState([]);
    const { isLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            if (isLoggedIn) {
                try {
                    const response = await fetch(`http://localhost/api/orderlist.php`, {
                        method: 'GET',
                        mode: 'cors'
                    });

                    const result = await response.json();

                    if (result.records) {
                        const cno = sessionStorage.getItem('cno');

                        const filteredRecords = result.records.filter(record => record.cno === cno);

                        const groupedItems = filteredRecords.reduce((acc, item) => {
                            const key = `${item.cart_id}-${item.order_date}`;
                            if (!acc[key]) {
                                acc[key] = {
                                    cart_id: item.cart_id,
                                    order_date: item.order_date,
                                    total_price: 0,
                                    details: []
                                };
                            }
                            acc[key].details.push({
                                name: item.food_name,
                                quantity: item.quantity,
                                price: Number(item.total_price)
                            });
                            acc[key].total_price += Number(item.total_price);
                            return acc;
                        }, {});

                        setItems(Object.values(groupedItems));
                    } else {
                        setItems([]);
                    }
                } catch (error) {
                    console.error('Error fetching order details:', error);
                }
            }
        };

        fetchOrderDetails();
    }, [isLoggedIn]);


    const filteredItems = items.filter(item => {
        const itemDateParts = item.order_date.split(' ');
        const itemDate = new Date(`20${itemDateParts[0].replace(/\//g, '-')}T${itemDateParts[1].split('.')[0]}`);
        const start = startDate ? new Date(`${startDate}T00:00:00`) : null;
        const end = endDate ? new Date(`${endDate}T23:59:59`) : null;
        return (!start || itemDate >= start) && (!end || itemDate <= end);
    });

    return(
        <Container>

            <Title>
                <Name>History</Name>
                <Count>{filteredItems.length} items </Count>
                <DateFilter>
                    <label>Start Date:</label>
                    <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                    <label>End Date:</label>
                    <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
                </DateFilter>
            </Title>

            <HorizontalLine />

            <Menu>
                {isLoggedIn && filteredItems.map(item => (
                    <HistoryItem
                        key={`${item.cart_id}-${item.item_no}`}
                        date={item.order_date}
                        details={item.details}
                        totalPrice={item.total_price}
                    />
                ))}
            </Menu>

        </Container>
    );  
}

export default MyPage;
