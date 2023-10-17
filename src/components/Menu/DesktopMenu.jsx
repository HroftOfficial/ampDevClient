import { useContext, useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import menuData from "../../utils/menu";
import menuDataPrivate from "../../utils/menu__private";
// import { Context } from "../../index";
import { AuthContext } from "../../hoc/AuthProvider";
import { observer } from "mobx-react-lite";
import MenuList from "./MenuList";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../img/logo.svg";
import email from "../../img/email.svg";
import phone from "../../img/phone.svg";
import telegramm from "../..//img/telegramm.svg";
import lk from "../../img/lk.svg";

import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import styled from "styled-components";
import TopMenu from "./TopMenu";
import BottomMenu from "./BottomMenu";
import Menu992 from "./responsiveMenu/Menu992-";
import Notifications from "../Chat/Notifications";

const DesktopMenu = (props) => {
  const { store } = useContext(AuthContext);
  let navigate = useNavigate();
  const matches = useMediaQuery("(max-width:479px)");
  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     store.checkAuth();
  //   }
  // }, [store]);

  return (
    <Header>
      {matches && store.isAuth ? (
        <div className="note__mobile">
          <Notifications matches={matches} />
        </div>
      ) : null}
      <div className="content">
        <Link to="/">
          <img src={logo} alt="" className="header__logo" />
        </Link>

        <div className="header__center">
          <TopMenu />
          <div className="slash" />
          <BottomMenu />
        </div>

        <div className="auth-buttons">
          {store.isAuth ? (
            <Button
              variant="outlined"
              startIcon={<LogoutIcon sx={{ color: "white" }} />}
              sx={{
                color: "#00AEAE",
                border: "1px solid #00AEAE",
                "&.MuiButton-root:hover": {
                  border: "1px solid #00AEAE",
                },
              }}
              onClick={() => store.logout(navigate)}
            >
              Выход
            </Button>
          ) : (
            <Button
              variant="outlined"
              startIcon={<LoginIcon sx={{ color: "white" }} />}
              sx={{
                color: "#00AEAE",
                border: "1px solid #00AEAE",
                "&.MuiButton-root:hover": {
                  border: "1px solid #00AEAE",
                },
              }}
              onClick={() => navigate("/login")}
            >
              Вход
            </Button>
          )}
          {store.isAuth && (
            <Button
              variant="outlined"
              sx={{
                color: "#00aeae",
                border: "1px solid #00AEAE",
                "&.MuiButton-root:hover": {
                  border: "1px solid #00AEAE",
                },
              }}
              onClick={() => navigate("/profile")}
            >
              ЛК
            </Button>
          )}
        </div>
      </div>
      <Menu992 />
    </Header>
  );
};

export default observer(DesktopMenu);

const Header = styled.header`
  display: flex;
  width: 100%;
  justify-content: center;

  .note__mobile {
    position: absolute;
    top: 220px;
  }

  .content {
    display: flex;
    /* align-items: center; */
    max-width: 1440px;
    width: 100%;
    /* margin: 0 auto; */
    justify-content: space-between;
    padding: 0 26px;
    box-sizing: content-box;

    @media screen and (max-width: 992px) {
      display: none;
    }

    .header__logo {
      min-width: 80px;
      max-width: 244px;

      @media screen and (max-width: 1050px) {
        max-width: 180px;
      }
    }
  }

  .header__center {
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
      position: relative;

      @media screen and (max-width: 900px) {
        margin: 16px 0;
      }
    }
  }

  .auth-buttons {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 15px;
  }
`;
