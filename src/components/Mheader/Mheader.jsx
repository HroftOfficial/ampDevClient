import React, { useState, useEffect } from "react";
import MSlider from "../MSlider/MSlider";
import Navbar from "../../components/Navbar/Navbar";
import MyButton from "../../components/MyButton/MyButton";
import InfoService from "../../services/InfoService";
import tpp from "../../img/tpp-ro.png";
import smp from "../../img/smp.png";
import styled from "styled-components";

const Mheader = () => {
  const [info, setInfo] = useState({ allUser: "423", allZakaz: "3785" });

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
    <header className="m__background ">
      <Nav>
        <Navbar />
      </Nav>
      {/* <!-- text content  --> */}
      <Content>
        {/* <div className="flex justify-between items-center px-4 max-w-2xl md:max-w-3xl lg:px-0 lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl mx-auto text-white"> */}
        {/* <!-- left block --> */}
        <div className="left__block">
          <h1>ПЛАТФОРМА ДЛЯ ПОИСКА И РАЗМЕЩЕНИЯ ЗАКАЗОВ</h1>
          <h2>По всем видам металлообработки</h2>
          <p>
            Зарегистрируйтесь, и получите доступ к {info?.allZakaz} заказам{" "}
            <br />и {info.allUser} компаниям исполнителей
          </p>
          <a href="/#form">
            <Button>Зарегистрироваться</Button>
          </a>
        </div>
        {/* <!-- desktop right block --> */}
        <RightBlock>
          {/* <div className="hidden md:flex flex-col justify-center  items-center text-center md:text-left"> */}
          <div className="right-block__slider">
            <div className="span-center">
              Всего: {info?.allZakaz} заказов
              <MSlider countGroup={info} />
            </div>
          </div>

          <Support>
            <h3>При поддержке:</h3>
            <div className="flex flex-row">
              <div className="">
                <a href="https://tppro.ru/">
                  <img src={tpp} alt="" className="tpp" />
                </a>
              </div>
              <div className="">
                <a href="https://soyuzmash.ru/">
                  <img src={smp} alt="" className="smp" />
                </a>
              </div>
            </div>
          </Support>
          {/* </div> */}
        </RightBlock>
        {/* </div> */}
      </Content>
      {/* <!-- right block -->
<!-- mobile right block --> */}
      <MobileSlider>
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
        <SliderWrapper>
          <span>
            Всего: {info?.allZakaz} заказов
            <MSlider countGroup={info} />
          </span>
        </SliderWrapper>
      </MobileSlider>
    </header>
  );
};

export default Mheader;

const Content = styled.div`
  display: flex;
  max-width: 1492px;
  width: 100%;
  justify-content: space-between;
  color: white;
  margin: 100px auto 150px;
  padding: 0 26px;

  @media screen and (max-width: 768px) {
    justify-content: center;
    margin: 50px auto 100px;
  }

  @media screen and (max-width: 480px) {
    margin: 0 auto 50px;
  }

  .left__block {
    display: flex;
    flex-direction: column;
    max-width: 950px;

    @media screen and (max-width: 1340px) {
      max-width: 750px;
    }

    @media screen and (max-width: 1130px) {
      max-width: 650px;
    }

    @media screen and (max-width: 1024px) {
      max-width: 550px;
    }

    @media screen and (max-width: 900px) {
      max-width: 450px;
    }

    @media screen and (max-width: 768px) {
      max-width: 600px;
    }

    h1 {
      margin: 0;
      font-family: "Ubuntu", sans-serif;
      font-style: normal;
      font-weight: 700;
      font-size: 64px;
      line-height: 108.5%;
      /* or 69px */
      letter-spacing: 0.02em;
      color: #ffffff;

      @media screen and (max-width: 1340px) {
        font-size: 44px;
      }

      @media screen and (max-width: 480px) {
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 21px;
      }
    }

    h2 {
      margin: 12px 0 110px;
      font-family: "Ubuntu", sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 36px;
      line-height: 41px;
      color: #ffffff;

      @media screen and (max-width: 480px) {
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        margin: 12px 0 40px;
      }
    }

    p {
      margin: 0;
      font-family: "Ubuntu", sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 24px;
      line-height: 28px;
      color: #ffffff;

      @media screen and (max-width: 480px) {
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
      }
    }

    @media screen and (max-width: 900px) {
      /* max-width: 400px; */
    }
  }
`;

const RightBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 490px;

  .ml-auto {
    margin-left: auto;
  }

  @media screen and (max-width: 767px) {
    display: none;
  }

  .right-block__slider {
    width: 410px;
    margin-left: auto;
    font-family: "Ubuntu", sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 36px;
    line-height: 41px;
    color: #ffffff;
    background: #00aeae;
    padding: 50px 30px;
    border-radius: 10px;

    @media screen and (max-width: 1024px) {
      width: 300px;
    }

    .span-center {
      text-align: center;
    }
  }
`;

const Support = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 80px;
  width: 490px;

  font-family: "Ubuntu", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 28px;
  color: #ffffff;
  text-align: center;

  @media screen and (max-width: 1024px) {
    width: 357px;
  }

  h3 {
    margin-bottom: 20px;
  }

  .tpp,
  .smp {
    height: 140px;

    @media screen and (max-width: 1024px) {
      height: 100px;
    }
  }
`;

const Button = styled.button`
  width: 400px;
  height: 80px;
  text-align: center;
  justify-content: center;
  color: white;
  background-color: #00aeae;
  margin: 30px 0 40px;
  border-radius: 10px;

  font-family: "Ubuntu", sant-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 26px;
  line-height: 34px;
  text-align: center;
  color: #ffffff;

  @media screen and (max-width: 480px) {
    width: 200px;
    height: 40px;
    border-radius: 5px;
    font-size: 16px;
  }
`;

const Nav = styled.nav`
  background-color: rgba(0, 0, 0, 0.35);
  padding: 70px 0;

  @media screen and (max-width: 768px) {
    padding: 40px 0;
  }
  @media screen and (max-width: 479px) {
    background: none;
  }
`;

const SliderWrapper = styled.div`
  display: flex;
  background: #00aeae;
  color: white;
  text-align: center;
  padding: 16px 0;
  width: 240px;
  /* margin-left: 20px; */

  @media screen and (max-width: 500px) {
    width: 50%;
  }
  @media screen and (max-width: 370px) {
    width: auto;
  }
`;

const MobileSlider = styled.div`
  display: flex;
  color: white;
  justify-content: space-around;
  align-items: center;

  @media screen and (min-width: 767px) {
    display: none;
  }
`;
