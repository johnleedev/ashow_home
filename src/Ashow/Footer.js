import React from 'react';
import "./Footer.css";

function Footer(props) {
  return (
    <div className='footer'>
      <div className='footer_box'>
        <div className='footer_box_box1'>
          <div className='footer_notice'>
            <div className='footer_notice_name'>상호명</div>  
            <div className='footer_notice_content'>(주)더그릿 (대표자: 이요한)</div>  
          </div>
          <div className='footer_notice'>
            <div className='footer_notice_name'>사업자번호</div>  
            <div className='footer_notice_content'>146-87-02718</div>  
          </div>
          {/* <div className='footer_notice'>
            <div className='footer_notice_name'>대표연락처</div>  
            <div className='footer_notice_content'>010-4925-8855</div>  
          </div> */}
          <div className='footer_notice'>
            <div className='footer_notice_name'>업체주소</div>  
            <div className='footer_notice_content'>대구 수성구 청수로26길46, 1001호</div>  
          </div>
        </div>
        <div className='footer_box_box2'>
          <div className='footer_notice_right'>
            <div className='footer_notice_instarname'>
              {/* <a href='https://www.instagram.com/studentsclassicvocal/' target='_blank'> */}
              <img src='img/instarblack.png'></img>
              {/* </a> */}
            </div>  
            <div className='footer_notice_instarcontent'>
              <div className='footer_notice_instarcontent_text'>아쇼</div>  
              <div className='footer_notice_instarcontent_text'>전용 인스타그램 계정</div>  
              <div className='footer_notice_instarcontent_text'>(@ashow)</div>  
            </div>  
          </div>
          <div className='footer_notice_right'>
            <div className='footer_notice_reseved'>
            © 2023. The Grit Inc.. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;