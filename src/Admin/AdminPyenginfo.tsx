
import React, { useCallback, useEffect, useRef, useState } from 'react';
import './AdminPyenginfo.scss'; 
import Header from '../Ashow/Header';
import Footer from '../Ashow/Footer';
import axios from 'axios';
import Dropzone from 'react-dropzone'
import imageCompression from "browser-image-compression";
import Loading from '../components/Loading';
import { useNavigate, useLocation } from 'react-router-dom';
import MainURL from '../MainURL';


export default function AdminPyenginfo( props: any) {
  
  let navigate = useNavigate();
  const location = useLocation(); 
  // const aptKey = location.state.aptKey;
  const aptKey = 1;

  const [isLoading, setIsLoading] = useState<boolean>(false);


  // 평형 정보 입력 박스 ----------------------------------------------------------------------------------------------
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
    priceDefaultHigh : string;
    priceDefaultLow : string
    discountHigh: string;
    discountLow: string;
    ashowDiscountSum: string;
    ashowDiscountGriting: string;
    ashowDiscountFirstUse: string;
    ashowDiscountMember: string;
    ashowDiscountToday: string;
    keyColor: string;
    minusOption : string;
    extendOption : string;
    explanation : string;
  }
 
  // 프로그램 입력 데이터
  const [pyenginfoInputs, setPyenginfoInputs] = useState<PyengInfoProps[]>
  (
    [
      {
        imageFiles: [],
        mainType: 'false',
      pyengName : '',
      pyengNum : '',
      pyengKey : '',
      houseHold : '',
      officialArea : '',
      personalArea : '',
      personalAreaText : '',
      priceDefaultHigh : '',
      priceDefaultLow : '',
      discountHigh: '',
      discountLow: '',
      ashowDiscountSum: '',
      ashowDiscountGriting: '',
      ashowDiscountFirstUse: '',
      ashowDiscountMember: '',
      ashowDiscountToday: '',
      keyColor: '',
      minusOption : '',
      extendOption : '',
      explanation : '',
      },
    ]
  )

  // 연주자 박스 추가
  const addPyengInput = () => {
    setPyenginfoInputs([...pyenginfoInputs, 
      { 
        imageFiles: [],
        mainType: 'false',
        pyengName : '',
        pyengNum : '',
        pyengKey : '',
        houseHold : '',
        officialArea : '',
        personalArea : '',
        personalAreaText : '',
        priceDefaultHigh : '',
        priceDefaultLow : '',
        discountHigh: '',
        discountLow: '',
        ashowDiscountSum: '',
        ashowDiscountGriting: '',
        ashowDiscountFirstUse: '',
        ashowDiscountMember: '',
        ashowDiscountToday: '',
        keyColor: '',
        minusOption : '',
        extendOption : '',
        explanation : '',
        }
      ]);
  };

  // 연주자 박스 삭제
  const deletePyengInput = () => {
    const inputs = [...pyenginfoInputs];
    console.log(inputs.length);
    inputs.splice(inputs.length - 1, 1);
    setPyenginfoInputs(inputs);
  };

  // 이미지 첨부 함수 ----------------------------------------------

  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const onDrop = useCallback(async (acceptedFiles: File[], index:number) => {
    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 500
      };
      const resizedFiles = await Promise.all(
        acceptedFiles.map(async (file) => {
          setImageLoading(true);
          const resizingBlob = await imageCompression(file, options);
          setImageLoading(false);
          return resizingBlob;
        })
      );
      const inputs = [...pyenginfoInputs];
      const copy = new File(resizedFiles, `groundplan${inputs[index].pyengName}.png`, { type: acceptedFiles[0].type });
      inputs[index].imageFiles = [copy];
      setPyenginfoInputs(inputs);
    } catch (error) {
      console.error('이미지 첨부 중 오류 발생:', error);
    }
  }, [pyenginfoInputs]);

    // ---------------------------------------------------------------
  // 정보 입력하기
  const registerPost = async () => {
    const formDataArray = pyenginfoInputs.map((pyenginfo) => {
      const formData = new FormData();
      formData.append("img", pyenginfo.imageFiles[0]);
      return {
        formData,
        getParams: {
          aptKey : aptKey,
          aptName: location.state.aptName, 
          inDate: location.state.inDate, 
          addressCity: location.state.addressCity, 
          addressCounty: location.state.addressCounty, 
          houseHoldSum: location.state.houseHoldSum,
          mainType: pyenginfo.mainType,
          pyengName : pyenginfo.pyengName,
          pyengNum : pyenginfo.pyengName,
          pyengKey : pyenginfo.pyengKey,
          houseHold : pyenginfo.houseHold,
          officialArea : pyenginfo.officialArea,
          personalArea : pyenginfo.personalArea,
          personalAreaText : pyenginfo.personalAreaText,
          priceDefaultHigh : pyenginfo.priceDefaultHigh,
          priceDefaultLow : pyenginfo.priceDefaultLow,
          discountHigh: pyenginfo.discountHigh,
          discountLow: pyenginfo.discountLow,
          ashowDiscountSum: pyenginfo.ashowDiscountSum,
          ashowDiscountGriting: pyenginfo.ashowDiscountGriting,
          ashowDiscountFirstUse: pyenginfo.ashowDiscountFirstUse,
          ashowDiscountMember: pyenginfo.ashowDiscountMember,
          ashowDiscountToday: pyenginfo.ashowDiscountToday,
          keyColor: pyenginfo.keyColor,
          minusOption : pyenginfo.minusOption,
          extendOption : pyenginfo.extendOption,
          explanation : pyenginfo.explanation,
          imageFiles: pyenginfo.imageFiles[0]?.name
        },
      };
    });

    const requests = formDataArray.map(({ formData, getParams }) => {
      return axios.post(`${MainURL}/buildingsadmin/pyenginfo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: getParams,
      });
    });

    try {
      const responses = await Promise.all(requests);
      const allSuccessInserted = responses.every(res => res.data === true);
      if (allSuccessInserted) {
        alert('모든 평형 정보가 성공적으로 입력되었습니다.');
        navigate('/adminmain');
      } else {
        console.error('일부 평형 정보가 입력되지 않았습니다.');
      }
    } catch (error) {
      console.error('여러 명의 출연진 정보를 전송하는 중 에러 발생:', error);
    }
  };


  return isLoading
    ? (
    <div style={{flex:1, width:'100%', height:'80vh'}}>
      <Loading /> 
    </div>
    ) : (
    <div className="AdminContainer">
      
      <Header/>
     
      <div  className="AdminContent_Pyenginfo">
       
        <div className="register titlebox">

          <p>아파트키{aptKey}</p>

          <div className="cover">
            <div className="box1">
              <p>제목</p>
            </div>
            <div className="box2">
              <div className="inputbox">
                <div className='name'>
                  <p>평형키</p>
                </div> 
                <div className='name'>
                  <p>메인타입유무</p>
                </div> 
                <div className='name'>
                  <p>평형이름</p>
                </div> 
                <div className='name'>
                  <p>평형(숫자)</p>
                </div> 
                <div className='name'>
                  <p>세대수(평형별)</p>
                </div> 
                <div className='name'>
                  <p>공급면적</p>
                </div> 
                <div className='name'>
                  <p>전용면적(N)</p>
                </div> 
                <div className='name'>
                  <p>전용면적(T)</p>
                </div> 
                <div className='name cost'>
                  <p>공급가(최고)</p>
                </div> 
                <div className='name cost'>
                  <p>공급가(최저)</p>
                </div> 
                <div className='name'>
                  <p>평형별(색상)</p>
                </div> 
                <div className='name'>
                  <p>마이너스옵션</p>
                </div> 
                <div className='name'>
                  <p>발코니확장비</p>
                </div> 
              </div>
              <div className="inputbox">
                <div className='name'>
                  <p>할인가(최고)</p>
                </div> 
                <div className='name'>
                  <p>할인가(최저)</p>
                </div> 
                <div className='name'>
                  <p>아쇼(축하)</p>
                </div> 
                <div className='name'>
                  <p>아쇼(첫계약)</p>
                </div> 
                <div className='name'>
                  <p>할인가(멤버)</p>
                </div> 
                <div className='name'>
                  <p>할인가(투데이)</p>
                </div> 
                <div className='name'>
                  <p>아쇼혜택합계</p>
                </div> 
              </div>
            </div> 
            
            <div className="box3">
              <div className="inputbox2">
                <div className='name'>
                  <p>사진</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div style={{height:'250px'}}></div>
        
        <div className="register">
        {pyenginfoInputs?.map((item, index)=>{
        return (
          <>
          <div className="cover">
            <div className="box1">
              <p>평형{index+1}</p>
            </div>
            <div className="box2">
              <div className="inputbox">
                {/* 평형키*/}
                <input type="text" value={index+1} />
                {/* 메인타입유무*/}
                <input type="text" value={pyenginfoInputs[index].mainType} 
                  onChange={(e)=>{
                    const inputs = [...pyenginfoInputs];
                    inputs[index].mainType = e.target.value;
                    setPyenginfoInputs(inputs);
                  }} />
                {/* 평형이름*/}
                <input type="text" value={pyenginfoInputs[index].pyengName} 
                  onChange={(e)=>{
                    const inputs = [...pyenginfoInputs];
                    inputs[index].pyengName = e.target.value;
                    setPyenginfoInputs(inputs);
                  }} />
                {/* 평형(숫자)*/}
                <input type="text" value={pyenginfoInputs[index].pyengNum} 
                  onChange={(e)=>{
                    const inputs = [...pyenginfoInputs];
                    inputs[index].pyengNum = e.target.value;
                    setPyenginfoInputs(inputs);
                  }} />
                {/* 세대수(평형별)*/}
                <input type="text" value={pyenginfoInputs[index].houseHold} 
                  onChange={(e)=>{
                    const inputs = [...pyenginfoInputs];
                    inputs[index].houseHold = e.target.value;
                    setPyenginfoInputs(inputs);
                  }} />
                {/* 공급면적*/}
                <input type="text" value={pyenginfoInputs[index].officialArea} 
                  onChange={(e)=>{
                    const inputs = [...pyenginfoInputs];
                    inputs[index].officialArea = e.target.value;
                    setPyenginfoInputs(inputs);
                  }} />
                {/* 전용면적(N)*/}
                <input type="text" value={pyenginfoInputs[index].personalArea} 
                  onChange={(e)=>{
                    const inputs = [...pyenginfoInputs];
                    inputs[index].personalArea = e.target.value;
                    setPyenginfoInputs(inputs);
                  }} />
                {/* 전용면적(T)*/}
                <input type="text" value={pyenginfoInputs[index].personalAreaText} 
                  onChange={(e)=>{
                    const inputs = [...pyenginfoInputs];
                    inputs[index].personalAreaText = e.target.value;
                    setPyenginfoInputs(inputs);
                  }} />
                {/* 공급가(최고)*/}
                <input type="text" value={pyenginfoInputs[index].priceDefaultHigh} 
                  className=' cost'
                  onChange={(e)=>{
                    const inputs = [...pyenginfoInputs];
                    inputs[index].priceDefaultHigh = e.target.value;
                    setPyenginfoInputs(inputs);
                  }} />
                {/* 공급가(최저)*/}
                <input type="text" value={pyenginfoInputs[index].priceDefaultLow}  
                  className=' cost'
                  onChange={(e)=>{
                    const inputs = [...pyenginfoInputs];
                    inputs[index].priceDefaultLow = e.target.value;
                    setPyenginfoInputs(inputs);
                  }} />
                {/* 평형별(색상)*/}
                <input type="text" value={pyenginfoInputs[index].keyColor} 
                  onChange={(e)=>{
                    const inputs = [...pyenginfoInputs];
                    inputs[index].keyColor = e.target.value;
                    setPyenginfoInputs(inputs);
                  }} />
                {/* 마이너스옵션*/}
                <input type="text" value={pyenginfoInputs[index].minusOption} 
                  onChange={(e)=>{
                    const inputs = [...pyenginfoInputs];
                    inputs[index].minusOption = e.target.value;
                    setPyenginfoInputs(inputs);
                  }} />
                {/* 발코니확장비*/}
                <input type="text" value={pyenginfoInputs[index].extendOption} 
                  onChange={(e)=>{
                    const inputs = [...pyenginfoInputs];
                    inputs[index].extendOption = e.target.value;
                    setPyenginfoInputs(inputs);
                  }} />
              </div>

              <div className="inputbox">
                {/* 할인가(최고)*/}
                <input type="text" value={pyenginfoInputs[index].discountHigh} 
                  onChange={(e)=>{
                    const inputs = [...pyenginfoInputs];
                    inputs[index].discountHigh = e.target.value;
                    setPyenginfoInputs(inputs);
                  }} />
                {/* 할인가(최저)*/}
                <input type="text" value={pyenginfoInputs[index].discountLow} 
                  onChange={(e)=>{
                    const inputs = [...pyenginfoInputs];
                    inputs[index].discountLow = e.target.value;
                    setPyenginfoInputs(inputs);
                  }} />
                {/* 아쇼(축하)*/}
                <input type="text" value={pyenginfoInputs[index].ashowDiscountGriting} 
                  onChange={(e)=>{
                    const inputs = [...pyenginfoInputs];
                    inputs[index].ashowDiscountGriting = e.target.value;
                    setPyenginfoInputs(inputs);
                  }} />
                {/* 아쇼(첫계약)*/}
                <input type="text" value={pyenginfoInputs[index].ashowDiscountFirstUse} 
                  onChange={(e)=>{
                    const inputs = [...pyenginfoInputs];
                    inputs[index].ashowDiscountFirstUse = e.target.value;
                    setPyenginfoInputs(inputs);
                  }} />
                {/* 할인가(멤버)*/}
                <input type="text" value={pyenginfoInputs[index].ashowDiscountMember} 
                  onChange={(e)=>{
                    const inputs = [...pyenginfoInputs];
                    inputs[index].ashowDiscountMember = e.target.value;
                    setPyenginfoInputs(inputs);
                  }} />
                {/* 할인가(투데이)*/}
                <input type="text" value={pyenginfoInputs[index].ashowDiscountToday} 
                  onChange={(e)=>{
                    const inputs = [...pyenginfoInputs];
                    inputs[index].ashowDiscountToday = e.target.value;
                    setPyenginfoInputs(inputs);
                  }} />
                {/* 아쇼혜택합계*/}
                <input type="text" value={pyenginfoInputs[index].ashowDiscountSum} 
                  onChange={(e)=>{
                    const inputs = [...pyenginfoInputs];
                    inputs[index].ashowDiscountSum = e.target.value;
                    setPyenginfoInputs(inputs);
                  }} />
              </div>

              <div className="inputbox2">
                <div className='name'>
                  <p>아파트소개</p>
                </div>
                <input type="text" value={pyenginfoInputs[index].explanation} 
                  onChange={(e)=>{
                    const inputs = [...pyenginfoInputs];
                    inputs[index].explanation = e.target.value;
                    setPyenginfoInputs(inputs);
                  }} />
              </div>
            </div> 

            <div className="box3">
              <div className="boxStyle">
                {/* {pyenginfoInputs[index].imageFiles.length > 0 && 
                  <div className='imagedelete' onClick={()=>{
                    const copy = [...pyenginfoInputs];
                    copy[index].imageFiles = [];
                    setPyenginfoInputs(copy);
                  }}>-</div>
                } */}
                {pyenginfoInputs[index].imageFiles.length > 0 ? (
                  <img
                    src={URL.createObjectURL(pyenginfoInputs[index].imageFiles[0])}
                    style={{ width: '100%', height: '100%'}}
                  />
                  ) : (
                    <>
                    {
                      imageLoading ?
                      <div style={{width:'100%', height:'100%', position:'absolute'}}>
                        <Loading/>
                      </div>
                      :
                      <Dropzone onDrop={(e)=>{onDrop(e, index)}}>
                        {({ getRootProps, getInputProps }) => (
                          <div {...getRootProps({imageIndex : index})} className="dropzoneStyle">
                            <input {...getInputProps()} />
                            <div className='imageplus'>+</div>
                          </div>
                        )}
                      </Dropzone>
                    }
                    </>
                  )
                }
              </div>
            </div>
          </div>
          <div style={{width:'100%', height:'2px', backgroundColor:'#BDBDBD'}}></div>
          </>
          )
        })}

        <div style={{ display:'flex'}} className='pyeng-plus-box'>
          * 평형 입력란 추가/삭제
          <div className='pyeng-plus-button'
            onClick={addPyengInput}
            >
              <p>+</p>
          </div>
          <div className='pyeng-plus-button'
            onClick={deletePyengInput}
            >
              <p>-</p>
          </div>
        </div>
        

        <div className="buttonbox">
          <div className="button" onClick={()=>{
            navigate('/adminmain'); 
          }}>
            <p>이전</p>
          </div>
          <div className="button" onClick={registerPost}>
            <p>작성 완료</p>
          </div>
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
