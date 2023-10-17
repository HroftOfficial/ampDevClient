import React, {useState, useEffect, useContext} from 'react';
import {observer} from "mobx-react-lite";
import DraftService from '../../services/DraftService';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import DetailSlider from "../../components/DetailSlider/DetailSlider";
import config from '../../settings/settings';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { AuthContext } from '../../hoc/AuthProvider';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import styled from 'styled-components';
import docIco from '../../img/doc-ico.svg';
import imgIco from '../../img/img-ico.svg';
import background from '../../img/draft-background.jpg';

import {Helmet} from "react-helmet";




{/* <meta property="twitter:domain" content="b2b.copartner.ru"></meta> */}
// let meta1 = document.createElement('meta');
// meta1.setAttribute('property', "twitter:domain");
// meta1.setAttribute('content', `${config?.baseUrlUpload}`);

// {/* <meta name="twitter:card" content="summary_large_image"></meta> */}
// let meta2 = document.createElement('meta');
// meta2.setAttribute('name', "twitter:card");
// meta2.setAttribute('content', 'summary_large_image');

{/* <meta name="twitter:description" content="Детальное описание заказа"></meta> */}
// let meta3 = document.createElement('meta');
// meta3.setAttribute('name', 'twitter:description');
// meta3.setAttribute('content', "Детальное описание заказа");


// document.getElementsByTagName('head')[0].appendChild(meta1);
// document.getElementsByTagName('head')[0].appendChild(meta2);
// document.getElementsByTagName('head')[0].appendChild(meta3);


const idFromUrl = window.location.pathname.split('/').splice(-1, 1)[0];
const isTelegram = window.location.pathname.split('/').splice(-2, 1)[0];


    // <meta content="https://new.copartner.ru/uploads/telegram_url-1661712589305.jpg" property="og:image"/> 
    // <meta content="AMP" name="twitter:site"/>
    // <meta content="summary_large_image" name="twitter:card"/>
    // <meta content="https://new.copartner.ru/uploads/telegram_url-1661712589305.jpg" name="twitter:image"/>


(async() => { 
try {
   if (isTelegram == 'telegram') {
   const response = await DraftService.fetchItemDraftTelegram(idFromUrl);

  //  const image = `${config?.baseUrlUpload}/uploads/${response?.data?.telegram_url?.[0]?.filename}`
  //  console.log('image', image)
//    useEffect(async() => {
//     const response = await DraftService.fetchItemDraftTelegram(idFromUrl);
//     const image = `${config?.baseUrlUpload}/uploads/${response?.data?.telegram_url?.[0]?.filename}`
//     // document.querySelector("meta[name='twitter:image']").setAttribute("content", image);
//     // document.querySelector("meta[property='og:image']").setAttribute("content", image);
//     document.getElementsByTagName('meta')["og:image"].content = image;
//     document.getElementsByTagName('meta')["twitter:image"].content = image;
// }, []);

//   // <meta property="twitter:url" content="https://b2b.copartner.ru/telegram/630915d56ccc664665250905"></meta>
//   let meta1 = document.createElement('meta');
//   // meta1.setAttribute('property', "twitter:url");
//   meta1.setAttribute('content', `${config?.baseUrlUpload}/uploads/${response?.data?.telegram_url?.[0]?.filename}`);
//   // meta1.setAttribute('name', "og:image");
//   meta1.setAttribute('property', "og:image");


//   // <meta name="twitter:image" content="https://b2b.copartner.ru/uploads/telegram_url-1661539816294.jpg"></meta>
//   let meta2 = document.createElement('meta');
//   meta2.setAttribute('content', `${config?.baseUrlUpload}/uploads/${response?.data?.telegram_url?.[0]?.filename}`);
//   meta2.setAttribute('name', "twitter:image");
//   // meta2.setAttribute('property', "twitter:card");

// const imgPath = `${config?.baseUrlUpload}/uploads/${response?.data?.telegram_url?.[0]?.filename}`
// document.head.querySelector("[property~=og:image][content]").innerHTML = imgPath;
// document.querySelector('meta[name="twitter:image"]').innerHTML = imgPath;
// const element1 = document.querySelector('meta[name="twitter:image"]');
// element1.replaceWith(meta2)
// const element2 = document.querySelector('meta[property="og:image"]');
// element2.replaceWith(meta1)

// document.getElementsByTagName('meta')["og:image"].content = imgPath;
// document.getElementsByTagName('meta')["twitter:image"].content = imgPath;

// "meta[property='og:image']"
  // document.getElementsByTagName('head')[0].appendChild(meta1);
  // document.getElementsByTagName('head')[0].appendChild(meta2);
  }
} catch (e) {
  console.log(e);
}})()





