
import React, {useState, useEffect} from 'react'
import { useNavigate, useParams} from 'react-router-dom';
import styled from 'styled-components';
import ReactHtmlParser from 'html-react-parser';
import {observer} from "mobx-react-lite";
import ReklamaService from '../../services/Reklama.js';
import config from "../../settings/settings";

const PlantDetails = () => {
  const [ready, setReady] = useState(false);
  const [thisAd, setThisAd] = useState({});

  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    try {
      (async() => {
        const response = await ReklamaService.getReklamaById(id)
        // console.log(response.data)
        setThisAd(response?.data)
        setReady(true)

      })()
    } catch (e) {
      console.error(e)
    } finally {
    }
    
  }, [])

  return (
    
    <Wrapper>
       {ready && 
        <div className='wrapper'>

          <div className='header'>
            <button onClick={() => navigate(-1)}
              >Назад
            </button>
          </div>

          <div className='image'>
            <img src={`${config?.baseUrlUpload}/uploads/ad/${thisAd?.photo_url[0]?.filename}`} alt=''/>
          </div>

          <div className='info'>

            <div className='title'>{thisAd?.title}</div>

            <div className='common'>{ReactHtmlParser(thisAd?.description)}</div>


            {thisAd?.file_url?.lenght !== 0 && 
              thisAd?.file_url?.map((item, index) => (

                <p className='text' key={index}><a href={`${config?.baseUrlUpload}/uploads/ad/${item?.filename}`} target="_blank" rel="noopener noreferrer" className='file-link'>Файл</a></p>
              ))
            }

            {thisAd?.url && <a className='main-link' href={thisAd?.url} target='_blank'><b>На сайт</b></a>}

          </div>
        </div>
      }
    </Wrapper>
    
  )
};

export default observer(PlantDetails);

const Wrapper = styled.div`
  display: flex;
  color: #333333;
  justify-content: center;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;

  li, p {
    font-size: 22px;
  }

  .wrapper{
    display: flex;
    flex-direction: column;
    max-width: 1440px;
    width: 100%;

    .header {
      margin: 30px 0;
    
      button {
        background: #00AEAE;
        border-radius: 5px;
        padding: 10px 30px;
        font-size: 30px;
        color: #FFFFFF;
      }
    }

    .image {
      display: flex;
      margin: 50px auto;
      width: 1000px;

      img {
        width: 100%;
        margin-bottom: 30px;
      }
    }

    .info {
      display: flex;
      flex-direction: column;
      max-width: 1000px;
      margin: 0 auto;

      .title {
        font-weight: 500;
        font-size: 28px;
        text-align: center;
      }

      .common, .text {
        font-size: 22px;
        line-height: 28px;
        color: #525252;
        margin: 0;
        margin-top: 15px;
        font-weight: 400;

      }
    }

    .main-link {
      background: #00AEAE;
      border-radius: 5px;
      padding: 10px 15px;
      width: 130px;
      margin: 60px auto 100px;
      font-weight: 400;
      font-size: 22px;
      text-align: center;
      color: #FFFFFF;
    }

    .file-link {
      color: blue;
      text-decoration: underline;
    }
  }
`;
