// src/components/Nav.js
import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { IoSearchOutline } from "react-icons/io5";
import { BsCart2, BsPerson } from "react-icons/bs";
import Login from './Login';
import Logout from './Logout';
import SignUp from './SignUp';
import AuthContext from '../context/AuthContext';

const Container = styled.div`
    position: absolute;
    width: 100%;
    height: 100px;
    top: 0;
    display: flex;
    align-items: center;
`;

const Title = styled.div`
    font-weight: 800;
    color: #007B0C;
    margin-left: 20px;
    font-size: 25px;
    width: 33%;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: ${props => props.active ? '#007B0C' : 'inherit'};
    &:hover {
        color: #007B0C;
    }
`;

const Category = styled.div`
    display: flex;
    justify-content: space-around;
    width: 33%;
    font-size: 20px;
    font-weight: 800;
    color: #2C2C2C;
`;

const Menu = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: baseline;
    width: 24%;
    font-size: 20px;
    font-weight: 800;
    color: #2C2C2C;
    margin-right: 20px;
    
    :nth-child(2){
        margin: 0 15px;
    }
`;

const LogInButton = styled.div`
    font-weight: 800;
    font-size: 20px;
    cursor: pointer;
    margin-bottom: 4px;
`;

const LogOutButton = styled.div`
    font-weight: 800;
    font-size: 20px;
    cursor: pointer;
    margin-bottom: 4px;
`;

function Nav() {
    const location = useLocation();
    const { isLoggedIn, logIn, logOut } = useContext(AuthContext);
    const [showLogInModal, setShowLogInModal] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [showLogOutModal, setShowLogoutModal] = useState(false);

    const handleLogInClick = () => {
        setShowLogInModal(true);
    };

    const handleLogInModalClose = () => {
        setShowLogInModal(false);
    };

    const handleLogInSuccess = () => {
        logIn();
        setShowLogInModal(false);
    };

    const handleLogOutClick = () => {
        setShowLogoutModal(true);
    };

    const handleLogOut = () => {
        logOut();
        setShowLogoutModal(false);
    };

    const handleSignUpClick = () => {
        setShowSignUpModal(true);
        setShowLogInModal(false);
    };

    const handleSignUpModalClose = () => {
        setShowSignUpModal(false);
    };

    const handleLogOutModalClose = () => {
        setShowLogoutModal(false);
    };

    const handleSignUpSuccess = () => {
        setShowSignUpModal(false);
        setShowLogInModal(true);
    };

    return (
        <Container>
            <Title>
                <StyledLink to="/" active={location.pathname === '/home'}>CNU ORDER NOW</StyledLink>
            </Title>
            <Category>
                <StyledLink to="/" active={location.pathname === '/'}>All</StyledLink>
                <StyledLink to="/coffee" active={location.pathname === '/coffee'}>Coffee</StyledLink>
                <StyledLink to="/blended" active={location.pathname === '/blended'}>Blended</StyledLink>
                <StyledLink to="/tea" active={location.pathname === '/tea'}>Tea</StyledLink>
                <StyledLink to="/frappuccino" active={location.pathname === '/frappuccino'}>Frappuccino</StyledLink>
            </Category>
            <Menu>
                {(!isLoggedIn || (isLoggedIn && sessionStorage.getItem('cno') !== 'c0')) && (
                    <>
                        <StyledLink to="/search" active={location.pathname === '/search'}><IoSearchOutline size="23" /></StyledLink>
                        <StyledLink to="/cart" active={location.pathname === '/cart'}><BsCart2 size="23" /></StyledLink>
                    </>
                )}
                {isLoggedIn && sessionStorage.getItem('cno') === 'c0' ? (
                    <StyledLink to="/admin" active={location.pathname === '/admin'}><BsPerson size="23" /></StyledLink>
                ) : (
                    <StyledLink to="/mypage" active={location.pathname === '/mypage'}><BsPerson size="23" /></StyledLink>
                )}
            </Menu>
            {isLoggedIn ? (
                <LogOutButton onClick={handleLogOutClick}>LogOut</LogOutButton>
            ) : (
                <LogInButton onClick={handleLogInClick}>LogIn</LogInButton>
            )}
            {showLogInModal && <Login onClose={handleLogInModalClose} onSuccess={handleLogInSuccess} onShowSignUp={handleSignUpClick} />}
            {showSignUpModal && <SignUp onClose={handleSignUpModalClose} onSuccess={handleSignUpSuccess} />}
            {showLogOutModal && <Logout onLogout={handleLogOut} onClose={handleLogOutModalClose}/>}
        </Container>
    );
}

export default Nav;
