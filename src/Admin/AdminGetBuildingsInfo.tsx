
import React, { useCallback, useEffect, useRef, useState } from 'react';
import './AdminGetBuildingsInfo.scss'; 
import Header from '../Ashow/Header';
import Footer from '../Ashow/Footer';
import axios from 'axios';
import Dropzone from 'react-dropzone'
import imageCompression from "browser-image-compression";
import Loading from '../components/Loading';
import { useNavigate } from 'react-router-dom';
import MainURL from '../MainURL';


export default function AdminGetBuildingsInfo( props: any) {
  
  let navigate = useNavigate();

  interface postList {
    aptKey : number,
    aptName: string,
    inDate : string,
    houseHoldSum : string,
    addressCity : string,
    addressCounty : string,
    addressRest : string,
  }

  const [postList, setPostList] = useState<postList[]>([]);


  // 게시글 가져오기
  const fetchPosts = async () => {
    const res = await axios.get(`${MainURL}/buildings/buildingsall`)
    if (res) {
      let copy: any = [...res.data];
      setPostList(copy);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);  


  return (
    <div className="AdminContainer">
      
      <Header/>
     
      <div  className="AdminContent_BuildingsInfo">

        {
          postList.map((item:any, index:any)=>{

            const imageCopy = JSON.parse(item.images);

            return (
              <div className="row"
                onClick={()=>{
                  navigate('/admingetpyenginfo', {state : 
                    { 
                      aptKey : item.aptKey
                    }}); 
                }}
              >
                <p className='aptKey'>{item.aptKey}</p>
                <p className='aptName'>{item.aptName}</p>
                {
                  imageCopy.map((subitem:any, subindex:any)=>{
                    return (
                      <div className="subrow">
                        <p>{subitem.name_ko}</p>
                        <p>{subitem.name}</p>
                      </div>
                    )
                  })
                }
              </div>
            )
          })
        }

        <div className="buttonbox">
          <div className="button" onClick={()=>{
            navigate('/adminmain'); 
          }}>
            <p>이전</p>
          </div>
        </div>
        
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
