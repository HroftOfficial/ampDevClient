import React,{useEffect, useState} from 'react';
import styled from 'styled-components';
import './about.css';
import InfoService from '../../services/InfoService';
import photo from '../../img/photo_o_nas_1.jpg';
import aboutMap from '../../img/about-map.png';

const About = () => {
    const [info, setInfo] = useState([])

    useEffect(() => {
      try {
        (async () => {
          const response = await InfoService.fetchInfo();

          setInfo(response?.data?.allUser);
        })()
      } catch (error) {
        console.log(error);
      }
    }, [])

  return (
    <Body>
      <Map src={aboutMap} alt=''/>

      <h3>ЧЕМ МЫ ЗАНИМАЕМСЯ</h3>

      <WhatWeDo>
        <h3>МЫ</h3>
        <p>В Ассоциацию Металлообрабатывающих Предприятий 
          входит {info} предприятий со всех уголков Росcии 
          и стран ЕАЭС. От гигантов машиностроения до небольших 
          производственных цехов, многие из участников обладают 
          необходимыми допусками, сертификатами и аккредитациями, 
          включая морской регистр и военную приемку.</p>
      </WhatWeDo>

      <Vectors>
        <div className='img'>
          <img src={photo} alt=''/>
        </div>
        <div className='content'>
          <h3>ВОСТРЕБОВАННЫЕ НАПРАВЛЕНИЯ</h3>
          <li>Доступ к заказам по металлообработке</li>
          <li>Возможность найти исполнителей и партнеров по промышленной кооперации</li>
          <li>Особые условия от поставщиков оборудования, инструмента и расходных материалов</li>
          <li>Доступ к базе оборудования выставленного нашими участниками на продажу</li>
          <li>Инжиниринговые услуги от наших лучших КБ и инжиниринговых центров</li>
          <li>Помощь в выстраивании логистических цепочек, поиске и проверке иностранных поставщиков</li>
          <li>Консультации по навигации в мерах государственной поддержке</li>
          <li>Юридические вопросы и содействие в выстраивании конструктивных отношений с органами власти</li>
          <li>Привлечение источников финансирования, в том числе частных инвестиций</li>
          <li>Доращивание производств и технологий, консультации по развитию предприятия от лучших специалистов области</li>
        </div>
      </Vectors>

      <Bottom>
        <h3>НА НАШЕМ САЙТЕ</h3>
        <p>На площадке https://amp.copartner.ru созданной при поддержке АМП, 
          участники Ассоциации имеют доступ почти к 2000 актуальных чертежей 
          заказов, в том числе, серийных заказов крупных промышленных предприятий. 
          По приблизительной оценке, суммарно размещено заказов более, чем 
          на 6 миллиардов рублей. Субконтрактация происходит напрямую между 
          заказчиком и исполнителем, без посредников. Из тех субконтрактов 
          которые проходили при сопровождении АМП, за последние пол года, 
          известно о 84 взятых заказов, на общую сумму, порядка 210 000 000 руб. 
          (не учитывая повторяемость этих же заказов, в случае, если контракт 
          подписан на серийное производство), вместе с тем, ещё больший объём 
          сложившихся при нашем содействии коопераций не фиксируется, поскольку 
          проходит без сопровождения Ассоциации.</p>
        <h3>ЕЩЕ РЕАЛИЗУЮТСЯ ПРОЕКТЫ</h3>
        <div>
          <li>силами участников АМП, организовано строительство кислородного завода на предприятии участнике Ассоциации;</li>
          <li>подписан меморандум об организации производства металлорежущего оборудования для предприятия участника АМП;</li>
          <li> для крупного оборонного предприятия участника Ассоциации, предложен и разработан проект по повышению энергоэффективности (работы по строительству новых электростанций, в рамках проекта, планируется начать в ближайшее время);</li>
          <li>запущено импортозамещающее металлообрабатывающее производство ТНП, организованы каналы сбыта этой продукции, через крупные федеральные торговые сети.</li>
        </div>

        <div className='bordered-div'>
          Мы открыты для взаимодействия с новыми участниками, с госструктурами, 
          с лицами заинтересованными в развитии металлообрабатывающей отрасли нашей страны.
          Мы обращается к федеральным и региональным властям за поддержкой и содействием 
          в налаживании контактов с металлообрабатывающими предприятиями, установлении 
          взаимодействия с представителями власти и руководителями регионов ведомствами 
          и комитетами отвечающими за развитие металлообработки, промышленной кооперации, 
          машиностроения и судостроения.
        </div>
      </Bottom>

    </Body>
  )}

export default About;

const Body = styled.section`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 278.5px - 271px);
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  color: #333333;
  position: relative;
  padding: 95px 0;

  h3 {
    font-weight: 700;
    font-size: 36px;
    margin: 0 auto 24px;

    @media screen and (max-width: 768px) {
      font-size: 20px;
      margin: 0 auto 235px;
    }
  }

  @media screen and (max-width: 768px) {
    font-size: 16px;
    padding: 37px 0;
  }
`;

const Map = styled.img`
  position: absolute;
  right: 0;
  top: -40px;
  width: 50%;
  max-width: 1000px;
  min-height: 283px;
  min-width: 330px;

  @media screen and (max-width: 1700px) {
    z-index: -1;
  }

  @media screen and (max-width: 768px) {
    top: 50px;
  }
`;

const WhatWeDo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  justify-content: space-between;
  margin-left: 10%;
  padding: 43px 0 92px;

  @media screen and (max-width: 1560px) {
    padding: 17px 22px;
    margin: 0;
  }

  h3 {
    color: #00AEAE;
    margin: 0 0 24px;
  }

  p {
    font-size: 22px;
    max-width: 580px;

    @media screen and (max-width: 1560px) {
      font-size: 16px;
    }
  }
`;

const Vectors = styled.div`
  display: flex;
  background: #00AEAE;
  color: #FFFFFF;

  .content {
    display: flex;
    flex-direction: column;
    padding: 28px 105px;
    justify-content: center;

    @media screen and (max-width: 1560px) {
      padding: 28px 22px;
    }

    h3 {
      margin: 0 0 24px;
    }

    li {
      margin: 5px 0;

      @media screen and (max-width: 1825px) {
        margin: 0;
      }
    }
  }

  .img {
    display: flex;
    width: 45%;
    align-items: center;    
    
    @media screen and (max-width: 1560px) {
      display: none;
    }
  }

  img {
    width: 100%;
  }
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1440px;
  margin: 85px auto;
  padding: 0 22px;
  box-sizing: content-box;

  @media screen and (max-width: 768px) {
    margin: 31px auto;
  }

  h3 {
    color: #00AEAE;
    margin: 0 0 24px;
  }

  p {
    padding: 18px 0 52px;
  }

  li {
    margin: 20px 0;
  }

  .bordered-div {
    padding: 23px 30px;
    margin-top: 27px;
    border: 3px solid #00AEAE;
    position: relative;

    ::after {
      display: block;
      position: absolute;
      content: '';
      background-color: white;
      height: 3px;
      width: 30px;
      bottom: -3px;
      right: 50px;
    }
  }
`;
