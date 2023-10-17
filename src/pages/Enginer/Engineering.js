import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import styled from "styled-components";
import InfoService from "../../services/InfoService";
import Navbar from "../../components/Navbar/Navbar";
import tpp__logo from "./tpp-ro.svg";
import info from '../../img/info.jpg';
import i1 from '../../img/i1.png';
import i2 from '../../img/i2.png';
import i3 from '../../img/i3.png';
import i4 from '../../img/i4.png';
import i5 from '../../img/i5.png';
import u1 from '../../img/u1.png';
import u2 from '../../img/u2.png';
import u3 from '../../img/u3.png';
import u4 from '../../img/u4.png';
import u5 from '../../img/u5.png';
import u6 from '../../img/u6.png';
import u7 from '../../img/u7.png';
import u8 from '../../img/u8.png';
import u9 from '../../img/u9.png';
import r1 from '../../img/r1.jpg';
import r2 from '../../img/r2.jpg';
import r3 from '../../img/r3.jpg';

import stas from '../../img/stas.jpg';
import rob from '../../img/rob.jpg';
import xr from '../../img/xr.jpg';

const Engineering = () => {
  //form zvk
  const [username, setUsername] = useState("");
  const [org, setOrg] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  async function sendForm(event) {
    try {
      event.preventDefault();
      setMessage("");
      const data = {
        username: username,
        org: org,
        tel: tel,
        email: email,
        msg: msg,
        mailTheme: "Подана заявка на регистрацию в Инжиниринговый центр",
      };
      const response = await InfoService.sendZvk(data);
      setUsername("");
      setOrg("");
      setTel("");
      setEmail("");
      setMsg("");
      setOpen(true);
    } catch (error) {
      setMessage(error?.response?.data?.message);
    }
  }

  return (
    <main>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Заявка отправлена
        </Alert>
      </Snackbar>

      <div className="m__background2">
        <Nav>
          <Navbar tpp={tpp__logo} />

          <EnginHeder >
            <div className="hidden md:block mt-5">
              <img
                src={tpp__logo}
                alt="tpp-logo"
                className="h-14 xl:h-24 w-auto"
              />
            </div>
            <div className="mr-3">
              <a
                className="
                    inline-block
                    py-2
                    px-4
                    text-white
                    font-bold
                    no-underline
                    hover:text-green-200
                  "
                href="#services"
              >
                Услуги
              </a>
            </div>
            <div className="mr-3">
              <a
                className="
                    inline-block
                    text-white
                    no-underline
                    font-bold
                    py-2
                    px-4
                    hover:text-green-200
                  "
                href="#project"
              >
                Реализованные проекты
              </a>
            </div>
            <div className="mr-3">
              <a
                className="
                    inline-block
                    text-white
                    no-underline
                    font-bold
                    py-2
                    px-4
                    hover:text-green-200
                  "
                href="#contact"
              >
                Контакты
              </a>
            </div>
          </EnginHeder>
        </Nav>      
        <div className="pt-24">
          <div
            className="
            container
            px-3
            mx-auto
            flex flex-wrap flex-col
            md:flex-row
            items-center
          "
          >
            <div
              className="
              flex flex-col
              w-full
              md:w-2/5
              justify-center
              items-start
              text-center
              md:text-left
            "
            >
              <h1 className="my-4 text-4xl font-bold leading-tight text-left xl:text-5xl">
                Межрегиональный <br /> инжиниринговый <br /> центр
              </h1>
              {/* <p className="leading-normal text-2xl mb-8">г. Ростов-на-Дону</p> */}
              <a href="#form_tpp">
                <button
                  className="
                mx-auto
                lg:mx-0
                hover:underline
                bg-white
                text-white
                font-bold
                rounded-2xl
                bg-blue-400
                my-6
                py-4
                px-8
                shadow-lg
                focus:outline-none focus:shadow-outline
                transform
                transition
                hover:scale-105
                duration-300
                ease-in-out
              "
                >
                  Подать заявку
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="container max-w-5xl mx-auto m-8">
        /
        <div className="w-full mb-4">
          <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-full sm:w-1/2 p-6">
            <img src={info} alt="" />
          </div>

          <div className="w-5/6 sm:w-1/2 p-6">
            <h3 className="text-3xl text-blue-800 font-bold leading-none mb-3">
              ИНЖИНИРИНГ
            </h3>

            <p className="text-gray-600 mb-8 p-4">
              Это комплекс работ, включающий разработку технического решения,
              экономическое обоснование, проектные работы, поставку оборудования
              и материалов, монтажные работы, пуско-наладка и сдача готового
              объекта в эксплуатацию.
            </p>
          </div>

          <div className="w-full p-6 mt-6">
            <div className="align-middle">
              <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3 text-center uppercase pb-4">
                Направления работ инжинирингового центра
              </h3>

              <div className="flex">
                <div className="w-1/6 px-2">
                  <img src={i1} alt="" />
                </div>
                <div className="text-gray-600 w-5/6 ">
                  <h3 className="font-bold text-xl">Производственная кооперация</h3>
                  <p className="pt-2">
                    Организация межотраслевой производственной кооперации с
                    целью внедрения передового опыта использования технических и
                    технологических решений, продвижения и коммерциализацией
                    результатов НИОКР, развития системы трансфера технологий и
                    разработок на основе сотрудничества с производственными
                    предприятиями.
                  </p>
                </div>
              </div>

              <div className="flex py-4">
                <div className="w-1/6 px-2">
                  <img src={i2} alt="" />
                </div>
                <div className="text-gray-600 w-5/6 ">
                  <h3 className="font-bold text-xl">Технический аудит</h3>
                  <p className="pt-2">
                    Комплексный анализ системы организации производства, системы
                    контроля и управления качеством, применяемых технических и
                    технологических решений, а также проверка технического
                    состояния машин и оборудования и выработка предложений по
                    организации технического и организационного управления
                    производственным процессом.
                  </p>
                </div>
              </div>

              <div className="flex py-4">
                <div className="w-1/6 px-2">
                  <img src={i3} alt="" />
                </div>
                <div className="text-gray-600 w-5/6 ">
                  <h3 className="font-bold text-xl">Технологический аудит</h3>
                  <p className="pt-2">
                    Комплексный анализ существующего технологического уровня
                    производства (компании) и выработка технологических решений
                    по оптимизации: состава технологического оборудования;
                    применяемых технологий; применяемых средств технологического
                    оснащения; улучшения системы технологической подготовки
                    предприятия.
                  </p>
                </div>
              </div>

              <div className="flex py-4">
                <div className="w-1/6 px-2">
                  <img src={i4} alt="" />
                </div>
                <div className="text-gray-600 w-5/6 ">
                  <h3 className="font-bold text-xl">Оптимизация взаимодействия</h3>
                  <p className="pt-2">
                    Оптимизация взаимодействия участников проекта через
                    управление качеством инвестиций, подбор оптимальных
                    технических и финансово эффективных решений.
                  </p>
                </div>
              </div>

              <div className="flex py-4">
                <div className="w-1/6 px-2">
                  <img src={i5} alt="" />
                </div>
                <div className="text-gray-600 w-5/6 ">
                  <h3 className="font-bold text-xl">Технический консалтинг</h3>
                  <p className="pt-2">
                    Подбор квалифицированных специалистов для реализации
                    проекта, включая поиск эффективного технического решения
                    поставленной задачи и формирования «дорожной карты».
                  </p>
                </div>
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="bg-gray-100 py-8">
        <div className="container mx-auto px-2 pt-4 pb-12 text-gray-800">
          <a name="services"></a>
          <h1
            className="
            w-full
            my-2
            text-3xl
            xl:text-5xl
            font-bold
            leading-tight
            text-center text-gray-800
          "
          >
            УСЛУГИ ИНЖИНИРИНГОВОГО ЦЕНТРА
          </h1>
          <div className="w-full mb-4">
            <div className="flex flex-wrap">
              <div className="xl:w-1/3 py-4 w-full">
                <div className="flex ">
                  <div className="w-1/6 px-2">
                    <img src={u1} alt="" />
                  </div>
                  <div className="text-gray-600 w-5/6 ">
                    <p>
                      <span className="font-bold">Разработка </span>
                      программ технического перевооружения производства
                    </p>
                  </div>
                </div>
              </div>
              <div className="xl:w-1/3 py-4  w-full">
                <div className="flex">
                  <div className="w-1/6 px-2">
                    <img src={u2} alt="" />
                  </div>
                  <div className="text-gray-600 w-5/6 ">
                    <p>
                      <span className="font-bold">Разработка </span>
                      технических решений в управлении производством
                    </p>
                  </div>
                </div>
              </div>
              <div className="xl:w-1/3 py-4 w-full">
                <div className="flex ">
                  <div className="w-1/6 px-2">
                    <img src={u3} alt="" />
                  </div>
                  <div className="text-gray-600 w-5/6 ">
                    <p>
                      <span className="font-bold">Проектирование </span>
                      автоматизированных и роботизированных систем и поточных
                      линий
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="xl:w-1/3 py-4 w-full">
                <div className="flex">
                  <div className="w-1/6 px-2">
                    <img src={u4} alt="" />
                  </div>
                  <div className="text-gray-600 w-5/6 ">
                    <p>
                      <span className="font-bold">Подготовка </span>
                      проектов технического перевооружения машиностроительных
                      предприятий
                    </p>
                  </div>
                </div>
              </div>
              <div className="xl:w-1/3 py-4 w-full">
                <div className="flex ">
                  <div className="w-1/6 px-2">
                    <img src={u5} alt="" />
                  </div>
                  <div className="text-gray-600 w-5/6 ">
                    <p>
                      Проекты
                      <span className="font-bold">повышения эффективности </span>
                      существующих производств и технологий
                    </p>
                  </div>
                </div>
              </div>
              <div className="xl:w-1/3 py-4 w-full">
                <div className="flex ">
                  <div className="w-1/6 px-2">
                    <img src={u6} alt="" />
                  </div>
                  <div className="text-gray-600 w-5/6 ">
                    <p>
                      <span className="font-bold">Поиск исполнителей </span>
                      для контрактного производства деталей
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap">
              <div className="xl:w-1/3 py-4 w-full">
                <div className="flex ">
                  <div className="w-1/6 px-2">
                    <img src={u7} alt="" />
                  </div>
                  <div className="text-gray-600 w-5/6 ">
                    <p>
                      <span className="font-bold">Разработка и реализация </span>
                      проектов создания новых производств, в том числе под ключ
                      с отработкой партий выпуска продукции с заданными
                      критериями производительности, качества и себестоимости
                    </p>
                  </div>
                </div>
              </div>
              <div className="xl:w-1/3 py-4 w-full">
                <div className="flex ">
                  <div className="w-1/6 px-2">
                    <img src={u8} alt="" />
                  </div>
                  <div className="text-gray-600 w-5/6 ">
                    <p>
                      <span className="font-bold">Подготовка </span>
                      технологических процессов изготовления деталей, включая
                      работы по их внедрению на оборудовании предприятия,
                      различных конфигураций и материалов
                    </p>
                  </div>
                </div>
              </div>
              <div className="xl:w-1/3 py-4 w-full">
                <div className="flex ">
                  <div className="w-1/6 px-2">
                    <img src={u9} alt="" />
                  </div>
                  <div className="text-gray-600 w-5/6 ">
                    <p>
                      Технологический
                      <span className="font-bold"> скаутинг</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container mx-auto text-center py-6 mb-12 text-gray-800">
        <div className="container mx-auto px-2 pt-4 pb-12 text-gray-800">
          <a name="project"></a>
          <h1
            className="
          w-full
          my-2
          text-3xl
          xl:text-5xl
          font-bold
          leading-tight
          text-center text-gray-800
          uppercase
        "
          >
            РеАЛИЗОВАННЫЕ ПРОЕКТЫ
          </h1>

          <div className="flex flex-wrap">
            <div className="w-full sm:w-1/2 p-6">
              <img src={r1} alt="" />
            </div>

            <div className="w-5/6 sm:w-1/2 p-6 text-left">
              <h3 className="text-3xl text-blue-800 font-bold leading-none mb-3">
                Создание системы энергообеспечения дилерского центра «РОЛЬФ
                Сити» под ключ
              </h3>
              <p className="text-gray-600 mb-8 p-4">
                Специалисты СТАРТЕЛЕКОМ выполнили полный комплекс
                электромонтажных работ по системам энергообеспечения, освещения,
                охранно-пожарной сигнализации, контроля доступа и управления
                инженерным оборудованием дилерского центра «РОЛЬФ Сити»
                (площадью более 6 000 м²). Проект был реализован в предельно
                сжатые сроки — от начала земляных работ до сдачи объекта «под
                ключ» прошло менее восьми месяцев.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-5/6 sm:w-1/2 p-6 text-left">
              <h3 className="text-3xl text-blue-800 font-bold leading-none mb-3">
                Разработка и согласовавание концепции системы удаленного
                видеонаблюдения для МВД России
              </h3>
              <p className="text-gray-600 mb-8 p-4">
                Всего лишь за пять месяцев СТАРТЕЛЕКОМ удалось провести
                обследование трассы длиной 250 км и спроектировать «умную»
                систему, которая способна контролировать дорожную обстановку;
                автоматически обнаруживать факты нарушения правил дорожного
                движения, фиксировать их и распечатывать карточки нарушения;
                распознавать номерные знаки и проводить комплексную проверку
                транспорта по базам данных в автоматическом режиме; оперативно
                передавать информацию в соответствии с заданными требованиями.
              </p>
            </div>
            <div className="w-full sm:w-1/2 p-6">
              <img src={r2} alt="" />
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-full sm:w-1/2 p-6">
              <img src={r3} alt="" />
            </div>

            <div className="w-5/6 sm:w-1/2 p-6 text-left">
              <h3 className="text-3xl text-blue-800 font-bold leading-none mb-3">
                Обеспечение функционала СОРМ на расширяемых цифровых АТС в
                разных городах с надзором из единого центра в Москве для
                Воентелеком
              </h3>
              <p className="text-gray-600 mb-8 p-4">
                Интеграция в инфраструктуру оператора связи СОРМ-концентратора
                производства ISKRATEL, предусматривающего отказ от прокладки и
                аренды дорогостоящих потоков Е1. Взаимодействие между отдельными
                элементами сети было выполнено за счет использования узкой
                полосы потока данных в IP-сети.Созданный механизм автоматически
                задействуется только в случае проведения оперативно-розыскных
                мероприятий, а в пассивном состоянии не требует никаких затрат
                энергии и вычислительных мощностей. Решение наших специалистов
                позволило значительно сократить расходы заказчика на внедрение и
                эксплуатацию СОРМ.
              </p>
            </div>
          </div>
          <div className="w-full mb-4"></div>
        </div>
      </section>
      <a name="form_tpp" aria-label="to">
        {" "}
      </a>
      <section className="bg-gray-100 py-8">
        <div className="container mx-auto px-2 pt-4 pb-12 text-gray-800">
          <h1
            className="
            w-full
            my-2
            text-3xl
            xl:text-5xl
            font-bold
            leading-tight
            text-center text-gray-800
          "
          >
            ПОДАЙТЕ ЗАЯВКУ
          </h1>
          <form action="">
            <div className="flex flex-wrap py-6">
              <div className="xl:w-1/3 xl:py-0 py-4 px-4 w-full">
                <input
                  className="shadow appearance-none border rounded w-full 
                py-2 px-3 text-gray-700 leading-tight 
                focus:outline-none focus:shadow-outline"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  placeholder="имя"
                />
              </div>
              <div className="xl:w-1/3 xl:py-0 py-4 w-full px-4">
                <input
                  className="shadow appearance-none 
                border rounded w-full py-2 px-3 
                text-gray-700 leading-tight 
                focus:outline-none focus:shadow-outline"
                  id="tel"
                  type="text"
                  name="tel"
                  value={tel}
                  onChange={(e) => setTel(e.target.value)}
                  placeholder="телефон"
                />
              </div>
              <div className="xl:w-1/3 xl:py-0 py-4 w-full px-4">
                <input
                  className="shadow appearance-none border 
                rounded w-full py-2 px-3 text-gray-700 
                leading-tight focus:outline-none 
                focus:shadow-outline"
                  id="email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="электронная почта"
                />
              </div>
            </div>
            <div className="px-6 py-4">
              <textarea
                id="msg"
                rows="5"
                className="block w-full text-gray-700
               border rounded-lg focus:outline-none p-4"
                name="msg"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="ваше сообщение"
              ></textarea>
            </div>
            <div className=" text-center">
              <button
                className="bg-blue-600 text-white rounded-md 
                font-bold px-4 py-2 text-xl"
                id="btn"
                onClick={(event) => sendForm(event)}
              >
                отправить
              </button>
            </div>
          </form>
        </div>
      </section>
      <section className="container mx-auto text-center py-6 mb-12 text-gray-800">
        <div className="container mx-auto px-2 pt-4 pb-12 text-gray-800">
          <a name="contact"></a>
          <h3
            className="
          w-full
          my-2
          text-3xl
          font-bold
          leading-tight
          text-center text-gray-800
          uppercase
          pb-8
        "
          >
            если остались вопросы, свяжитесь <br /> со специалистами центра
          </h3>
          <div className="flex flex-wrap">
            <div className="xl:w-1/3 w-full xl:py-0 py-4">
              <div className="flex">
                <img
                  src={xr}
                  alt=""
                  className="w-20 h-20 rounded-full"
                />
                <div className="flex flex-col text-left px-4">
                  <h1 className="font-bold text-left">Храпов Андрей</h1>
                  <p className="">amp@copartner.ru</p>
                  <p>+7 (863) 204-22-00</p>
                </div>
              </div>
            </div>
            <div className="xl:w-1/3 w-full xl:py-0 py-4">
              <div className="flex">
                <img
                  src={rob}
                  alt=""
                  className="w-20 h-20 rounded-full"
                />
                <div className="flex flex-col text-left px-4">
                  <h1 className="font-bold text-left">Аракелян Роберт</h1>
                  <p className="">amp@copartner.ru</p>
                  <p>+7 (863) 204-22-00</p>
                </div>
              </div>
            </div>
            <div className="xl:w-1/3 w-full xl:py-0 py-4">
              <div className="flex">
                <img
                  src={stas}
                  alt=""
                  className="w-20 h-20 rounded-full"
                />
                <div className="flex flex-col text-left px-4">
                  <h1 className="font-bold text-left">Можин Станислав</h1>
                  <p className="">invest@tppro.ru</p>
                  <p>+79289035226</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer>
        <div
          className="
          w-full
          container
          mx-auto
          flex flex-wrap
          items-center
          justify-between
          mt-0
          py-2
        "
        >
          {/* <div className="pl-4 flex items-center">
            <a
              className="
              toggleColour
              text-white
              no-underline
              hover:no-underline
              font-bold
              text-2xl
              lg:text-4xl
            "
              href="#"
            >
              <img src="/img/amp.svg" alt="" />
            </a>
            <a href="#">
              <img src={tpp__logo} alt="" />
            </a>
          </div> */}
          <div
            className="
            w-full
            flex-grow
            lg:flex lg:items-center lg:w-auto
            hidden
            mt-2
            lg:mt-0
            bg-white
            lg:bg-transparent
            text-black
            p-4
            lg:p-0
            z-20
          "
            id="nav-content"
          >
            <ul className="list-reset lg:flex justify-end flex-1 items-center">
              <li className="mr-3">
                <a
                  className="inline-block py-2 px-4 text-white font-bold no-underline hover:text-green-200"
                  href="#services"
                >
                  Услуги
                </a>
              </li>
              <li className="mr-3">
                <a
                  className="
                  inline-block
                  text-white
                  no-underline
                  font-bold
                  py-2
                  px-4
                  hover:text-green-200
                "
                  href="#project"
                >
                  Реализованные проекты
                </a>
              </li>
              <li className="mr-3">
                <a
                  className="
                  inline-block
                  text-white
                  no-underline
                  font-bold
                  py-2
                  px-4
                  hover:text-green-200
                "
                  href="#contact"
                >
                  Контакты
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Footer>
    </main>
  );
};

export default Engineering;

const Footer = styled.footer`
  color: white;
  width: 100%;
  background: #00000075;
`;

const Nav = styled.nav`
  background-color:rgba(0, 0, 0, 0.35);
  padding: 70px 0;

  @media screen and (max-width: 767px) {
    background: none;
  }
`;

const EnginHeder = styled.div`
  display: flex;
  margin: 0 auto;
  padding: 0 16px;
  align-items: center;
  width: 100%;
  max-width: 1440px;

  @media screen and (max-width: 540px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;