
import React, { useCallback, useEffect, useRef, useState } from 'react';
import './AdminGetBuildingsInfo.scss'; 
import Header from '../Ashow/Header';
import Footer from '../Ashow/Footer';
import axios from 'axios';
import Dropzone from 'react-dropzone'
import imageCompression from "browser-image-compression";
import Loading from '../components/Loading';
import { useLocation, useNavigate } from 'react-router-dom';
import MainURL from '../MainURL';


export default function AdminGetPyengInfo( props: any) {
  
  let navigate = useNavigate();
   const location = useLocation(); 
   const aptKey = location.state.aptKey;

   interface PyengInfoProps {
    imageFiles: File[];
    mainType: string;
    pyengName : string;
    pyengNum : string;
    pyengKey : string;
    houseHold : string;
    officialArea : string;
    personalArea : string;
    personalAreaText : string;
  }
 

  const [postList, setPostList] = useState<PyengInfoProps[]>([]);


  // 게시글 가져오기
  const fetchPosts = async () => {
    const res = await axios.get(`${MainURL}/buildings/pyenginfo/${aptKey}`)
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

            // const imageCopy = JSON.parse(item.images);

            return (
              <div className="row"
                
              >
                <p className='aptKey'>{item.aptKey}</p>
                <p className='aptName'>{item.aptName}</p>
                <p className='aptName'>{item.personalAreaText}</p>
                <p className='aptName'>{item.imageFiles}</p>
              </div>
            )
          })
        }

        <div className="buttonbox">
          <div className="button" onClick={()=>{
            navigate('/admingetbuildingsinfo'); 
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
