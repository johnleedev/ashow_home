import React from 'react';
import './LocationMap.css';

function LocationMap(props) {
  return (
    <div className='locationmap'>
        
        <div className='locationmap_box1'>
          <div className='locationmap_notice'>대구 지하철 2호선 황금역 1번 출구에서 5분 거리입니다.</div>
        </div>
        <div className='locationmap_box2'>
          <div className='locationmap_map_wrap'>
            <div className='locationmap_map_content content_left'>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3234.4590886767946!2d128.61748279678963!3d35.837744900000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3565e37500006905%3A0x68de5902ed6dc7b2!2z67mE7JWE7ZWE65287YWM7IqkIOuMgOq1rOygkA!5e0!3m2!1sko!2skr!4v1689661333933!5m2!1sko!2skr" 
              width="580" height="400" >
              </iframe>
            </div>
            <div className='locationmap_map_content content_right'>
              <div className='locationmap_map_button_wrap'>
                <a href='http://kko.to/AlR-8eKocg' target="_blank">
                  <div className='locationmap_map_button btn1'>
                    <img src='img/kakaomap.png'></img>
                    <span>카카오맵</span>
                  </div>
                </a>
                <a href='https://naver.me/xEq0BelJ' target="_blank">
                  <div className='locationmap_map_button btn2'>
                    <img src='img/navermap.png'></img>
                    <span>네이버지도</span>
                  </div>
                </a>
              </div>
              <div  className='locationmap_map_notice_wrap'>
                <div className='locationmap_map_notice'>
                  <div className='locationmap_map_notice_name'>아쇼 사무실</div>
                  <div className='locationmap_map_notice_text'>대구 수성구 청수로26길46, 100호</div>
                </div>
                {/* <div className='locationmap_map_notice'>
                  <div className='locationmap_map_notice_name'>연락처</div>
                  <div className='locationmap_map_notice_text'>010-4925-8855</div>
                </div> */}
                <div className='locationmap_map_notice'>
                  <div className='locationmap_map_notice_name'>문의가능시간</div>
                  <div className='locationmap_map_notice_text'>: 카톡 - 상시</div>
                </div>
              </div>
            </div>

            
          </div>
        </div>

    </div>
  );
}

export default LocationMap;