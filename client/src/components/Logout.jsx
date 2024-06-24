import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
`;

const Container = styled.div`
  width: 350px;
  height: 160px;
  z-index: 999;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 19px;
  display: flex;
  flex-direction: column;
  border: 1px solid #ced4da;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
    width: 200px;
    height: 50px;
    background-color: #007B0C;
    border: 0;
    border-radius: 10px;
    font-size: 15px;
    color: white;
    cursor: pointer;
`;

function Logout({ onLogout, onClose }) {

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost/api/logout.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                mode: 'cors', // CORS 요청 설정
            });

            const data = await response.json();

            if (response.ok) {
                alert('로그아웃');
                sessionStorage.removeItem('cno');
                onLogout();
            } else {
                console.error('로그아웃 실패:', data.message);
            }
        } catch (error) {
            console.error('로그아웃 과정에서 오류가 발생했습니다.', error);
        }
    };

    return (
        <>
            <ModalOverlay onClick={onClose} />
            <Container>
                <p>로그아웃 하시겠습니까?</p>
                <Button onClick={handleLogout}>로그아웃</Button>
            </Container>
        </>
    );
}

export default Logout;
