import './Admin.css'; 
import React, { useEffect, useState } from 'react';
import Header from '../Ashow/Header';
import Footer from '../Ashow/Footer';
import { useNavigate } from 'react-router-dom';
import MainURL from '../MainURL';
import axios from 'axios';

export default function AdminMain( props: any) {
  
  const navigate = useNavigate();
  let [refresh, setRefresh] = useState<boolean>(false);

  // 알림리스트
  interface notifiList {
    id : number,
    notifiTitle : string,
    notifiMessage : string,
    date : string
  }

  let [notifiList, setNotifiList] = useState<notifiList[]>([]);
  const fetchDatas = () => {
    axios.get(`${MainURL}/notification/notifigetlist`).then((res) => {
      const copy = res.data;
      copy.reverse();
      setNotifiList(copy);
    })
  }

  useEffect(()=>{
    fetchDatas();
  }, [refresh])

    
  // 알림보내기
  let [sendNotifiTitle, setsendNotifiTitle] = useState('');
  let [sendNotifiMessage, setsendNotifiMessage] = useState('');
  
  const handleNotification = () => {
    axios
    .post(`${MainURL}/notification/allsendnotifi`, {
      notifiTitle : sendNotifiTitle,
      notifiMessage : sendNotifiMessage
    })
    .then((res) => { 
      setRefresh(!refresh);
      alert(`Title: ${res.data.notifiTitle}, Body: ${res.data.notifiMessage}`);
    })
    .catch((err) => {
      console.log('Notification_err', err);
    });
  }

  // State 변수 추가
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5; // 한 페이지당 표시될 알림 수
  const totalPages = Math.ceil(notifiList.length / itemsPerPage);

  // 알림 리스트를 현재 페이지에 해당하는 부분만 필터링
  const displayedNotifiList = notifiList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 페이지 변경 함수
  const changePage = (newPage: number) => {
    setCurrentPage(newPage);
  };

  
  
  return (
    <div className="AdminContainer">
      <Header/>
    
        <div className='AdminContent'>

          <div className='AdminMainBtn'
            onClick={()=>{navigate('/adminalert')}}
          >알림보내기</div>

          <div className='AdminMainBtn'
            onClick={()=>{navigate('/adminbuildins')}}
          >매물 정보 입력</div>
          
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
