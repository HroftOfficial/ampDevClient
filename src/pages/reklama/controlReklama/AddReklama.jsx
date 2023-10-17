import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import PreviewReklama from './PreviewReklama';
import data from '../reklamaState';
import ReklamaService from '../../../services/Reklama';

const AddReklama = () => {
  const navigate = useNavigate();

  // const [title, setTitle] = useState('');
  const [description, setDescription] = useState("11-14 октября 2022 в Москве, Крокус Экспо состоится 21-ая Международная выставка сварочных материалов, оборудования и технологий – Weldex.<br/><br/>Более 100 производителей и поставщиков представят свои лучшие решения в следующих разделах:<br/><br/><li>Оборудование для сварки</li><br/><li>Материалы для сварочных работ</li><br/><li>Оборудование для резки металла</li><br/><li>Инструменты и приспособления для сварочных работ</li><br/><li>Оборудование для контроля качества сварных соединений</li><br/><li>Промышленные роботы при проведении сварочных работ</li><br/><li>и др. </li><br/><br/>Ассоциация выступает отраслевым информационным партнером выставки. Участники ассоциации могут бесплатно посетить выставку по промокоду «amp». Зарегистрируйтесь по <a href='https://weldex.ru/Rus/get-eticket?utm_source=amp&utm_medium=referral&utm_campaign=eticket&promo=amp' target='_blank' style='color: blue'>сылке</a><br/><br/><b>Это пример, удали меня<b>");
  // const [url, setUrl] = useState('');
  // const [photo_url, setPhoto_url] = useState({});
  // const [photo_url_big, setPhoto_url_big] = useState({});
  // const [file_url, setFile_url] = useState([]);
  // const [top, setTop] = useState(false);
  // const [side, setSide] = useState(false);
  // const [toCard, setToCard] = useState(false);
  // const [card_text, setCard_text] = useState('');
  // const [place, setPlace] = useState('');

const handleForm = (e) => {
  e.preventDefault();

  const dataForm = e.target;
  console.log(e)

  const title = dataForm[0].value;
  const description = dataForm[1].value;
  const url = dataForm[2].value;
  const photo_url = dataForm[3].files;
  const photo_url_big = dataForm[4].files;
  const file_url = dataForm[5].files;
  const top = dataForm[6].checked;
  const side = dataForm[7].checked;
  const toCard = dataForm[8].checked;
  const card_text = dataForm[9].value;
  const place = dataForm[10]?.value;

  console.log(title)
  console.log(description)
  console.log(photo_url)
  console.log(photo_url_big)
  console.log(file_url)
  console.log(url)
  console.log(top)
  console.log(side)
  console.log(toCard)
  console.log(card_text)
  console.log(place)


  const formData = new FormData();

  formData.append('title', title);
  formData.append('description', description);
  formData.append('url', url);
  formData.append('top', top);
  formData.append('side', side);
  formData.append('toCard', toCard);
  formData.append('card_text', card_text);
  formData.append('place', place);

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

  navigate(`/re`)

}


const [cardValue, setCardValue] = useState(false)

  return(
    <Body>

      <Form onSubmit={handleForm}>
        <p>Заголовок </p>
        <input placeholder='Введите заголовок, основной'/>

        <div className='href'><a href='https://html5-editor.net/' target='_blank'>Если нужно, ссылка на HTML-редактор</a></div>

        <p>Описание ПОЛНОЕ вместе с тегами</p>
        <textarea placeholder='<b>Введите основной текст</b>' value={description} onChange={e => setDescription(e.target.value)}/>

        <p>Основной сайт компании (будет помещен в кнопку)</p>
        <input placeholder='Введите сайт'/>

        <p>Выберете превью фото, небольшого разрешения</p>
        <input type='file'/>    

        <p>Выберете основное фото, разрешение побольше</p>
        <input type='file'/>    

        <p>Выберете файл (не фото)</p>
        <input type='file'/>    

        <p>Разместить в верхнем блоке рекламы?</p>
        <input type='checkbox'/>     

        <p>Разместить в левом боковом блоке рекламы?</p>
        <input type='checkbox'/>  

        <p>Разместить в блоке карточек?</p>
        <input type='checkbox' checked={cardValue} onChange={() => setCardValue(state => !state)}/>  

        {cardValue &&
          <>
            <p>Текст который будет написан на карточке под Заголовком</p>
            <input placeholder='Введите текст карточки'/>

            <p>На какую позицию поставить? Введите число от 1 до 12</p>
            <input type='number' min='1' max='12'/>
          </>
        }
        <button type='submite'>Сохранить</button>
      </Form>

      <Help>

        <PreviewReklama description={description}/>

      </Help>

    </Body>
  )
}

export default AddReklama

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

  .href {
    margin-bottom: 20px;
    color: blue;
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

  button {
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