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

const SearchBar = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 70%;
    margin: 20px 0;
`;

const SearchTitle = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 50px;
    margin-bottom: 10px;
`;

const SearchInput = styled.input`
    border: 1px solid #000000;;
    width: 40%;
    height: 100%;
    margin-right: 1%;
    border-radius: 10px;
`;

const SearchButton = styled.button`
    border: none;
    border-radius: 10px;
    width: 10%;
    height: 100%;;
    background-color: #000000;
    color: #FFFFFF;
    cursor: pointer;
`;

const PriceInput = styled.input`
    border: 1px solid #F2F2F2;
    width: 10%;
    height: 100%;
    border-radius: 3px;
    margin: 0 1%;
`;

const PriceTitle = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 30px;
    margin-right: 10%;
`;

function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);

    useEffect(() => {
        fetch('http://localhost/api/foods.php')
            .then(response => response.json())
            .then(data => {
                if (data.records) {
                    const uniqueFoods = removeDuplicates(data.records, 'FOODNAME');
                    setItems(uniqueFoods);
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

    const handleSearch = () => {
        if (!searchTerm && !minPrice && !maxPrice) {
            return;
        }
        const min = minPrice ? parseInt(minPrice) : 0;
        const max = maxPrice ? parseInt(maxPrice) : 30000;
        const filtered = items.filter(item =>
            item.FOODNAME.includes(searchTerm) && item.PRICE >= min && item.PRICE <= max
        );
        setFilteredItems(filtered);
        setSearchTerm('');
        setMinPrice('');
        setMaxPrice('');
    };

    return (
        <Container>
            <SearchBar>
                <SearchTitle>
                    <SearchInput
                        type="text"
                        placeholder="메뉴 이름 검색"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <SearchButton onClick={handleSearch}>검색</SearchButton>
                </SearchTitle>
                <PriceTitle>
                    <PriceInput
                        type="number"
                        placeholder="최소 가격"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        step="100"
                        min="0"
                    />
                    ~
                    <PriceInput
                        type="number"
                        placeholder="최대 가격"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        step="100"
                        min="0"
                    />
                </PriceTitle>
            </SearchBar>

            <Title>
                <Name>Search</Name>
                <Count>{filteredItems.length} items</Count>
            </Title>

            <HorizontalLine />

            <Menu>
                {filteredItems.map(item => (
                    <MenuItem key={item.FOODNAME} name={item.FOODNAME} price={item.PRICE} category={item.CATEGORYNAME}/>
                ))}
            </Menu>
        </Container>
    );
}

export default Search;
