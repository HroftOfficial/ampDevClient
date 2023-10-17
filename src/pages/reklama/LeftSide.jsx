import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import config from "../../settings/settings";

const LeftAd = ({ reklama }) => {
  const navigate = useNavigate();

  const handleAdv = (e)=> {
    e.preventDefault()
    const id = e.target.id;
    navigate(`/advertising/${id}`)
  }

  reklama.sort((a, b) => a.side_place > b.side_place ? 1 : -1);

  return(
    <Body>
      {reklama.map((item, index) => 
        {
          if (item?.enabled == true && item?.side_place !== 0 ) {
          
          return (
            <div key={index} id={item?._id} className='adv'>
              <img src={`${config?.baseUrlUpload}/uploads/ad/${item?.preview_url[0]?.filename}`} alt=''/>
              <div id={item?._id} className="adv-overlay" onClick={handleAdv}>{item?.overlay}</div>
            </div>
          )}
        }
      )}
    </Body>
  )
}

export default LeftAd

const Body = styled.div`
  display: flex;
  flex-direction: column;

 .adv {
    display: flex; 
    width: 100%;
    margin-top: 15px;
    position: relative;

    img {
      width: 100%;
    }

    .adv-overlay {
      display: flex;
      position: absolute;
      text-align: center;

      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #00000028;
      align-items: center;
      justify-content: center;
      opacity: 0;
      cursor: pointer;
      font-size: 20px;
      
      :hover {
        opacity: 1;
      }
    }
 }
`;
