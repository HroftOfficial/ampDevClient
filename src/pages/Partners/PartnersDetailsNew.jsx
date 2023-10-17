import React, {useState, useEffect, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import {observer} from "mobx-react-lite";
import PartnerService from '../../services/PartnerService';
import AboutCompany from './components/AboutCompany';
import PlantCompany from './components/PlantCompany';
import OrdersCompany from './components/OrdersCompany';
import background from '../../img/draft-background.jpg';
import backgroundTitle from '../../img/partner-bg.png';
import orgInfoIco from '../../img/org-info.svg';
import orgPlantIco from '../../img/org-needs.svg';
import orgOrderIco from '../../img/org-plant.svg';

const PartnersDetails = () => {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);
  const [paragraph, setParagraph] = useState('Сведения о предприятии')
  const navigate = useNavigate();

  useEffect(() => {
    try {
      (async() => {   
        const idFromUrl = window.location.pathname.split('/').splice(-1, 1)[0];

        const response = await PartnerService.getUserInfo(idFromUrl);

        console.log(response)
        setUser(response.data)
      })()
    } catch (e) {
      console.error(e)
    } finally {
      setIsReady(true)

    }
  },[])


    
  return(
    <Wrapper1>
    <Wrapper2>
      {isReady &&
        <Body>

          <div className='top-title'>
            <div className='title-black'>
            {user?.org}
            </div>
          </div>

          <div className='info'>
            <div className='aside'>
              <div className={paragraph === 'Сведения о предприятии' ? 'aside__item-active': 'aside__item'} onClick={()=>setParagraph('Сведения о предприятии')}>
                Об участнике
              </div>

              <div className={paragraph === 'Католог продукции' ? 'aside__item-active': 'aside__item'} onClick={()=>setParagraph('Католог продукции')}>
                Католог продукции
              </div>

              <div className={paragraph === 'Заказы' ? 'aside__item-active': 'aside__item'} onClick={()=>setParagraph('Заказы')}>
                  Заказы предприятия
              </div>
            </div>

              {paragraph === 'Сведения о предприятии' && <AboutCompany user={user} />}
              {paragraph === 'Католог продукции' && <PlantCompany user={user} />}
              {paragraph === 'Заказы' && <OrdersCompany user={user} />}
          </div>


        </Body>
      }
    </Wrapper2>
    </Wrapper1>
  )
};

export default observer(PartnersDetails);

const Wrapper1 = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-image: url(${background});
  background-size: contain;
  min-height: calc(100vh - 278.5px - 274px);
`;

const Wrapper2 = styled.div`
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255,255,255,1) 70%, rgba(255,255,255,0.9472163865546218) 80%, rgba(255,255,255,0.9220063025210083) 90%, rgba(255,255,255,0.7259278711484594) 100%);
  min-height: calc(100vh - 278.5px - 274px);

    @media screen and (max-width: 1200px) {
        background: radial-gradient(circle, rgba(255,255,255,1) 91%, rgba(255,255,255,0.8155637254901961) 100%, rgba(255,255,255,0.80) 100%);    
    }
`;


const Body = styled.section`
  display: flex;
  min-height: 59vh;
  flex-direction: column;
  align-items: center;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 400;
  padding-top: 61px;

  .top-title {
    display: flex;
    background-image: url(${backgroundTitle});
    background-size: cover;
    width: 100%;
    max-width: 1440px;
    height: 183px;
    font-size: 30px;
    font-weight: 700;
    text-transform: uppercase;

    .title-black {
      display: flex;
      width: 100%;
      height: 100%;
      background-color: #00000099;
      justify-content: center;
      align-items: center;
    }
  }

  .info {
    display: flex;
    width: 100%;
    max-width: 1440px;
    
  }

  .aside {
    display: flex;
    flex-direction: column;
    width: 25%;
    min-width: 300px;
    font-family: 'Roboto', sans-serif;
    background: #23252610;
    margin-top: 20px;
    height: min-content;

    &__item-active {
      display:flex;
      align-items: center;
      padding: 20px 30px;
      width: 100%;
      cursor: pointer;
      font-size: 20px;
      border-right: 10px solid #00AEAE;
      color: #323232;
    }

    &__item {
      display:flex;
      align-items: center;
      padding: 20px 30px;
      width: 100%;
      cursor: pointer;
      font-size: 20px;
      color: #323232;
      
      :hover {
        background: #23252620;
      }

      .img-wrapper {
        display: flex;
        width: 100px;
        justify-content: center;
      }

      img {
        height: 50px;
      }
    }
  }
`;
