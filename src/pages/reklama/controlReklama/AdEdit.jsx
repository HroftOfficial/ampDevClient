import React, {useState, useEffect} from 'react'
import styled from 'styled-components';
import {observer} from "mobx-react-lite";
import { useNavigate, Link, useParams} from 'react-router-dom';
import background from '../../../img/draft-background.jpg';
import data from '../reklamaState';
import PreviewReklama from './PreviewReklama';

const AdEdit = () => {
  const navigate = useNavigate();

  const [ready, setReady] = useState(false);
  const [ad, setAd] = useState([]);

  const {id} = useParams();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState("11-14 октября 2022 в Москве, Крокус Экспо состоится 21-ая Международная выставка сварочных материалов, оборудования и технологий – Weldex.<br/><br/>Более 100 производителей и поставщиков представят свои лучшие решения в следующих разделах:<br/><br/><li>Оборудование для сварки</li><br/><li>Материалы для сварочных работ</li><br/><li>Оборудование для резки металла</li><br/><li>Инструменты и приспособления для сварочных работ</li><br/><li>Оборудование для контроля качества сварных соединений</li><br/><li>Промышленные роботы при проведении сварочных работ</li><br/><li>и др. </li><br/><br/>Ассоциация выступает отраслевым информационным партнером выставки. Участники ассоциации могут бесплатно посетить выставку по промокоду «amp». Зарегистрируйтесь по <a href='https://weldex.ru/Rus/get-eticket?utm_source=amp&utm_medium=referral&utm_campaign=eticket&promo=amp' target='_blank' style='color: blue'>сылке</a><br/><br/><b>Это пример, удали меня<b>");
    const [url, setUrl] = useState('');
    const [photo_url, setPhoto_url] = useState({});
    const [photo_url_big, setPhoto_url_big] = useState({});
    const [file_url, setFile_url] = useState('');
    const [top, setTop] = useState(false);
    const [topPlace, setTopPlace] = useState('');
    const [side, setSide] = useState(false);
    const [sidePlace, setSidePlace] = useState('');
    const [toCard, setToCard] = useState(false);
    const [card_text, setCard_text] = useState('');
    const [cardPlace, setCardPlace] = useState('');

    const [deletedPreview, setDeletedPreview] = useState('');
    const [deletedMain, setDeletedMain] = useState('');
    const [deletedFile, setDeletedFile] = useState('');

  // console.log(id)
  useEffect(() => {
    (async() => {
      try {
        
        for (let item of data) {
          if (item._id == id) {
            // console.log(item)
            setTitle(item.title)
            setDescription(item.description)
            setUrl(item.url)
            setPhoto_url(item.photo_url)
            setPhoto_url_big(item.photo_url_big)
            setFile_url(item.file_url)
            setTop(item.top)
            setTopPlace(item.topPlace)
            setSide(item.side)
            setSidePlace(item.sidePlace)
            setToCard(item.toCard)
            setCard_text(item.card_text)
            setCardPlace(item.cardPlace)
        }
      }


        // console.log(ad)

      } catch (e) {
        console.error(e)
      } finally {
        setReady(true)
      }
    })()
  }, [])

  const handleForm = (e) => {
    e.preventDefault();
  
    const dataForm = e.target;
    console.log(e)
  
    const title = dataForm[0].value;
    const description = dataForm[1].value;
    const url = dataForm[2].value;
    const photo_url = dataForm[3].files;
    const photo_url_big = dataForm[5].files;
    const file_url = dataForm[7].files;
    const top = dataForm[9].checked;
    const topPlace = dataForm[10]?.value | 5;
    const side = dataForm[11].checked;
    const sidePlace = dataForm[12]?.value | 5;
    const toCard = dataForm[13].checked;
    const card_text = dataForm[14]?.value;
    const cardPlace = dataForm[15]?.value | 5;
  
    console.log('title >> ', title)
    console.log('description >> ', description)
    console.log('photo_url >> ', photo_url)
    console.log('photo_url_big >> ', photo_url_big)
    console.log('file_url >> ', file_url)
    console.log('site >>', url)
    console.log('top >> ', top)
    console.log('topPlace >> ', topPlace)
    console.log('side >> ', side)
    console.log('sidePlace >> ', sidePlace)
    console.log('toCard >> ', toCard)
    console.log('card_text >> ', card_text)
    console.log('cardPlace >> ', cardPlace)

    console.log('deletedPreview >> ', deletedPreview)
    console.log('deletedMain >> ', deletedMain)
    console.log('deletedFile >> ', deletedFile)
  
  
    const formData = new FormData();
  
    formData.append('title', title);
    formData.append('description', description);
    formData.append('url', url);
    formData.append('top', top);
    formData.append('topPlace', topPlace);
    formData.append('side', topPlace);
    formData.append('sidePlace', sidePlace);
    formData.append('toCard', toCard);
    formData.append('card_text', card_text);
    formData.append('cardPlace', cardPlace);
    formData.append('deletedPreview', deletedPreview);
    formData.append('deletedMain', deletedMain);
    formData.append('deletedFile', deletedFile);
  
    Object.values(photo_url).forEach(photo => {
      formData.append("photo_url", photo);
    });
  
    Object.values(photo_url_big).forEach(photo => {
      formData.append("photo_url_big", photo);
    });
  
    Object.values(file_url).forEach(file => {
      formData.append("file_url", file);
    });
  
    // ReklamaService.AddReklama(formData);  
  
    // navigate(`/reklama`)
  
  }
  
const removePhotoMain = (e, id) => {
  e.preventDefault();
  setDeletedMain(id);
  setPhoto_url_big({})
}

const removePhotoPreview = (e, id) => {
  e.preventDefault();
  setDeletedPreview(id);
  setPhoto_url({})
}

const removeFile = (e, id) => {
  e.preventDefault();
  setDeletedFile(id);
  setFile_url('')
}

const handleAddPreview = (e) => {
  let arrayofFiles= [];

  for (var i = 0; i < e.target.files.length; i++){
    arrayofFiles.push(e.target.files[i]);
  }
  
  let images = [];

  arrayofFiles.map((e) => {
    const ImageUrl =  URL.createObjectURL(e);
    
    images.push(ImageUrl)
  })

  setPhoto_url(images)
}

const handleAddMain = (e) => {
  let arrayofFiles= [];

  for (var i = 0; i < e.target.files.length; i++){
    arrayofFiles.push(e.target.files[i]);
  }
  
  let images = [];

  arrayofFiles.map((e) => {
    const ImageUrl =  URL.createObjectURL(e);
    
    images.push(ImageUrl)
  })

  setPhoto_url_big(images)
}
  return (
    <Wrapper1>
      <Wrapper2>
        {ready && 
          <Body>

            <Form onSubmit={handleForm}>
              <p>Заголовок </p>
              <input placeholder='Введите заголовок, основной' value={title} onChange={(e) => setTitle(e.target.value)}/>

              <div className='href'><a href='https://html5-editor.net/' target='_blank'>Если нужно, ссылка на HTML-редактор</a></div>

              <p>Описание ПОЛНОЕ вместе с тегами</p>
              <textarea placeholder='<b>Введите основной текст</b>' value={description} onChange={e => setDescription(e.target.value)}/>

              <p>Основной сайт компании (будет помещен в кнопку)</p>
              <input placeholder='Введите сайт' value={url} onChange={(e) => setUrl(e.target.value)}/>

              <p>Выберете превью фото, небольшого разрешения</p>
              <input type='file' onChange={handleAddPreview}/>    

              <div className='preview'>
              {Object.keys(photo_url).length !== 0 && <img src={photo_url} alt=''/>}
                <button
                    id={id}
                    key={id}
                    onClick={(e) => removePhotoPreview(e, id)}
                  >Очистить
                </button>
              </div>


              <p>Выберете основное фото, разрешение побольше</p>
              <input type='file' onChange={handleAddMain}/> 

              <div className='preview'>
              {Object.keys(photo_url_big).length !== 0 && <img src={photo_url_big} alt=''/>}
                <button
                    id={id}
                    key={id}
                    onClick={(e) => removePhotoMain(e, id)}
                  >Очистить
                </button>
              </div>


              <p>Выберете файл (не фото) в дополнение</p>
              <input type='file'/>    

             <div className='preview'>
             {file_url && <a href={file_url}>Файл</a>}
                <button
                    id={id}
                    key={id}
                    onClick={(e) => removeFile(e, id)}
                  >Очистить
                </button>
              </div>

              <p>Разместить в верхнем блоке рекламы?</p>
              <input type='checkbox' checked={top} onChange={() => setTop(state => !state)}/>     

              <p>На какую позицию поставить сверху? Введите число от 1</p>
              <input type='number' min='1' max='100' value={topPlace} onChange={(e) => setTopPlace(e.target.value)}/>

              <p>Разместить в левом боковом блоке рекламы?</p>
              <input type='checkbox' checked={side} onChange={() => setSide(state => !state)}/>  

              <p>На какую позицию поставить слева? Введите число от 1</p>
              <input type='number' min='1' max='100' value={sidePlace} onChange={(e) => setSidePlace(e.target.value)}/>

              <p>Разместить в блоке карточек?</p>
              <input type='checkbox' checked={toCard} onChange={() => setToCard(state => !state)}/>  

              <p>На какую позицию поставить в карточках? Введите число от 1 до 12</p>
              <input type='number' min='1' max='12' value={cardPlace} onChange={(e) => setCardPlace(e.target.value)}/>

              <p>Текст который будет написан на карточке под Заголовком</p>
              <input placeholder='Введите текст карточки' value={card_text} onChange={(e) => setCard_text(e.target.value)}/>

              <button type='submite'>Сохранить</button>
            </Form>

            <Help>

              <PreviewReklama description={description}/>

            </Help>

          </Body>
        }
      </Wrapper2>
    </Wrapper1>
    
  )
};

