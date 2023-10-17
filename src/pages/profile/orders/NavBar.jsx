import { Link, useMatch } from 'react-router-dom';
import styled from 'styled-components';

const NavBar = () => {
  const matchAll = useMatch(`profile/orders`)
  const matchActiive = useMatch(`profile/orders/active`)
  const matchWaiting = useMatch(`/profile/orders/waiting`)
  const matchDeleted = useMatch(`/profile/orders/deleted`)

  return (
    <Nav>

      <Link 
        className='all' 
        to='/profile/orders'
        style={{textDecorationLine: matchAll ? 'underline' : 'none'}}
        >Все
      </Link>

      <Link 
        className='active' 
        to='/profile/orders/active'
        style={{textDecorationLine: matchActiive ? 'underline' : 'none'}}
        >Активные
      </Link>

      <Link 
        className='waiting' 
        to='/profile/orders/waiting'
        style={{textDecorationLine: matchWaiting ? 'underline' : 'none'}}
        >На модерации
      </Link>

      <Link 
        className='deleted' 
        to='/profile/orders/deleted'
        style={{textDecorationLine: matchDeleted ? 'underline' : 'none'}}
        >Удаленные
      </Link>

    </Nav>
  )
}

export default NavBar;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  width: 613px;
  margin: 18px 0 42px;

  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 28px;
  color: #333333;
  
  @media screen and (max-width: 700px) {
    flex-direction: column;
    height: 172px;
    justify-content: space-between;
    width: auto;
  }
  
  @media screen and (max-width: 480px) {
    font-size: 22px;
  }

  .active {
    color: #77C190;   
  }    

  .waiting {
    color: #FFBA7F;   
  }
  
  .deleted {
    color: #EE4057;   
  }
`;
