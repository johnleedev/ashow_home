import './Logister.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MainURL from '../MainURL';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../Ashow/Header';
import Footer from '../Ashow/Footer';

function Logister(props: any) {
  
  const location = useLocation();
  const navigate = useNavigate();

  const [refreshToken, setRefreshToken] = useState('');
  const [userAccount, setUserAccount] = useState('');
  const [userName, setUserName] = useState('');
  const [userNickName, setUserNickName] = useState('');
  const [userURL, setUserURL] = useState('');
  
  const [userAccountMessage, setUserAccountMessage] = useState('');
  const [isUserAccount, setIsUserAccount] = useState(false);
  const [userNameMessage, setUserNameMessage] = useState('');
  const [isUserName, setIsUserName] = useState(false);
  const [userNickNameMessage, setUserNickNameMessage] = useState('');
  const [isUserNickName, setIsUserNickName] = useState(false);
  const [countText, setCountText] = useState<number>(0);
  
  useEffect(() => {
    navi_dataSet();
  }, []);

  const navi_dataSet = () => {
    if (location.state === null || location.state === undefined) {
      return;
    } else {
      setRefreshToken(location.state.refreshToken);
      setUserAccount(location.state.userAccount);
      setUserName(location.state.userName);
      setUserURL(location.state.userURL);
    }
  };

  const onChangeUserAccount = (e : any) => {
    const userNameRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    const text = e.target.value;
    setUserAccount(text);
    if (!userNameRegex.test(text)) {
      setUserAccountMessage('email 형식이 올바르지 않습니다.');
      setIsUserAccount(false);
    } else {
      setUserAccountMessage('올바른 형식의 메일입니다.');
      setIsUserAccount(true);
    }
  };

  const onChangeUserName = (e : any) => {
    const userNameRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    const text = e.target.value;
    setUserName(text);
    if (!userNameRegex.test(text)) {
      setUserNameMessage('한글로 입력해주세요.');
      setIsUserName(false);
    } else if (text.length < 2 || text.length > 5) {
      setUserNameMessage('2글자 이상 5글자 미만으로 입력해주세요.');
      setIsUserName(false);
    } else {
      setUserNameMessage('올바른 형식의 이름입니다.');
      setIsUserName(true);
    }
  };

  const onChangeUserNickName = (e : any) => {
    const text = e.target.value;
    setUserNickName(text);

    const copy = text.length;
    setCountText(copy);

    if (text.length >= 2 && text.length <= 10 && text !== '') {
      setIsUserNickName(true)
      setUserNickNameMessage('사용 가능한 닉네임입니다');
    } else {
      setIsUserNickName(false)
      setUserNickNameMessage('닉네임은 최소 2자 이상 10자 이하로 사용 가능합니다');
    }

  };

  const handleSignup = () => {
    if (userName !== '' && userAccount !== '' && userNickName ) {
      axios
        .post(`${MainURL}/login/logisterdo`, {
          userAccount: userAccount,
          userName: userName,
          userNickName: userNickName,
          userURL: userURL
        })
        .then((res) => {
          if (res.data === userName) {
            alert('회원가입이 완료되었습니다!');
            navigate(`/`)
          } else {
            alert('다시 시도해 주세요.');
          }
        })
        .catch(() => {
          console.log('실패함');
        });
    } else {
      alert('빈칸을 입력해주세요');
    }
  };

  return (
    <div className="logisterContainer">

      <Header/>
      <div  className="logisterContent">

        <div className="titleContainer">
          <h2 className="title">회원가입</h2>
        </div>

        <div className="inputContainer">
          <div className="inputLabel">계정(이메일)*</div>
          <input
            type="email"
            className={`inputField ${userAccount ? 'success' : 'error'}`}
            placeholder="e-mail"
            value={userAccount}
            onChange={onChangeUserAccount}
          />
          <div className={`message ${isUserAccount ? 'success' : 'error'}`}>{userAccountMessage}</div>
        </div>

        <div className="inputContainer">
          <div className="inputLabel">이름*</div>
          <input
            type="text"
            className={`inputField ${userName ? 'success' : 'error'}`}
            placeholder="이름"
            value={userName}
            onChange={onChangeUserName}
          />
          <div className={`message ${isUserName ? 'success' : 'error'}`}>{userNameMessage}</div>
        </div>

        <div className="inputContainer">
          <div className="inputLabel">닉네임*</div>
          <input
            type="text"
            className={`inputField ${userNickName ? 'success' : 'error'}`}
            placeholder="닉네임"
            value={userNickName}
            onChange={onChangeUserNickName}
          />
          <div className={`message ${isUserNickName ? 'success' : 'error'}`}>{userNickNameMessage}</div>
        </div>

        <button className="submitButton" onClick={handleSignup}>가입하기</button>
        
      </div>

      <section className="footer">
        <div className="inner">
          <Footer/>
        </div>
      </section>

    </div>
  );
}

export default Logister;