const DraftDetails = () => {
  // if (isTelegram == 'telegram') {
  //   const response = async()=>{ await DraftService.fetchItemDraftTelegram(idFromUrl);
//     <Helmet>
//       {/* <!-- Facebook Meta Tags --> */}
//       {/* <meta property="og:url" content="https://amp.copartner.ru/telegram/630613bfb911ce0011971a99"/> */}
//       <meta property="og:url" content={`${config?.baseUrlUpload}/telegram/${idFromUrl}`}/>
//       <meta property="og:title" content="Ассоциация Металлообрабатывающих Предприятий"/>
//       <meta property="og:description" content="АМП"/>
//       <meta property="og:image" content={`${config?.baseUrlUpload}/uploads/${response.data.telegram_url[0].filename}`}/>

// {/* // <!-- Twitter Meta Tags --> */}
//  <meta name="twitter:card" content="summary_large_image"/>
//  <meta property="twitter:domain" content="amp.copartner.ru"/>
//  <meta property="twitter:url" content={`${config?.baseUrlUpload}/telegram/${idFromUrl}`}/>
//  <meta name="twitter:title" content="Ассоциация Металлообрабатывающих Предприятий"/>
//  <meta name="twitter:description" content="АМП"/>
//  <meta name="twitter:image" content={`${config?.baseUrlUpload}/uploads/${response.data.telegram_url[0].filename}`}/>

// {/* <meta name="twitter:card" content="summary_large_image"/>
//  <meta property="twitter:domain" content={config?.baseUrlUpload}/>
// <meta property="twitter:url" content={`${config?.baseUrlUpload}/uploads/${response.data.telegram_url[0].filename}`}/>
// <meta name="twitter:description" content="Детальное описание заказа"/>
// <meta name="twitter:image" content={`${config?.baseUrlUpload}/uploads/${response.data.telegram_url[0].filename}`}/> */}
// </Helmet>
//   }
// }
  const location = useLocation();
  const { store } = useContext(AuthContext);
  const navigate = useNavigate();
  const {id} = useParams();

  const [item, setItem] = useState([]);
  const [img, setImg] = useState([]);


  // dialog 
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [textValue, setTextValue] = useState('')

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSend = async(e) => {
    try {
      const url =`${config?.mainUrl}${location?.pathname}`;
      store?.setMessage('');
      store?.setLoading(true)
      const response = await DraftService.sendZvk(textValue, url);
      
      setOpenDialog(false);
      setOpen(true);
      setTextValue('')
    } catch (error) {
      store?.setMessage(error?.response?.data?.message);
      store?.setLoading(false);
    } finally {
      store?.setLoading(false);
    }
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }  
    setOpen(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
// enddialog

// useEffect(async() => {
//   const response = await DraftService.fetchItemDraftTelegram(idFromUrl);
//   const image = `${config?.baseUrlUpload}/uploads/${response?.data?.telegram_url?.[0]?.filename}`
//   document.querySelector("meta[name='twitter:image']").setAttribute("content", image);
//   document.querySelector("meta[property='og:image']").setAttribute("content", image);
//   // document.getElementsByTagName('meta')["og:image"].content = image;
//   // document.getElementsByTagName('meta')["twitter:image"].content = image;
// }, []);

  useEffect(() => {
      getItemNews(id);
  },[]);
  const [ready, setRaedy] = useState(false)
  const [responseMeta, setResponseMeta] = useState();

  async function getItemNews(id) {
      try {
          const response = await DraftService.fetchItemDraftTelegram(id);
          // console.log('resp data draft', response.data);
          // const data = response.data?.photo_url.filter(f=>!f?.filename.includes('pdf'));
          // setImg(data);
          setResponseMeta(response)
          setItem(response?.data);
          // console.log('rd',response?.data);
          setRaedy(true)

      } catch (e) {
          console.log(e);
      }
    }

    const pageFromUrl = window.location.pathname.split('/').splice(-3, 1)[0];

  return(
    <Wrapper>

      {/* <Helmet> */}
        {/* <meta property="og:title" content="Ассоциация Металлообрабатывающих Предприятий"/> */}
        {/* <meta property="og:description" content="АМП"/> */}
        {/* <meta property="og:image" content={`/uploads/${window.location.pathname.split('/').splice(-1, 1)[0]}`}/> */}
        {/* <meta name="twitter:card" content="summary_large_image"/> */}
        {/* <meta name="twitter:title" content="Ассоциация Металлообрабатывающих Предприятий"/> */}
        {/* <meta name="twitter:description" content="АМП"/> */}
        {/* <meta name="twitter:image" content={`/uploads/${window.location.pathname.split('/').splice(-1, 1)[0]}`}/> */}
       {/* <!-- Facebook Meta Tags --> */}
        {/* <meta property="og:url" content="https://amp.copartner.ru/telegram/630613bfb911ce0011971a99"/>  */}
        {/* <meta property="og:url" content={`${config?.baseUrlUpload}/telegram/${idFromUrl}`}/> */}
        {/* <meta property="og:image" content={`${config?.baseUrlUpload}/uploads/${responseMeta.data.telegram_url[0].filename}`}/> */}

      {/* // <!-- Twitter Meta Tags --> */}
        {/* <meta property="twitter:domain" content="amp.copartner.ru"/> */}
        {/* <meta property="twitter:url" content={`${config?.baseUrlUpload}/telegram/${idFromUrl}`}/> */}
        {/* <meta name="twitter:image" content={`${config?.baseUrlUpload}/uploads/${responseMeta.data.telegram_url[0].filename}`}/> */}

        {/* <meta name="twitter:card" content="summary_large_image"/> */}
        {/* <meta property="twitter:domain" content={config?.baseUrlUpload}/> */}
        {/* <meta property="twitter:url" content={`${config?.baseUrlUpload}/uploads/${responseMeta.data.telegram_url[0].filename}`}/> */}
        {/* <meta name="twitter:description" content="Детальное описание заказа"/> */}
        {/* <meta name="twitter:image" content={`/uploads/${useParams().id}`}/> */}
      {/* </Helmet> */}

      {/* <Helmet>
        <title>Turbo Todo</title>
        <meta name="description" content="test on react-helmet" />
        <meta name="theme-color" content="#ccc" />
    </Helmet> */}
      <Wrapper2>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Заявка отправлена!
        </Alert>
      </Snackbar>

      {/* dialogform */}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Отправить заявку</DialogTitle>
        <DialogContent>
          <DialogContentText style={{paddingBottom:'20px', fontWeight:'600', fontSize:'1.2rem'}}>
            В поле ниже вы можете описать ваше коммерческое предложение по заказу
          </DialogContentText>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={12}
            id='text'
            value={textValue}
            onChange={(e)=>setTextValue(e.target.value)}
            // placeholder="Minimum 3 rows"
            style={{ width:'100%', border:'1px solid #00AEAE',borderRadius:'6px', margin:'auto', padding:'10px' }}
          />
          {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Отменить</Button>
          <Button onClick={handleSend}>Отправить</Button>
        </DialogActions>
      </Dialog>

      {/* end dialogform */}

      <Content>

        {ready && <div className='image'>    
          <img alt='' src={config?.baseUrlUpload + `/uploads/`+ item?.telegram_url[0].filename} className='telega-img'/>


          <button 
            onClick={() => navigate(`${pageFromUrl === 'favorite' ? `/profile/${pageFromUrl}` : `/draft/${pageFromUrl}`}`)}
            className='amp-btn'
          >Назад
        </button>
        </div>
        }
        <Info>
          <div className='infoTitle'>{item.title}</div>
          <div className='infoDetails'>{item.details}</div>
          <div className='infoCategory'><strong>Виды работ:</strong>
            {item?.work_info?.map((item, index) => (
              <div key={index}>{item?.name}</div>
            ))}
          </div>

          <div className='infoKl'>Количество:
            {item?.kl === 0 && 'не указано'}
            {item?.kl !== 0 && item?.kl_text == 'партия' && ` ${item?.kl} шт.`}
            {item?.kl !== 0 && item?.kl_text == 'мес/шт' && ` ${item?.kl} шт/мес`}
            {item?.kl !== 0 && item?.kl_text == 'год/шт' && ` ${item?.kl} шт/год`}            
            {item?.kl !== 0 && item?.kl_text == 'шт.' && ` ${item?.kl} шт.`}            
          </div>

          <div className='infoMany'>Стоимость: 
            {!item?.many || item?.many == 0 
              ? ( ` договорная`) 
              : ( ` ${item?.many}`)
            }
          </div>
          

          <div className='infoCities'>Город:
            {item?.cities 
            ? ` ${item?.cities}`
            : ` информация уточняется`
          } 

          </div>
          {/* <div>Rating</div> */}

          {!store.isAuth ? 
          <button type="submit" onClick={() => navigate('/login')} className='amp-btn'>Войти в ЛК</button> :
          <button type="submit" onClick={() => navigate(`/draft/1/details/${id}`)} className='amp-btn'>Подробнее</button>
          }
        </Info>
      </Content>
      </Wrapper2>
    </Wrapper>
  )
};

export default observer(DraftDetails);

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-image: url(${background});
  background-repeat: no-repeat;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  min-height: calc(100vh - 278.5px - 274px);
`;

const Wrapper2 = styled.div`
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255,255,255,1) 70%, rgba(255,255,255,0.9472163865546218) 80%, rgba(255,255,255,0.9220063025210083) 90%, rgba(255,255,255,0.7259278711484594) 100%);
  min-height: calc(100vh - 278.5px - 274px);