export default AdEdit;

const Body = styled.div`
  display: flex;
  margin: 40px;
  padding: 40px 0;
  color: black;
  max-width: 1840px;
  width: 100%;
  margin: 0 auto;
  box-sizing: content-box;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 40%;
  margin: 0 20px;

  .preview {
    display: flex;
    flex-direction: column;
    margin: 0 auto;

    button {
      /* width: 140px; */
      /* height: 50px; */
      padding: 5px 10px;
      background: #4B525C;
      color: white;
      border-radius: 5px;
      margin: 0 auto;
      margin-top: 10px;
      font-size: 18px;
      margin-bottom: 20px;
    }
  }

  .preview a {
    font-size: 30px;
    color: blue;
    margin-bottom: 30px;
  }

  .href {
    margin-bottom: 20px;
    color: blue;
    text-decoration: underline;
  }

  input, textarea {
    margin-bottom: 20px;
    border: 1px solid black;
    padding: 10px 15px;
    border-radius: 5px;
    outline: none;
  }

  textarea {
    min-height: 400px;
  }

  input[type='checkbox'] {
    width: 20px; 
    height: 20px;
    margin-left: 10px;
  }

  button[type='submite'] {
    width: 140px;
    height: 50px;
    background: #a131d4;
    color: white;
    border-radius: 5px;
    margin: 0 auto;
    margin-top: 40px;
    font-size: 22px;
  }
`;

const Help = styled.div`
  display: flex;
  flex-direction: column;

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