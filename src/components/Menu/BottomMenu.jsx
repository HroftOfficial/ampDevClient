import { AuthContext } from "../../hoc/AuthProvider";
import { useContext } from "react";
import MenuList from "./MenuList";
import menuData from "../../utils/menu";
import menuDataPrivate from "../../utils/menu__private";
import styled from "styled-components";

const BottomMenu = () => {
  const { store } = useContext(AuthContext);

  return (
    <Body className="header__bottom">
      {store.isAuth ? (
        <MenuList data={menuDataPrivate} />
      ) : (
        <MenuList data={menuData} />
      )}
    </Body>
  )
}

export default BottomMenu

const Body = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 36px;

  @media screen and (max-width: 550px) {
    margin-top: 20px;  
  }
`;