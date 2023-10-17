import React, {useState, useEffect} from 'react'
import styled from 'styled-components';
import {observer} from "mobx-react-lite";
import { useNavigate} from 'react-router-dom';
import background from '../../img/draft-background.jpg';
import data from './reklamaState.js';

const Advertising = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true)
  }, [])

  const navigate = useNavigate();

  const handleAdv = (e)=> {
    e.preventDefault()
    const id = e.target.id;
    // console.log(e)
    navigate(`/advertising/${id}`)
  }

  return (
    <Wrapper1>
      <Wrapper2>

        <div className="block text-xl py-6 md:py-12 md:text-2xl xl:text-2xl font-bold text-center text-gray-850">Специальные предложения для наших партнеров!</div>  
        <Wrapper>
          {ready && 
              <div className='ad-list'>
                {data?.map((item) => {
                  if (item?._id == 0) return;
                  return (
                  <div className='item' onClick={handleAdv} key={item?._id} id={item?._id}>
                    <img alt='' src={item?.photo_url} id={item?._id}/>
                  </div>
                )})}

              </div>
          }
        </Wrapper>

      </Wrapper2>
    </Wrapper1>
    
  )
};

export default observer(Advertising);

const Wrapper = styled.div`
  display: flex;
  color: black;
  /* justify-content: center; */
  flex-direction: column;
  min-height: 59vh;

  .header {
    display: flex;
    max-width: 1440px;
    width: 100%;
    text-align: center;
  }

  .ad-list {
    display: flex;
    max-width: 1440px;
    margin: 0 auto;
    flex-wrap: wrap;
    gap: 30px;
  }

  .item {
    display: flex;
    /* height: 300px; */
    cursor: pointer;
    height: auto;
    max-height: 300px;
    width: auto;
    /* max-width: 700px */

    img {
      height: 250px;
    }

  }
`;

const Wrapper1 = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-image: url(${background});
  background-size: contain;
`;

const Wrapper2 = styled.div`
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255,255,255,1) 70%, rgba(255,255,255,0.9472163865546218) 80%, rgba(255,255,255,0.9220063025210083) 90%, rgba(255,255,255,0.7259278711484594) 100%);

  @media screen and (max-width: 1200px) {
    background: radial-gradient(circle, rgba(255,255,255,1) 91%, rgba(255,255,255,0.8155637254901961) 100%, rgba(255,255,255,0.80) 100%);    
  }
`;