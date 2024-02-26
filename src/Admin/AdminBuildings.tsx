
import React, { useCallback, useEffect, useRef, useState } from 'react';
import './AdminBuildings.scss'; 
import Header from '../Ashow/Header';
import Footer from '../Ashow/Footer';
import axios from 'axios';
import Dropzone from 'react-dropzone'
import imageCompression from "browser-image-compression";
import Loading from '../components/Loading';
import { useNavigate } from 'react-router-dom';
import MainURL from '../MainURL';


export default function AdminBuildings( props: any) {
  
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [aptName, setAptName] = useState('');
  const [inDate, setInDate] = useState('');
  const [houseHoldSum, setHouseHoldSum] = useState('');
  const [addressCity, setAddressCity] = useState('');
  const [addressCounty, setAddressCounty] = useState('');
  const [addressRest, setAddressRest] = useState('');
  const [parkingAll, setParkingAll] = useState('');
  const [parkingHouseHold, setParkingHouseHold] = useState('');
  const [parkingForm, setParkingForm,] = useState('');
  const [pubTransSubway, setPubTransSubway] = useState('');
  const [pubTransSubwayDistance, setPubTransSubwayDistance] = useState('');
  const [pubTransTrain, setPubTransTrain] = useState('');
  const [pubTransTrainDistance, setPubTransTrainDistance] = useState('');
  const [promotionSite, setPromotionSite] = useState('');
  const [promotionPhone, setPromotionPhone] = useState('');
  const [buildingsNum, setBuildingsNum] = useState('');
  const [pyengTypes, setPyengTypes] = useState('');
  const [floorAreaRatio, setFloorAreaRatio] = useState('');
  const [buildingCoverRatio, setBuildingCoverRatio] = useState('');
  const [lowFloor, setLowFloor] = useState('');
  const [highFloor, setHighFloor] = useState('');
  const [heating, setHeating] = useState('');
  const [constructorCompany, setConstructorCompany] = useState('');
  const [developerCompany, setDeveloperCompany] = useState('');
  const [doorStructure, setDoorStructure] = useState('');
  const [companyHomePage, setCompanyHomePage] = useState('');
  const [contractCostPer, setContractCostPer] = useState('');
  const [middleCostPer, setMiddleCostPer] = useState('');
  const [restCostPer, setRestCostPer] = useState('');
  const [imageNamesParse, setImageNamesParse] = useState('');
  const [communityImageNamesParse, setCommunityImageNamesParse] = useState('');

 
  // 커뮤티 ---------------------------------------------------------------

  interface CommunityProps {
    location : string;
    name : string;
    notice : string;
  }

  const [community, setCommunity] = useState<CommunityProps[]>([
    { location: '', name: '', notice:'' }
  ]);

  const addCommunityInput = () => {
    setCommunity([...community, { location: '', name: '', notice:'' }]);
  };


  // 커뮤니티 위치 입력란 변경
  const handleCommunityLocationChange = (index: number, text: string) => {
    const inputs = [...community];
    inputs[index].location = text;
    setCommunity(inputs);
  };
  // 커뮤니티 이름 입력란 변경
  const handleCommunityNameChange = (index: number, text: string) => {
    const inputs = [...community];
    inputs[index].name = text;
    setCommunity(inputs);
  };
  // 커뮤니티 설명 입력란 변경
  const handleCommunityNoticeChange = (index: number, text: string) => {
    const inputs = [...community];
    inputs[index].notice = text;
    setCommunity(inputs);
  };


  // 이미지 첨부 함수 ----------------------------------------------
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [images, setImages] = useState([
    { file: new File([], ""), name: "투시도1" },
    { file: new File([], ""), name: "투시도2" },
    { file: new File([], ""), name: "조감도" },
    { file: new File([], ""), name: "입지환경" },
    { file: new File([], ""), name: "동호수배치도" },
    { file: new File([], ""), name: "단지배치도" },
    { file: new File([], ""), name: "커뮤니티1" },
    { file: new File([], ""), name: "커뮤니티2" }
  ]);
       
  const onDrop = useCallback(async (acceptedFiles: File[], index:number) => {
    const imagesName = ["3dview1", "3dview2", "airview", "environment", "arrangehouse", "arrangebuilding", "community1", "community2"]
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
      const inputs = [...images];
      const copy = new File(resizedFiles, `${imagesName[index]}.png`, { type: acceptedFiles[0].type });
      inputs[index].file = copy;
      setImages(inputs);
    } catch (error) {
      console.error('이미지 리사이징 중 오류 발생:', error);
    }
  }, [images]);
  

  // 이미지 첨부 체크 ---------------------------------------------------------------
  const imagesSaveNamesOrigin = [
    {name_ko:"투시도1", name: "3dview1"},
    {name_ko:"투시도2", name: "3dview2"},
    {name_ko:"조감도", name: "airview"},
    {name_ko:"입지환경", name: "environment"},
    {name_ko:"동호수배치도", name: "arrangehouse"},
    {name_ko:"단지배치도", name: "arrangebuilding"},
  ]
  const communityImagesSaveNamesOrigin = ["community1", "community2"]

  interface CheckedImageProps {
    name_ko: string;
    name: string;
  }

  const [imagesSaveNames, setImagesSaveNames] = useState<CheckedImageProps[]>([]);
  const [communityImagesSaveNames, setCommunityImagesSaveNames] = useState<string[]>([]);

  const handleImageChecked = (Idx:number) => {
    if (Idx < 6 ) {
      const copy = [...imagesSaveNames]
      copy[Idx] = imagesSaveNamesOrigin[Idx];
      setImagesSaveNames(copy);
      setImageNamesParse(JSON.stringify(copy));
    } else {
      const copy2 = [...communityImagesSaveNames];
      copy2[Idx-5] = communityImagesSaveNamesOrigin[Idx-5];
      setCommunityImagesSaveNames(copy2);
      setCommunityImageNamesParse(JSON.stringify(copy2));
    }
    
  }

  // ---------------------------------------------------------------
  // 정보 입력하기
  const registerPost = async () => {
    await setIsLoading(true);
    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append('img', image.file);
    });
    
    const getParams = {
      aptName: aptName, inDate: inDate, houseHoldSum: houseHoldSum, 
      addressCity: addressCity, addressCounty: addressCounty, addressRest: addressRest, 
      images : imageNamesParse, community : JSON.stringify(community), communityImages : communityImageNamesParse,
      parkingAll: parkingAll, parkingHouseHold: parkingHouseHold, parkingForm:parkingForm,
      pubTransSubway: pubTransSubway, pubTransSubwayDistance: pubTransSubwayDistance, 
      pubTransTrain: pubTransTrain, pubTransTrainDistance: pubTransTrainDistance, 
      promotionSite: promotionSite, promotionPhone: promotionPhone, 
      buildingsNum: buildingsNum, pyengTypes: pyengTypes, 
      floorAreaRatio: floorAreaRatio, buildingCoverRatio: buildingCoverRatio, lowFloor: lowFloor, highFloor: highFloor, 
      heating: heating, constructorCompany: constructorCompany, developerCompany: developerCompany, doorStructure: doorStructure, 
      companyHomePage: companyHomePage, contractCostPer: contractCostPer, middleCostPer: middleCostPer, restCostPer: restCostPer
    }

    axios 
      .post(`${MainURL}/buildingsadmin/defaultinfo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: getParams,
      })
      .then((res) => {
        if (res.data.success === true) {
          alert('입력되었습니다.');
          navigate('/adminpyenginfo', {state : 
            { 
              aptKey : res.data.aptKey,
              aptName: aptName,
              inDate : inDate,
              houseHoldSum : houseHoldSum,
              addressCity : addressCity,
              addressCounty : addressCounty,
            }}); 
        } else {
          alert(res.data);
        }
      })
      .catch(() => {
        console.log('실패함')
      })
  };

  return isLoading
    ? (
    <div style={{flex:1, width:'100%', height:'80vh'}}>
      <Loading /> 
    </div>
    ) : (
    <div className="AdminContainer">
      
      <Header/>
     
      <div  className="AdminContent_Buildings">
        
        <div className="register">
          <div className="inputbox">
            <div className='name'>
              <p>아파트명</p>
            </div>
            <input type="text" onChange={(e)=>{setAptName(e.target.value)}} value={aptName} />
          </div>

          <div className="inputbox2cover">
            <div className="inputbox2">
              <div className='name'>
                <p>입주일</p>
              </div>
              <input type="text" onChange={(e)=>{setInDate(e.target.value)}} value={inDate} />
            </div>
            <div className="inputbox2">
              <div className='name'>
                <p>세대수</p>
              </div>
              <input type="text" onChange={(e)=>{setHouseHoldSum(e.target.value)}} value={houseHoldSum} />
            </div>
          </div>

          <div className="inputbox2cover">
            <div className="inputbox2">
              <div className='name'>
                <p>주소(시)</p>
              </div>
              <input type="text" onChange={(e)=>{setAddressCity(e.target.value)}} value={addressCity} />
            </div>
            <div className="inputbox2">
              <div className='name'>
                <p>주소(구)</p>
              </div>
              <input type="text" onChange={(e)=>{setAddressCounty(e.target.value)}} value={addressCounty} />
            </div>
          </div>
          <div className="inputbox">
            <div className='name'>
              <p>주소(남은주소)</p>
            </div>
            <input type="text" onChange={(e)=>{setAddressRest(e.target.value)}} value={addressRest} />
          </div>

          <div className="inputbox2cover">
            <div className="inputbox2">
              <div className='name'>
                <p>총주차장수</p>
              </div>
              <input type="text" onChange={(e)=>{setParkingAll(e.target.value)}} value={parkingAll} />
            </div>
            <div className="inputbox2">
              <div className='name'>
                <p>세대당주차장수</p>
              </div>
              <input type="text" onChange={(e)=>{setParkingHouseHold(e.target.value)}} value={parkingHouseHold} />
            </div>
          </div>

          <div className="inputbox2cover">
            <div className="inputbox2">
              <div className='name'>
                <p>주차장형태</p>
              </div>
              <input type="text" onChange={(e)=>{setParkingForm(e.target.value)}} value={parkingForm} />
            </div>
            <div className="inputbox2">
              <div className='name'>
                <p>동(빌딩)수</p>
              </div>
              <input type="text" onChange={(e)=>{setBuildingsNum(e.target.value)}} value={buildingsNum} />
            </div>
          </div>

          <div className="inputbox2cover">
            <div className="inputbox2">
              <div className='name'>
                <p>지하철역</p>
              </div>
              <input type="text" onChange={(e)=>{setPubTransSubway(e.target.value)}} value={pubTransSubway} />
            </div>
            <div className="inputbox2">
              <div className='name'>
                <p>지하철역거리</p>
              </div>
              <input type="text" onChange={(e)=>{setPubTransSubwayDistance(e.target.value)}} value={pubTransSubwayDistance} />
            </div>
          </div>
          <div className="inputbox2cover">
            <div className="inputbox2">
              <div className='name'>
                <p>기차역</p>
              </div>
              <input type="text" onChange={(e)=>{setPubTransTrain(e.target.value)}} value={pubTransTrain} />
            </div>
            <div className="inputbox2">
              <div className='name'>
                <p>기차역거리</p>
              </div>
              <input type="text" onChange={(e)=>{setPubTransTrainDistance(e.target.value)}} value={pubTransTrainDistance} />
            </div>
          </div>

          <div className="inputbox2cover">
            <div className="inputbox2">
              <div className='name'>
                <p>홍보관위치</p>
              </div>
              <input type="text" onChange={(e)=>{setPromotionSite(e.target.value)}} value={promotionSite} />
            </div>
            <div className="inputbox2">
              <div className='name'>
                <p>홍보관전화</p>
              </div>
              <input type="text" onChange={(e)=>{setPromotionPhone(e.target.value)}} value={promotionPhone} />
            </div>
          </div>

          <div className="inputbox">
            <div className='name'>
              <p>평타입</p>
            </div>
            <input type="text" onChange={(e)=>{setPyengTypes(e.target.value)}} value={pyengTypes} />
          </div>

          <div className="inputbox2cover">
            <div className="inputbox2">
              <div className='name'>
                <p>용적률</p>
              </div>
              <input type="text" onChange={(e)=>{setFloorAreaRatio(e.target.value)}} value={floorAreaRatio} />
            </div>
            <div className="inputbox2">
              <div className='name'>
                <p>건폐율</p>
              </div>
              <input type="text" onChange={(e)=>{setBuildingCoverRatio(e.target.value)}} value={buildingCoverRatio} />
            </div>
          </div>

          <div className="inputbox2cover">
            <div className="inputbox2">
              <div className='name'>
                <p>최저층</p>
              </div>
              <input type="text" onChange={(e)=>{setLowFloor(e.target.value)}} value={lowFloor} />
            </div>
            <div className="inputbox2">
              <div className='name'>
                <p>최고층</p>
              </div>
              <input type="text" onChange={(e)=>{setHighFloor(e.target.value)}} value={highFloor} />
            </div>
          </div>

          <div className="inputbox2cover">
            <div className="inputbox2">
              <div className='name'>
                <p>시공사</p>
              </div>
              <input type="text" onChange={(e)=>{setConstructorCompany(e.target.value)}} value={constructorCompany} />
            </div>
            <div className="inputbox2">
              <div className='name'>
                <p>시행사</p>
              </div>
              <input type="text" onChange={(e)=>{setDeveloperCompany(e.target.value)}} value={developerCompany} />
            </div>
          </div>

          <div className="inputbox2cover">
            <div className="inputbox2">
              <div className='name'>
                <p>난방</p>
              </div>
              <input type="text" onChange={(e)=>{setHeating(e.target.value)}} value={heating} />
            </div>
            <div className="inputbox2">
              <div className='name'>
                <p>현관구조</p>
              </div>
              <input type="text" onChange={(e)=>{setDoorStructure(e.target.value)}} value={doorStructure} />
            </div>
          </div>

          <div className="inputbox2cover">
            <div className="inputbox2">
              <div className='name'>
                <p>홈페이지</p>
              </div>
              <input type="text" onChange={(e)=>{setCompanyHomePage(e.target.value)}} value={companyHomePage} />
            </div>
            <div className="inputbox2">
              <div className='name'>
                <p>계약금비율</p>
              </div>
              <input type="text" onChange={(e)=>{setContractCostPer(e.target.value)}} value={contractCostPer} />
            </div>
          </div>

          <div className="inputbox2cover">
           
            <div className="inputbox2">
              <div className='name'>
                <p>중도금비율</p>
              </div>
              <input type="text" onChange={(e)=>{setMiddleCostPer(e.target.value)}} value={middleCostPer} />
            </div>
            <div className="inputbox2">
              <div className='name'>
                <p>잔금비율</p>
              </div>
              <input type="text" onChange={(e)=>{setRestCostPer(e.target.value)}} value={restCostPer} />          
            </div>
          </div>

          <div style={{width:'90%', height:'10px', backgroundColor:'#EAEAEA', margin: '10px'}}></div>
          <p>커뮤니티</p>
          {community.map((item:any, index:any) => {
            return (
              <>
                <div className="inputbox2cover">
                  <div className="inputbox2">
                    <div className='name'>
                      <p>위치</p>
                    </div>
                    <input type="text" onChange={(e)=>{handleCommunityLocationChange(index, e.target.value)}} value={item.location} />
                  </div>
                  <div className="inputbox2">
                    <div className='name'>
                      <p>이름</p>
                    </div>
                    <input type="text" onChange={(e)=>{handleCommunityNameChange(index, e.target.value)}} value={item.name} />          
                  </div>
                </div>
                <div className="inputbox">
                  <div className='name'>
                    <p>설명</p>
                  </div>
                  <input type="text" onChange={(e)=>{handleCommunityNoticeChange(index, e.target.value)}} value={item.notice} />
                </div>
                { index === community.length - 1 &&
                  <div 
                    style={{width:'100px', height:'30px', backgroundColor:'#EAEAEA', margin: '10px'}}
                    onClick={addCommunityInput}
                  >+</div>
                }
              </>
            )
          })}

          <div className="inputbox">
            <div className='name'>
              <p> 커뮤니티 이미지 텍스트</p>
            </div>
            <input type="text" onChange={(e)=>{setCommunityImageNamesParse(e.target.value)}} value={communityImageNamesParse} />
          </div>

          <div style={{width:'90%', height:'10px', backgroundColor:'#EAEAEA', margin: '10px'}}></div>

          <div className="inputbox">
            <div className='name'>
              <p>이미지 텍스트</p>
            </div>
            <input type="text" onChange={(e)=>{setImageNamesParse(e.target.value)}} value={imageNamesParse} />
          </div>

          
          <div className='imageContainer'>

            {images.map((item:any, index:any) => {

            return (
            <div className="imageBox" style={{width: '200px', height: `300px`}}>
              
              <input 
                className='checkbox' type='checkbox'
                onChange={() => {
                  handleImageChecked(index)
                }}
              ></input>
                
              <p>{item.name}</p>
              {images[index].file.name !== "" ? (
                <img
                  src={URL.createObjectURL(images[index].file)}
                  style={{ width: '200px', height: '300px'}}
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
              {
                images[index].file.name !== "" && 
                <div className='imagedelete' onClick={()=>{
                  const copy = [...images];
                  copy[index].file = new File([], "");
                  setImages(copy);
                }}>삭제</div>
              }
            </div>
            )
            })}
          
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
