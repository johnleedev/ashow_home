import React from 'react';
import './Login.css'; 
import Header from '../Ashow/Header';
import Footer from '../Ashow/Footer';
import { useNavigate } from 'react-router-dom';
import MainURL from '../MainURL';

export default function Login( props: any) {
  
  const navigate = useNavigate();
  
  const NAVER_CLIENT_ID = 'cIPtzvvlX1yC_UcFjo3L';
  const NAVER_CALLBACK_URL = `${MainURL}:3000/loginnaver`;
  const naverLoginUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=token&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_CALLBACK_URL}&state=YOUR_UNIQUE_STATE`;

  const KAKAO_REST_API_KEY = '9144dd102afc1c92b050b2b691bf028e';
  const KAKAO_REDIRECT_URI = `${MainURL}:3000/loginkakao`;
  const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}`
  
  return (
    <div className="loginContainer">
      <Header/>

      <div  className="loginContent">
        <div className="mainlogo">
          <img src='img/mainlogo.png' className="img" alt="Logo" />
        </div>

        {/* KakaoTalk Login */}
        <a href={kakaoLoginUrl}>
          <button className="loginButtonkakao">
            카카오톡 로그인
          </button>
        </a>

        {/* Naver Login */}
        <a href={naverLoginUrl}>
          <button className="loginButtonNaver">
          네이버 로그인
          </button>    
        </a>

        <button className="registerButton" onClick={() => 
            navigate(`/logister`)
          }>
          email로 회원가입
        </button>
      </div>

      {/* footer */}
      <section className="footer">
      <div className="inner">
          <Footer></Footer>
      </div>
      </section>
    </div>
  );
}
