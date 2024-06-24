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

const Input = styled.input`
    border-radius: 10px;
    border: 0;
    background-color: #F2F2F2;
    width: 450px;
    height: 45px;
    margin: 0 0 10px 0;
`;

function SignUp({ onClose, onSuccess, onShowLogIn }) {

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        console.log(JSON.stringify({
            cno: formData.get('cno'),
            name: formData.get('name'),
            passwd: formData.get('passwd'),
            phoneno: formData.get('phoneno'),
        }));

        try {
            const response = await fetch('http://localhost/api/register.php', {
                method: 'POST',
                body: JSON.stringify({
                    cno: formData.get('cno'),
                    name: formData.get('name'),
                    passwd: formData.get('passwd'),
                    phoneno: formData.get('phoneno'),
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
                mode: 'cors' // CORS 요청 설정
            });
            const data = await response.json();
            if (data.success) {
                alert('회원가입이 완료되었습니다.');
                onSuccess(); // 회원가입 완료 후 onSuccess 콜백 호출
                onShowLogIn(); // 로그인 모달 열기
            } else {
                alert(`회원가입 실패: ${data.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            //alert('회원가입 과정에서 오류가 발생했습니다.');
        }
    };

    return(
        <>
            <ModalOverlay onClick={onClose} />
            <Container>
                <Title>회원가입</Title>
                <Form onSubmit={handleSubmit}>
                    <label>고객번호</label>
                    <Input type="text" id="cno" name="cno" required/>

                    <label>이름</label>
                    <Input type="text" id="name" name="name" required/>

                    <label>비밀번호</label>
                    <Input type="password" id="passwd" name="passwd" required/>

                    <label>전화번호</label>
                    <Input type="tel" id="phoneno" name="phoneno" required/>

                    <Button type="submit">회원가입</Button>
                </Form>
            </Container>
        </>
    );  
}

export default SignUp;
