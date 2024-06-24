import React,{useState} from 'react';
import styled from 'styled-components';
import { IoIosArrowBack } from "react-icons/io";

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
  width: 500px;
  height: 600px;
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
`;

const Title = styled.div`
    font-weight: 800;
    margin-left: 20px;
    font-size: 25px;
    margin-top: 20px;
    margin-bottom: 20px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    margin: 20px;
    font-size: 10px;
`;

const Button = styled.button`
    width: 450px;
    height: 50px;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #007B0C;
    border: 0;
    border-radius: 10px;
    font-size: 15px;
    color: white;
`;

const SignUp = styled.div`
    margin-left: 45%;
    cursor: pointer;
`;

const Input = styled.input`
    border-radius: 10px;
    border: 0;
    background-color: #F2F2F2;
    width: 450px;
    height: 45px;
    margin: 0 0 10px 0;
`;

function Login({ onClose, onSuccess, onShowSignUp }) {

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)

        try {
            const response = await fetch('http://localhost/api/login.php', {
                method: 'POST',
                body: JSON.stringify({
                    cno:formData.get('cno'),
                    passwd:formData.get('passwd'),
                }),
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                mode: 'cors', // CORS 요청 설정
            });

            const data = await response.json();
            if (data.success) {
                sessionStorage.setItem('cno', formData.get('cno'),);
                alert('로그인');
                onSuccess();
            } else {
                console.error('Login error:', data.message);
            }
        } catch (error) {
            alert('다시 시도하세요');
        }
    };

    return(
        <>
            <ModalOverlay onClick={onClose} />
            <Container>
                <Title>로그인</Title>
                <Form onSubmit={handleSubmit}>
                    <label>고객번호</label>
                    <Input type="text" id="cno" name="cno" required/>

                    <label>비밀번호</label>
                    <Input type="password" id="passwd" name="passwd" required/>

                    <SignUp onClick={onShowSignUp}><IoIosArrowBack />회원가입</SignUp>

                    <Button type="submit">로그인</Button>
                </Form>
            </Container>
        </>
    );  
}

export default Login;
