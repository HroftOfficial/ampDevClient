import { useContext } from "react";
import { AuthContext } from "../../../hoc/AuthProvider";
import { observer } from "mobx-react-lite";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../../img/logo.svg"

import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import styled from "styled-components";
import TopMenu from '../TopMenu';
import BottomMenu from '../BottomMenu';

const DesktopMenu = (props) => {
  const { store } = useContext(AuthContext);
  let navigate = useNavigate();

  return (
    <Content>
      <div className="top">

        <Link to="/">
          <img src={logo} alt="" className='header__logo'/>
        </Link>

        <TopMenu />

        <div className="slash"/>


      <div className="auth-buttons">
        {store.isAuth ? (
          <Button 
          variant="outlined" 
          startIcon={<LogoutIcon sx={{color:'white'}} />} 
          sx={{color:'#00AEAE', border:'1px solid #00AEAE',"&.MuiButton-root:hover": {
            border:'1px solid #00AEAE'}}}
            onClick={() => store.logout(navigate)}>
            Выход
          </Button>
        ) : (
          <Button 
          variant="outlined" 
          startIcon={<LoginIcon sx={{color:'white'}}/>} 
            sx={{color:'#00AEAE', border:'1px solid #00AEAE',"&.MuiButton-root:hover": {
              border:'1px solid #00AEAE'}}}
              onClick={() => navigate('/login')}>
            Вход
          </Button>)}
           {store.isAuth &&             
            <Button 
              variant="outlined" 
              sx={{color:'#00aeae', border:'1px solid #00AEAE',"&.MuiButton-root:hover": {
              border:'1px solid #00AEAE'}}}
              onClick={() => navigate('/profile')}>
              ЛК
            </Button>}
        
        
      </div>
      </div>
        <BottomMenu/>

    </Content>
  );
};

export default observer(DesktopMenu);

const Content = styled.div`
  /* align-items: center; */
  max-width: 1440px;
  width: 100%;
  /* margin: 0 auto; */
  padding: 0 26px;
  box-sizing: content-box;
  flex-direction: column;
  display: none;

  @media (min-width: 480px) and (max-width: 992px) {
    display: flex;
  }
  
  /* @media screen and (min-width: 993px) {
    display: none;
  }

  @media screen and (max-width: 768px) {
  } */

  .auth-buttons {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 80px;
  }

  .header__logo {
    min-width: 80px;
    max-width: 244px; 
    
    @media screen and (max-width: 1024px) {
      max-width: 180px; 
    }

    @media screen and (max-width: 550px) {
      max-width: 120px; 
    }
  }
  
  .top {
    display: flex;
    justify-content: space-between;
  }

  .header__center{
    display: flex;
    flex-direction: column;
    padding: 0 50px;
    box-sizing: content-box;
    width: 100%;

    .slash {
      display: flex;
      height: 2px;
      width: 100%;
      margin-top: 36px;
      background-color: white;
    }
  }
`;
