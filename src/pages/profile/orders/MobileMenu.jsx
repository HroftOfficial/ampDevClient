import { useEffect, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from "styled-components";
import { AuthContext } from "../../../hoc/AuthProvider";
import User from '../../../services/User';
import config from '../../../settings/settings'
import rob from '../../../img/profile-ico-big.svg';

const MobileMenu = () => {
  let navigate = useNavigate();
  const { store } = useContext(AuthContext);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async() => {
      try {
        const user = await User.getUser();
        store.setUserInfo(user?.data);
        // console.log(user);
        setReady(true);
      } catch (e) {
        console.error('Error >>> ', e);
      } finally {
        setReady(true);
      }
    })()
  }, [])  


  return (
    <Wrapper>
    {ready &&
      <Info>
        <div className='img-wrapper'>
          <img src={store?.userInfo?.logo__img?.length == 0 ? rob : `${config?.baseUrlUpload}/uploads/logo/${store?.userInfo?.logo__img[0]?.filename}`} alt=''/>
        </div>
        <div className="fio">{store?.userInfo?.name}</div>
        <div className="company">{store?.userInfo?.org}</div>
        <div className="city">г. {store?.userInfo?.cities}</div>
        {/* <div className="inn">ИНН: {store.userInfo.inn}</div> */}
      
        <Link className='info-button' to='/profile'>Профиль</Link>
        <Link className='info-button' to='/profile/orders'>Ваши заказы</Link>
        <Link className='info-button' to='/profile/addorder'>Добавить заказ</Link>
        <Link className='info-button' to='/profile/favorite'>Избранное</Link>
        {/* <Link className='info-button' to='/profile/messages'>Сообщения</Link> */}

        <div className="action">
          <button
            onClick={() => store.logout(navigate)}>
            Выход
          </button>
        </div>
      </Info>
    }
    </Wrapper>
  )
}

export default MobileMenu;


const Wrapper = styled.div`
  display: flex;
  background-color: #F6F6F6;
  padding: 76px 32px 42px;
  justify-content: space-between;
  width: 100%;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 400;
  color: #333333;

  @media screen and (max-width: 480px) {
    padding: 35px 16px;
  } 
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;

  .img-wrapper {
    display: flex;
    width: 254px;
    height: 254px;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 480px) {
      width: 150px;
      height: 150px;
    } 
  }

  img {
    width: 100%;
    border-radius: 50%;
  }

  .fio {
    margin-top: 45px;
    max-width: 400px;
    font-weight: 500;
    font-size: 24px;
    color: #00AEAE;

    @media screen and (max-width: 480px) {
      font-size: 22px;  
    } 
  }

  .company {
    max-width: 400px;
    margin-top: 15px;
    font-weight: 500;
    font-size: 24px;
    
    @media screen and (max-width: 480px) {
      font-size: 22px;  
    } 
  }

  .city {
    margin-top: 9px;
    max-width: 400px;
    font-size: 18px;

    @media screen and (max-width: 480px) {
      font-size: 16px;  
    } 
  }

  .inn {
    margin-top: 9px;
    font-size: 18px;

    @media screen and (max-width: 480px) {
      font-size: 16px;  
    } 
  }

  .info-button {
    display:flex;
    width: 340px;
    height: 67px;
    align-items: center;
    justify-content: center;
    background: #00AEAE;
    border-radius: 5px;
    margin-top: 20px;
    font-size: 24px;
    color: #FFFFFF;

    @media screen and (max-width: 480px) {
      font-size: 22px;  
      width: 300px;
    } 
  }

  .action {
    display: flex;
    width: 320px;
    justify-content: flex-end;
    margin-top: 95px;
    font-size: 18px;
    text-decoration-line: underline;  
    color: #BFBFBF;

    @media screen and (max-width: 480px) {
      font-size: 16px;  
    } 
  }
`;