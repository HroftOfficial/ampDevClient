import styed from 'styled-components';
import profileIco from '../../../img/profile-ico.svg';
import profileIcoOpen from '../../../img/profile-ico-open.svg';

const MobileHeader = (props) => {

  return (
    <Body>
      <img src={!props.isOpen ? profileIco : profileIcoOpen} alt='' onClick={() => {props.setIsOpen(state => !state)}}/>
    </Body>

  )
}

export default MobileHeader;

const Body = styed.div`
  display: none;
  background: #4B525C;
  flex-direction: flex-end;
  padding: 0 50px;

  @media screen and (max-width: 1200px) {
    display: flex;
  }

  img {
    height: 40px;
    // margin-top: 20px;
    margin-bottom: 20px;
    margin-left: auto;

    @media screen and (max-width: 480px) {
      height: 30px;
    }
  }
`;
