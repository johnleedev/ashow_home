import React from 'react'
import './Header.css';
import { Routes, Route, useNavigate } from 'react-router-dom';

export default function Header() {

  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="menu" id="menu">
          <div className="menu_1">
          <div className="maintitle" onClick={()=>{
              navigate(`/`)
              }}>Ashow</div>
          </div>
          <div className="menu_2"></div>
          <div className="menu_3">
          <div className="menulist" onClick={()=>{}}>What is Ashow</div>
          <div className="menulist" onClick={()=>{}}>문의</div>
          <div className="menulist" onClick={()=>{}}>위치</div>
          {/* <div className="menulist" onClick={()=>{
              navigate(`/login`)
          }}>로그인</div>
          <div className="menulist" onClick={()=>{
              navigate(`/admin`)
          }}>관리자</div> */}

          </div>
      </div>
    </header>
  )
}
