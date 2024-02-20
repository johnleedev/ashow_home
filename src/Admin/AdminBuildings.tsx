
import './AdminBuildings.scss'; 
import React, { useState } from 'react';
import Header from '../Ashow/Header';
import Footer from '../Ashow/Footer';
import axios from 'axios';

export default function AdminBuildings( props: any) {

  return (
    <div className="AdminContainer">
      <Header/>
      
      
      <div  className="AdminContent">
        
       
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
