import React, { useState, useEffect } from "react";
import MSlider from "../MSlider/MSlider";
import Navbar from "../Navbar/Navbar";
import MyButton from "../MyButton/MyButton";
import InfoService from "../../services/InfoService";
import tpp from "../../img/tpp-ro.png";
import smp from "../../img/smp.png";

const Engin = () => {
  const [info, setInfo] = useState({ allUser: "3000", allZakaz: "4480" });

  useEffect(() => {
    getInfo();
  }, []);

  async function getInfo() {
    try {
      const response = await InfoService.fetchInfo();
      setInfo(response?.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <header className="m__background">
      <nav className="z-30 top-0 py-8 w-full h__background">
        <Navbar />
      </nav>
      {/* <!-- text content  --> */}
      <div className="flex justify-between items-center px-4 max-w-2xl md:max-w-3xl lg:px-0 lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl mx-auto text-white">
        {/* <!-- left block --> */}
        <div className="">
          <h1 className="md:my-6 text-base md:text-4xl font-bold leading-normal text-left xl:text-5xl max-w-xs md:max-w-lg">
            ПЛАТФОРМА ДЛЯ ПОИСКА И РАЗМЕЩЕНИЯ ЗАКАЗОВ
          </h1>
          <p className="leading-normal text-sm md:text-3xl mb-4">
            По всем видам металлообработки
          </p>
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
              <MSlider countGroup={info} />
            </span>
          </div>

          <div className="flex text-xl xl:pr-24 flex-col py-10">
            <h1 className="text-center pb-8">При поддержке:</h1>
            <div className="flex flex-row">
              <div className="">
                <a href="/">
                  <img src={tpp} alt="" className="cover w-44" />
                </a>
              </div>
              <div className="">
                <a href="/">
                  <img src={smp} alt="" className="cover w-32" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- right block -->
<!-- mobile right block --> */}
      <div className="flex justify-between items-center md:hidden text-white">
        <div className="flex font-semibold flex-col  py-10">
          <h1 className="text-center pb-8">При поддержке:</h1>
          <div className="flex flex-row">
            <div className="">
              <a href="/">
                <img src={tpp} alt="" className="cover w-44" />
              </a>
            </div>
            <div className="">
              <a href="/">
                <img src={smp} alt="" className="cover w-32" />
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-end">
          <span className="inline-block font-bold rounded px-2 mx-2 py-4 bg-green-450 text-white">
            Всего: {info?.allZakaz} заказов
            <MSlider countGroup={info} />
          </span>
        </div>
      </div>
    </header>
  );
};

export default Engin;