`;

const Content = styled.section`
  display: flex;
  color: #333333;
  max-width: 1474px;
  width: 100%;
  margin: 100px auto;
  justify-content: space-between;
  padding: 0 17px;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;

  @media screen and (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
  }

  .btn-back {
    @media screen and (max-width: 480px) {
      display: none;
    }
  }

  .telega-img {
    max-height: 700px;
  }

  .image {
    width: 900px;

    @media screen and (max-width: 1400px) {
      width: 700px;
    }

    @media screen and (max-width: 1200px) {
      height: auto;
    }

    @media screen and (max-width: 770px) {
      width: 500px;
      margin-bottom: 30px;
    }

    @media screen and (max-width: 570px) {
      width: 400px;
    }

    @media screen and (max-width: 430px) {
      width: 300px;
    }
  }

  .slider {
    padding: 0;
  }

  .amp-btn {
    background: #00AEAE;
    border-radius: 5px;
    max-width: 220px;
    padding: 10px 25px;
    margin-top: 50px;
    color: #FFFFFF;
    margin-left: 30px;

    @media screen and (max-width: 480px) {
      margin: 50px auto 0;
      font-size: 20px;
    }
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  margin-left: 10px;

  @media screen and (max-width: 570px) {
    width: 100%;
  }

  .infoNumber {
    padding: 11px 30px;
    background: #333333;
    border-radius: 5px;
    width: 152px;
    font-weight: 500;
    font-size: 36px;
    color: #FFFFFF;

    @media screen and (max-width: 480px) {
      font-size: 24px;
      width: 102px;
      padding: 6px 15px;
    }
  }

  .infoTitle  {
    margin-top: 47px;
    font-weight: 500;
    font-size: 24px;
    color: #00AEAE;

    @media screen and (max-width: 480px) {
      font-size: 20px;
      margin-top: 27px;
    }
  }

  .infoDetails {
    margin-top: 16px;
    font-size: 18px;

    @media screen and (max-width: 480px) {
      font-size: 16px;
    }
  }

  .infoCategory {
    margin-top: 16px;
    font-size: 18px;
    
    @media screen and (max-width: 480px) {
      font-size: 16px;
    }
  }

  .infoKl {
    margin-top: 16px;
    font-size: 18px;

    @media screen and (max-width: 480px) {
      font-size: 16px;
    }
  }

  .infoMany {
    font-size: 18px;

    @media screen and (max-width: 480px) {
      font-size: 16px;
    }
  }

  .infoCities {
    font-size: 18px;

    @media screen and (max-width: 480px) {
      font-size: 16px;
    }
  }

  .infoDoc {
    display: flex;
    flex-direction: column;
    margin-top: 37px;
    font-weight: 500;
    font-size: 18px;

    @media screen and (max-width: 480px) {
      font-size: 16px;
    }
  }

  .docItem {
    display: flex;
    align-items: center;
    margin-top: 20px;
    font-size: 18px;
    text-decoration-line: underline;
    color: #7C7C7C;

    @media screen and (max-width: 480px) {
      font-size: 16px;
    }

    img {
      margin-right: 10px;

      @media screen and (max-width: 480px) {
        height: 30px;
      }
    }
  }

`;
