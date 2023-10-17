import { useState, useContext } from 'react';
import menuData from '../../utils/menu';
import menuDataPrivate from '../../utils/menu__private';
import MenuListMobile from "../Menu/MenuListMobile";
import { AuthContext } from '../../hoc/AuthProvider';
import { useNavigate } from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import phoneIco from '../../img/phone.svg';
import mailIco from '../../img/email.svg';
 


const MobileMenu = () => {
  const [menu, setMenu] = useState(false);
  let navigate = useNavigate();
  const {store} = useContext(AuthContext);

  const mobileMenu = () =>{
      setMenu(!menu);
  }
  return (
    <>
      <MobileTop>
        <div className="flex items-center">

          <button onClick={() => mobileMenu()}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-450" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

        </div>
        <div className="auth-buttons ">
          {store.isAuth ? 
          <div>
            <Button 
              variant="outlined" 
              startIcon={<LogoutIcon sx={{color:'white'}} />} 
              sx={{color:'#00AEAE', border:'1px solid #00AEAE',"&.MuiButton-root:hover": {
                border:'1px solid #00AEAE'
              }}}
              onClick={() => store.logout(navigate)}>
              Выход
            </Button>
          </div>
            : 
          <div className="text-green-450">
            <Button 
              variant="outlined" 
              startIcon={<LoginIcon sx={{color:'white'}}/>} 
              sx={{color:'#00AEAE', border:'1px solid #00AEAE',"&.MuiButton-root:hover": {
                border:'1px solid #00AEAE'
              }}}
              onClick={() => navigate('/login')}>
              Вход
            </Button>
          </div>
          }  
          {store.isAuth &&             
            <Button 
              variant="outlined" 
              sx={{color:'#00aeae', border:'1px solid #00AEAE',"&.MuiButton-root:hover": {
              border:'1px solid #00AEAE'}}}
              onClick={() => navigate('/profile')}
              className='lk'
              >
              ЛК
            </Button>
          }
      
        </div>



      </MobileTop>

      {!menu ? '' :
        <ContentMenu>
          <div className="list">

          {store.isAuth ? <MenuListMobile data={menuDataPrivate} setMenu={setMenu} /> : <MenuListMobile data={menuData} setMenu={setMenu}/>}

          <Link to="registration" className="header__zayavka">
            Оставить заявку
          </Link>

            <div>
              <a href="/">
                <span className="inline-block pr-2">
                  <img src={mailIco} alt="" className="w-4" />
                </span>
                +7 (863) 204-22-00
              </a>
            </div>

            <div>
              <a href="/">
                <span className="inline-block pr-2">
                  <img src={phoneIco} alt="" className="w-4" />
                </span>
                amp@copartner.ru
              </a>
            </div>

          </div>
        </ContentMenu>}
    </>
  )
};

export default MobileMenu;

const MobileTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  font-size: 12px;
  color: white;
  padding: 0 8%;

  @media screen and (min-width: 480px) {
      display: none;
  }

  .auth-buttons {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* height: 80px; */

    .lk {
      margin-top: 8px;
    }
  }
`;

const ContentMenu = styled.div`
  display: flex;
  padding: 30px 8%;
  background: #4B525C;
  color: white;
  margin-top: 20px;

  .list {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }

  .header__zayavka {
    text-decoration: underline;
    color: #00AEAE;
    padding: 30px 0;
  }
`;