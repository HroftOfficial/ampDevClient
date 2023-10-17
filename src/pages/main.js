import React, { useState, useEffect } from 'react';
import { observer } from "mobx-react-lite";
import Navbar from '../components/UI/Navbar';
import Footer from '../components/UI/Footer';
import NewsMain from '../components/UI/NewsMain';
import NewsService from '../services/NewsService';
import InfoService from '../services/InfoService';
import MSlider from '../components/UI/MSlider'
import { Link } from "react-router-dom";
import config from '../settings/settings';


//UI components
import MyButton from '../components/UI/button/MyButton';

import { dataChart } from '../utils/chart';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
// bar 
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';


  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'text',
      },
    },
  };
//bar


const Main = () => {

    const [info, setInfo] = useState({"allUser":"3000","allZakaz":"4480"});
    const [news, setNews] = useState([]);
    const [message, setMessage] = useState('')
    //form zvk
    const[username, setUsername] = useState('');
    const[org, setOrg] = useState('');
    const[tel, setTel] = useState('');
    const[email, setEmail] = useState('');
    const[msg, setMsg] = useState('');




    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });
      

        const [open, setOpen] = React.useState(false);
      
      
        const handleClose = (event, reason) => {
          if (reason === 'clickaway') {
            return;
          }
      
          setOpen(false);
        };


useEffect(() => {
    getNews();
    getInfo();
},[]);

async function getNews() {
    try {
        const response = await NewsService.fetchNews(1,3);
        setNews(response.data);
    } catch (e) {
        console.log(e);
    }
}

async function getInfo() {
    try {
        setUsername('');
        setOrg('');
        setTel('');
        setEmail('');
        setMsg('');
        const response = await InfoService.fetchInfo();
        setInfo(response?.data);
    } catch (error) {
        console.log(error);
    }
}

