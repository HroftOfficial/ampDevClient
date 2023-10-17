import MobileMenu from '../Menu/MobileMenu';
import DesktopMenu from '../Menu/DesktopMenu';
import logo from "../../img/logo.svg"
import telega from '../../img/telegramm.svg';
import styled from 'styled-components';

const Navbar = (props) => {
    return(
        <div>
            <DesktopMenu tpp={props.tpp}/>
           

            <MobileBottom >
                <div className="flex items-center">
                    <a href="/">
                        <img src={logo} alt=""/>
                    </a>
                </div>


                {/* <ul className="flex items-center justify-between space-x-2">
                    <li className="inline-block">
                        <a href="/" className="py-2 inline-block">
                            <img src="./img/facebook.svg" alt="" className="w-6 md:w-7" />
                            <YouTubeIcon />
                        </a>
                    </li>
                    <li className="inline-block">
                        <a href="/" className="py-2 inline-block">
                            <img src={telega} alt="" className="w-6 md:w-7" />
                        </a>
                    </li>
                </ul> */}
            </MobileBottom>

            <MobileMenu/>
        </div>
    )
};

export default Navbar;

const MobileBottom = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    font-size: 12px;
    color: white;
    padding: 0 10%;
    margin-bottom: 42px;
    justify-content: center;

    @media screen and (min-width: 480px) {
        display: none;
    }

    img {
        width: 100%;
        min-width: 81px;
        max-width: 250px;
    }
`;
