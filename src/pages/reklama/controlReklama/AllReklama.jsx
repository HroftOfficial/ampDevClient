import React, {useState, useEffect} from 'react'
import styled from 'styled-components';
import {observer} from "mobx-react-lite";
import { useNavigate, Link} from 'react-router-dom';
import background from '../../../img/draft-background.jpg';
import data from '../reklamaState';
import ReklamaService from '../../../services/Reklama';

const Advertising = () => {
  const [ready, setReady] = useState(false);
  const [ad, setAd] = useState([]);

  useEffect(() => {
    (async() => {
      const response = await ReklamaService.getReklamas()
      // console.log(response)

    })()


    setAd(data)
    setReady(true)
  }, [])

  const navigate = useNavigate();

  const handleAdv = (e)=> {
    e.preventDefault()
    const id = e.target.id;
    console.log(e)
    navigate(`/advertising/${id}`)
  }

  const handleDelete = (e) => {
    console.log(e)
    const id = e.target.id;
    const da = prompt('Точно?', 'Да') 
    if (da)  {
      console.log('delete ad >> ', id)
    } else {
      console.log('delete ad >> net', id)
    }
  }

  const handleEdit = (e) => {
    console.log(e)
    const id = e.target.id;
    navigate(`/re/edit/${id}`)
  }

  return (
    <Wrapper1>
      <Wrapper2>

        <Wrapper>
          {ready && 
              <div className='ad-list'>
                {ad.map((item) => {
                  return (
                  <div className='item' key={item._id} id={item._id}>
                    <button className='delete-btn' onClick={handleDelete} id={item._id}>Удалить</button>
                    <button className='edit-btn' onClick={handleEdit} id={item._id}>Редактировать</button>
                    <img alt='' onClick={handleAdv} src={item.photo_url} id={item._id}/>
                  </div>
                )})}
              </div>
          }
          <Link to='new' className='link-new'>Добавить рекламу</Link>
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
  font-family: 'Roboto', sans-serif;

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
    position: relative;

    img {
      height: 250px;
    }

    .delete-btn{
      position: absolute;
      padding: 10px;
      border: 1px solid black;
      top: 10px;
      right: 10px;
      background-color: white;
      border-radius: 5px; 
    }

    .edit-btn {
      position: absolute;
      padding: 10px;
      border: 1px solid black;
      bottom: 10px;
      left: calc(50% - 68px);
      background-color: white;
      border-radius: 5px; 
    }
  }

  .link-new {
    margin: 0 auto;
    border: 1px solid black;
    padding: 10px;
    border-radius: 5px; 
  }
`;

const Wrapper1 = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-image: url(${background});
  background-size: contain;
  min-height: calc(100vh - 278.5px - 274px);
`;

const Wrapper2 = styled.div`
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255,255,255,1) 70%, rgba(255,255,255,0.9472163865546218) 80%, rgba(255,255,255,0.9220063025210083) 90%, rgba(255,255,255,0.7259278711484594) 100%);
  min-height: calc(100vh - 278.5px - 274px);

  @media screen and (max-width: 1200px) {
    background: radial-gradient(circle, rgba(255,255,255,1) 91%, rgba(255,255,255,0.8155637254901961) 100%, rgba(255,255,255,0.80) 100%);    
  }
`;