// const sendForm = async(event) => {
    async function sendForm(event){
    try {
        event.preventDefault();
        setMessage('')
       const data = {
           username: username,
           org: org,
           tel: tel,
           email: email,
           msg: msg,
           mailTheme: 'Подана заявка на регистрацию в АМП'
       } 
       const response = await InfoService.sendZvk(data);
       setUsername('');
       setOrg('');
       setTel('');
       setEmail('');
       setMsg('');
       setOpen(true);
    } catch (error) {
        setMessage(error?.response?.data?.message);
    }
}

    return (

<>
<Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Заявка отправлена
        </Alert>
      </Snackbar>
        <div className="wrapper">
            <header className="m__background">
                {/* <nav className="z-30 top-0 py-8 w-full h__background">
                    <Navbar />
                </nav> */}
                {/* <!-- text content  --> */}
                <div
                    className="flex justify-between items-center px-4 max-w-2xl md:max-w-3xl lg:px-0 lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl mx-auto">
                    {/* <!-- left block --> */}
                    <div className="">
                        <h1
                            className="md:my-6 text-base md:text-4xl font-bold leading-normal text-left xl:text-5xl max-w-xs md:max-w-lg">
                            ПЛАТФОРМА ДЛЯ ПОИСКА И РАЗМЕЩЕНИЯ ЗАКАЗОВ
                        </h1>
                        <p className="leading-normal text-sm md:text-3xl mb-4">По всем видам металлообработки</p>
                        <p className="text-xs md:text-xl py-4">
                            Зарегистрируйтесь, и получите доступ к более чем 2000 заказам <br />
                            и 200 компаниям исполнителей
                        </p>
                        <a href="/#form">
                            <MyButton>Зарегистрироваться</MyButton>
                        </a>
                    </div>
                    {/* <!-- desktop right block --> */}
                    <div className="hidden md:flex flex-col justify-center  items-center text-center md:text-left">

                        <div className="text-2xl max-h-1/2 flex flex-col">

                            <span className="inline-block font-bold md:px-4 md:py-5 rounded xl:px-10 xl:py-12 bg-green-450">
                                Всего: {info?.allZakaz} заказов
                                <MSlider countGroup= {info}/>
                            </span>
                        </div>

                        <div className="flex text-xl xl:pr-24 flex-col py-10">
                            <h1 className="text-center pb-8">При поддержке:</h1>
                            <div className="flex flex-row">

                                <div className="">
                                    <a href="/">
                                        <img src="/img/tpp-ro.png" alt="" className="cover w-44" />
                                    </a>
                                </div>
                                <div className="">
                                    <a href="/">
                                        <img src="/img/smp.png" alt="" className="cover w-32" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- right block -->
            <!-- mobile right block --> */}
                <div className="flex justify-between items-center md:hidden">
                    <div className="flex text-xl flex-col  py-10">
                        <h1 className="text-center pb-8">При поддержке:</h1>
                        <div className="flex flex-row">

                            <div className="">
                                <a href="/">
                                    <img src="/img/tpp-ro.png" alt="" className="cover w-44" />
                                </a>
                            </div>
                            <div className="">
                                <a href="/">
                                    <img src="/img/smp.png" alt="" className="cover w-32" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-end">
                        <span className="inline-block font-bold rounded px-2 mx-2 py-4 bg-green-450">
                        Всего: {info?.allZakaz} заказов
                                <MSlider countGroup= {info}/>                          
                        </span>
                    </div>
                </div>
            </header>
            
            <main className="main">
    {/* <!-- graf block  --> */}
    <section className="container max-w-5xl mx-auto flex flex-col py-16">
        <div>
            <h1 className="text-base text-center text-black md:text-2xl xl:text-4xl font-bold">За три года работы у
                нас
                <span className="text-green-450 px-4">391
                    {/* {info.allUser} */}
                </span>
                участников и партнеров
            </h1>
        </div>
        <div className="py-10">
            {/* <canvas id="myChart" width="400" height="150"></canvas> */}
            <Bar options={options} data={dataChart} />
        </div>
    </section>
    {/* <!-- graf block  -->
    <!-- work block  --> */}
    <section className="py-10 text-white bg-green-450">
        <div className="mx-auto px-2 pb-12 text-white
        max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl
        ">
            <h1 className="
                w-full
                text-3xl
                xl:text-4xl
                font-bold
                leading-tight
                text-center 
                pb-6
            ">
                ПОЧЕМУ С НАМИ РАБОТАЮТ
            </h1>
            <div className="w-full mb-4">
                <div className="flex flex-wrap">
                    <div className="xl:w-1/2 py-4 w-full">
                        <div className="flex ">
                            <div className="w-1/6 px-2">
                                <img src="/img/help.svg" alt="" />
                            </div>
                            <div className=" w-5/6 ">
                                <p className="font-bold text-2xl pb-4">
                                    Помощь в работе с крупными компаниями
                                </p>
                                <p>
                                    Помощь в составлении запроса, утверждении заказа, подписании важных бумаг.
                                    Доведение сделки до обоюдной удовлетворенности.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="xl:w-1/2 py-4 xl:px-8 w-full">
                        <div className="flex ">
                            <div className="w-1/6 px-2">
                                <img src="/img/gvard.svg" alt=""/>
                            </div>
                            <div className=" w-5/6 ">
                                <p className="font-bold text-2xl pb-4">
                                    Подбор исполнителя
                                </p>
                                <p>
                                    Подбор правильного исполнителя Вашего заказа со стопроцентной гарантией
                                    качества и надежности.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap">
                    <div className="xl:w-1/2 py-4 w-full">
                        <div className="flex ">
                            <div className="w-1/6 px-2">
                                <img src="/img/hours.svg" alt=""/>
                            </div>
                            <div className="w-5/6 ">
                                <p className="font-bold text-2xl pb-4">
                                    Долгосрочное сотрудничество
                                </p>
                                <p>
                                    Гарантия надежности сотрудничества, взаимовыгодной помощи и
                                    поддержки на всех этапах заключения сделки с нашими партнерами.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="xl:w-1/2 py-4 xl:px-8 w-full">
                        <div className="flex ">
                            <div className="w-1/6 px-2">
                                <img src="/img/graph.svg" alt=""/>
                            </div>
                            <div className=" w-5/6 ">
                                <p className="font-bold text-2xl pb-4">
                                    Постоянно пополняемая база участников
                                </p>
                                <p>
                                    Безприрывный поток новых участников Ассоциации с предварительной проверкой
                                    на качество и надежность.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* <!-- work block -->
    <!-- news block  --> */}
    <section className="py-16">
        <div className="max-w-5xl mx-auto">
            <h1 className="text-center text-black text-4xl font-bold pb-8">
                новости</h1>
        </div>-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl flex flex-wrap mx-auto justify-betw
        <div
            className="max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl flex flex-wrap mx-auto justify-between">
                {news.map((p,index)=>
                    <NewsMain 
                    key={p._id} 
                    id={'/news/'+p._id} 
                    img={`${config?.baseUrlUpload}/uploads/news/`+p.news_url[0]?.filename} 
                    title={p.title} />
                    )}
        </div>
        <div className="text-center pt-12">
        <Link to="/news" className="inline-block py-2 px-4 underline hover:text-green-200 text-red-300 cursor-pointer">
                Перейти ко всем новостям
            </Link>
        </div>
    </section>
    {/* <!-- news block --> */}
    {/* order */}
    <div className="flex flex-col max-w-2xl md:max-w-3xl lg:px-0 
            lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl mx-auto  md:py-16 md:px-10 px-6">

            <div className="flex flex-col text-black">
                <span className="inline-block text-gray-850 text-base md:text-2xl xl:text-4xl font-bold md:py-16 uppercase text-center">
                    {/* ВАЖНЫЕ ДОКУМЕНТЫ */}
                    Как стать членом Ассоциации?
                </span>
            </div>
                <div className="grid grid-cols-1 lg:grid-rows-2 lg:grid-cols-2 gap-6 text-base md:text-xl text-gray-850 md:py-12 py-8">
                    <a href="https://b2b.copartner.ru/uploads/doc/sog.doc" target="_blank" rel="noopener noreferrer">
                    <div className="flex items-center">
                        <span className="px-6"><img src="/img/doc.svg" alt=""/></span> 
                        Соглашение кандидата
                     </div>
                     </a>
                     <a href="https://b2b.copartner.ru/uploads/doc/anketa.docx" target="_blank" rel="noopener noreferrer">
                     <div className="flex items-center">
                        <span className="px-6"><img src="/img/doc.svg" alt=""/></span> 
                        Анкета участника
                    </div>
                    </a>
                    <a href="https://b2b.copartner.ru/uploads/doc/konf.doc" target="_blank" rel="noopener noreferrer">
                    <div className="flex items-center">
                        <span className="px-6"><img src="/img/doc.svg" alt=""/></span> 
                        Соглашение о конфидециальности
                    </div>
                    </a>
                    <a href="https://b2b.copartner.ru/uploads/doc/za.docx" target="_blank" rel="noopener noreferrer">
                    <div className="flex items-center">
                        <span className="px-6"><img src="/img/doc.svg" alt=""/></span> 
                        Заявление о вступлении в Ассоциацию
                    </div>
                    </a>
                </div>
      
            </div>
    {/* end orders */}
    
    {/*<!-- registration block  --> */}
    <section className="bg__form">
        <a name="form" aria-label="to"> </a>
        <div
            className="mx-auto px-2 pt-4 pb-12 text-gray-850 max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl">
            <h1 className="text-center text-black text-4xl font-bold pb-2">
                ЗАЯВКА НА РЕГИСТРАЦИЮ
            </h1>
            <p className="text-center text-base text-gray-850 pb-8">
                Заполните форму для подачи заявки на регистрацию <br/>
                в качестве участника ассоциации
            </p>
            <form>
                <div className="flex flex-wrap py-6">
                    <div className="xl:w-1/2 xl:py-3 py-4 px-4 w-full">
                        <input className="shadow appearance-none border rounded w-full py-4 px-3 
                text-gray-850 leading-tight focus:outline-none 
                focus:shadow-outline" id="username" 
                name="username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                type="text" placeholder="Имя"/>
                    </div>
                    <div className="xl:w-1/2 xl:py-3 py-4 w-full px-4">
                        <input
                            className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-850 leading-tight focus:outline-none focus:shadow-outline"
                            id="org" name="org" 
                            type="text" value={org} 
                            onChange={(e) => setOrg(e.target.value)}
                            placeholder="Название организации"/>
                    </div>
                    <div className="xl:w-1/2 xl:py-3 py-4 w-full px-4">
                        <input
                            className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-850 leading-tight focus:outline-none focus:shadow-outline"
                            id="tel" name="tel" type="text" 
                            value={tel} 
                            onChange={(e) => setTel(e.target.value)}
                            placeholder="Телефон"/>
                    </div>
                    <div className="xl:w-1/2 xl:py-3 py-4 w-full px-4">
                        <input
                            className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-850 leading-tight focus:outline-none focus:shadow-outline"
                            id="email" name="email" type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Ваш email"/>
                    </div>

                </div>
                <div className="px-6 py-6">
                    <textarea id="msg" name="msg" rows="7" value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                        className="block w-full text-gray-850 border rounded-md focus:outline-none p-4"
                        placeholder="Ваше сообщение"></textarea>
                </div>
                <div className=" text-center pt-6">
                    <MyButton 
                    onClick={(event) => sendForm(event)}
                    >Отправить</MyButton>
                </div>
                {message}
            </form>


            <div>


    </div>

        </div>
    </section>
    {/* <!-- registration block  --> */}
</main>

            <Footer />
        </div>
        </>
    )
};

export default observer(Main);
