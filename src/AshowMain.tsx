import './AshowMain.css';
import Question from './Ashow/Question';
import LocationMap from './Ashow/LocationMap';
import Footer from './Ashow/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import Header from './Ashow/Header';

function AshowMain() {
  
  return (
    <div className="AshowMain">
      
      <Header></Header>
     
      
      {/* 메인화면 */}
      <section className="mainNotice">
        <div className="inner">
          <div className="notice_name">
            <div className="box1"><FontAwesomeIcon icon={faHouse}/></div>
            <div className="box2">What is Ashow</div>
          </div>
          <div className='noticeImageBox'>
            <img src='img/sample(1).png'></img>
          </div>

          <div className="sub_notice2">
          어플리케이션 ‘아쇼’는, 부동산 거래에 필요한 정보를 수집하고, 
          <br></br>이를 사용자에게 제공하여 부동산의 거래 비용을 절감하여, 
          <br></br>부동산 거래 시장을 보다 투명하게 만들고자 합니다.
          <br></br>‘아쇼’를 통해 사용자들은 부동산 거래에 필요한 정보를 쉽게 찾을 수 있으며, 
          <br></br>좀 더 낮춰진 비용으로 부동산을 구입할 수 있습니다. 
          <br></br>뿐만 아니라 부동산 공급자들은 광고비용을 절감 할 수 있고, 
          <br></br>미분양 매물의 비율을 낮출 수 있습니다.
          <br></br>이러한 방식으로 ‘아쇼’는 부동산 거래 시장에 혁신을 가져오고, 
          <br></br>사용자들의 부동산 거래 경험을 개선하는 것을 목표로 합니다.
          </div>
          <div className='noticeImageBox'>
            <img src='img/sample(2).png'></img>
            <img src='img/sample(3).png'></img>
            <img src='img/sample(4).png'></img>
          </div>
        </div>        
      </section>

      {/* 문의방법  */}
      <section className="Qustion" id='Qustion'>
        <div className="inner">
          <div className="notice_name">
            <div className="box1"><FontAwesomeIcon icon={faHouse}/></div>
            <div className="box2">문의방법</div>
          </div>
        <Question></Question>
        </div>        
      </section>

      {/* 오시는길  */}
      <section className="LocationMap" id='LocationMap'>
        <div className="inner">
          <div className="notice_name">
          <div className="box1"><FontAwesomeIcon icon={faHouse}/></div>
            <div className="box2">오시는길</div>
          </div>

        <LocationMap></LocationMap>
        </div>        
      </section>

      {/* footer */}
      <section className="footer">
        <div className="inner">
          <Footer></Footer>
        </div>
      </section>


    </div>
  );
}

export default AshowMain;
