import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import InfoService from "../../services/InfoService";
import { AuthContext } from "../../hoc/AuthProvider";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import MyButton from "../../components/MyButton/MyButton";
import background from "../../img/draft-background.jpg";

const RegistrationForm = () => {
  const { store } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [org, setOrg] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  async function sendForm(event) {
    try {
      event.preventDefault();
      const data = {
        username: username,
        org: org,
        tel: tel,
        email: email,
        msg: msg,
        mailTheme: "Подана заявка на регистрацию в АМП",
      };
      const response = await InfoService.sendZvk(data);
      setUsername("");
      setOrg("");
      setTel("");
      setEmail("");
      setMsg("");
      setOpen(true);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      //   store?.setMessage(error?.response?.data?.message);
      console.log(error?.response?.data?.message);
    }
  }

  return (
    <>
      <Wrapper>
        <Wrapper2>
          <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              Заявка отправлена
            </Alert>
          </Snackbar>
          <section className="bg__form">
            <a name="form" aria-label="to">
              {" "}
            </a>
            <div className="mx-auto px-2 pt-14 pb-12 text-gray-850 max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl">
              <H1 className="text-center text-black text-4xl font-bold pb-2">
                ЗАЯВКА НА РЕГИСТРАЦИЮ
              </H1>
              <p className="text-center text-base text-gray-850 pb-8">
                Заполните форму для подачи заявки на регистрацию <br />в
                качестве участника ассоциации
              </p>
              <form>
                <div className="flex flex-wrap py-6">
                  <div className="xl:w-1/2 xl:py-3 py-4 px-4 w-full">
                    <input
                      className="appearance-none border rounded w-full py-4 px-3 
                      text-gray-850 leading-tight focus:outline-none 
                      focus:shadow-outline"
                      id="username"
                      name="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      type="text"
                      placeholder="Имя"
                    />
                  </div>

                  <div className="xl:w-1/2 xl:py-3 py-4 w-full px-4">
                    <input
                      className=" appearance-none border rounded w-full py-4 px-3 text-gray-850 leading-tight focus:outline-none focus:shadow-outline"
                      id="org"
                      name="org"
                      type="text"
                      value={org}
                      onChange={(e) => setOrg(e.target.value)}
                      placeholder="Название организации"
                    />
                  </div>

                  <div className="xl:w-1/2 xl:py-3 py-4 w-full px-4">
                    <input
                      className=" appearance-none border rounded w-full py-4 px-3 text-gray-850 leading-tight focus:outline-none focus:shadow-outline"
                      id="tel"
                      name="tel"
                      type="text"
                      value={tel}
                      onChange={(e) => setTel(e.target.value)}
                      placeholder="Телефон"
                    />
                  </div>

                  <div className="xl:w-1/2 xl:py-3 py-4 w-full px-4">
                    <input
                      className=" appearance-none border rounded w-full py-4 px-3 text-gray-850 leading-tight focus:outline-none focus:shadow-outline"
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Ваш email"
                    />
                  </div>
                </div>

                <div className="px-4 py-6">
                  <textarea
                    id="msg"
                    name="msg"
                    rows="7"
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    className="block w-full text-gray-850 border rounded-md focus:outline-none p-4"
                    placeholder="Ваше сообщение"
                  ></textarea>
                </div>

                <div className=" text-center pt-6">
                  <MyButton onClick={(event) => sendForm(event)}>
                    Отправить
                  </MyButton>
                </div>

                {store?.message}
              </form>
              <div></div>
            </div>
          </section>
        </Wrapper2>
      </Wrapper>
    </>
  );
};

export default RegistrationForm;

const H1 = styled.h1`
  font-family: "Ubuntu", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 128.69%;
  letter-spacing: 0.1em;
  color: #333333;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 20px;

  @media screen and (max-width: 450px) {
    margin-bottom: 40px;
    font-size: 30px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-image: url(${background});
  background-size: 100%;
`;

const Wrapper2 = styled.div`
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 1) 70%,
    rgba(255, 255, 255, 0.7959558823529411) 80%,
    rgba(255, 255, 255, 0.7763480392156863) 90%,
    rgba(255, 255, 255, 0.7259278711484594) 100%
  );

  @media screen and (max-width: 1200px) {
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 1) 88%,
      rgba(255, 255, 255, 0.9248074229691877) 95%,
      rgba(255, 255, 255, 0.7259278711484594) 100%
    );
  }
`;
