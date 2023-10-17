import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import Tooltip from "@mui/material/Tooltip";
import DraftService from "../../services/DraftService";
import DetailSlider from "../../components/DetailSlider/DetailSlider";
import config, { filesUrl } from "../../settings/settings";
import { postFiles } from "../../utils/services";
import { SkeletonPlantDetails } from "../../components/Skeletons/SkeletonPlantDetails/SkeletonPlantDetails";
import { AuthContext } from "../../hoc/AuthProvider";
import { ChatContext } from "../../context/ChatContext";
import { DialogFirstMessage } from "../../components/Dialogs/DialogFirstMessage/DialogFirstMessage";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Paper, Box } from "@mui/material";
import styled from "styled-components";

import docIco from "../../img/doc-ico.svg";
import imgIco from "../../img/img-ico.svg";
import background from "../../img/draft-background.jpg";

const { ZNAK, ZNAK2 } = config;

const DraftDetails = () => {
  const location = useLocation();
  const { store } = useContext(AuthContext);
  const { sendTextMessage } = useContext(ChatContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [item, setItem] = useState([]);
  const [img, setImg] = useState([]);

  const [textMessage, setTextMessage] = useState("");

  // dialog
  const [open, setOpen] = useState(false);
  const [zopen, setZopen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [zOpenDialog, setZopenDialog] = useState(false);
  const [isServiceOwner, setIsServiceOwner] = useState({
    legend: "",
    raiting: 0,
    service: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const [textValue, setTextValue] = useState("");
  const [filesList, setFilesList] = useState([]);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClickOpenZ = () => {
    setZopenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setTextValue("");
  };

  const handleCloseDialogZ = () => {
    setZopenDialog(false);
    setTextValue("");
  };

  const handleSend = async (e) => {
    try {
      if (uploadFile.length > 5) return;

      const url = `${config?.mainUrl}${location?.pathname}`;

      const formData = new FormData();

      formData.append("textValue", textValue);
      formData.append("url", url);

      Object.values(uploadFile).forEach((photo) => {
        formData.append("uploadFile", photo);
      });
      store?.setMessage("");
      store?.setLoading(true);
      // await DraftService.sendZvk(formData);
      const response = await DraftService.sendZvk(formData);
      console.log(response);
      setOpenDialog(false);
      setOpen(true);
      setTextValue("");
      setUploadFile([]);
    } catch (error) {
      store?.setMessage(error?.response?.data?.message);
      store?.setLoading(false);
    } finally {
      store?.setLoading(false);
    }
  };

  const handleSendZ = async (e) => {
    try {
      const formData = new FormData();
      formData.append("senderId", store?.user?._id);
      formData.append("title", item?.title);
      formData.append("text", textValue.trim());
      formData.append("receiverId", item?.inhere_user);

      store?.setMessage("");
      store?.setLoading(true);
      const response = await DraftService.firstMessage(formData);

      for (const key in filesList) {
        if (Object.hasOwnProperty.call(filesList, key)) {
          const fData = new FormData();
          const element = filesList[key];
          fData.append("files", element);
          const res = await postFiles(fData);

          const pathFile = `${filesUrl}/files/${res?.data[0]?.filename}`;
          const realNameFile = element?.name;
          sendTextMessage(
            textValue,
            store?.user,
            response?.data.chatId,
            setTextValue,
            pathFile,
            realNameFile
          );
          setFilesList([]);
        }
      }
      // sendTextMessage(textValue.trim(), store?.user, response.data?.chatId, setTextMessage);
      console.log("draft details response", response);
      setZopenDialog(false);
      setOpen(true);
      setTextValue("");
      setFilesList([]);
    } catch (error) {
      store?.setMessage(error?.response?.data?.message);
      store?.setLoading(false);
    } finally {
      store?.setLoading(false);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleCloseZ = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setZopen(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  // enddialog

  useEffect(() => {
    const getDraft = async (id) => {
      try {
        setIsLoading(true);
        const response = await DraftService.fetchItemDraft(id);
        setIsLoading(false);
        const data = response.data?.data?.photo_url.filter(
          (f) => !f?.filename.includes("pdf") && !f?.filename.includes("DVG")
        );
        setImg(data);
        setItem(response?.data.data);
        setIsServiceOwner(response?.data.service);
      } catch (e) {
        console.log(e);
      }
    };
    getDraft(id);
  }, []);

  // async function getItemNews(id) {
  //     try {
  //         const response = await DraftService.fetchItemDraft(id);
  //         // console.log('resp data draft', response.data);
  //         const data = response.data?.photo_url.filter(f=>!f?.filename.includes('pdf'));
  //         setImg(data);
  //         setItem(response?.data);
  //         // console.log('rd',response?.data);
  //     } catch (e) {
  //         console.log(e);
  //     }
  //   }

  const pageFromUrl = window.location.pathname.split("/").splice(-3, 1)[0];

  const [uploadFile, setUploadFile] = useState([]);

  const fillingStar = (raiting) => {
    const number = 5 - raiting;
    // const arg1 = [...Array(raiting).keys()].fill(ZNAK);
    // const arg2 = [...Array(number).keys()].fill(ZNAK2);
    const arg1 = Array(raiting).fill(ZNAK);
    const arg2 = Array(number).fill(ZNAK2);
    const result = arg1.concat(arg2);
    return result;
  };
  const grafRaiting = fillingStar(isServiceOwner.raiting);

  if (isLoading) {
    return <SkeletonPlantDetails />;
  }

  return (
    <Wrapper>
      <Wrapper2>
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Заявка отправлена!
          </Alert>
        </Snackbar>
        {/* dialogform */}
        <DialogFirstMessage
          open={openDialog}
          onClose={handleCloseDialog}
          textValue={textValue}
          setTextValue={setTextValue}
          handleSend={handleSend}
          filesList={uploadFile}
          setFilesList={setUploadFile}
          variant={1}
          title="Отправить заявку"
          details="В поле ниже вы можете описать ваше коммерческое предложение по
          заказу"
        />

        {/* dialogform */}
        <DialogFirstMessage
          open={zOpenDialog}
          onClose={handleCloseDialogZ}
          textValue={textValue}
          setTextValue={setTextValue}
          handleSend={handleSendZ}
          filesList={filesList}
          setFilesList={setFilesList}
          title="Написать заказчику"
          details="В поле ниже вы можете описать ваши вопросы к заказчику"
        />

        <Content>
          <div className="image sliderArea">
            <button onClick={() => navigate(-1)} className="back-btn">
              Назад
            </button>
            <DetailSlider items={item?.photo_url} />

            {/* <button onClick={() => navigate(`/telegram/${item._id}`)}>telega</button> */}
          </div>

          <Info>
            <div className="infoNumber">{item?.number}</div>
            <div className="infoTitle">{item?.title}</div>
            <div className="infoDetails">{item?.details}</div>
            <div className="infoCategory">
              <strong>Виды работ:</strong>
              {item?.work_info?.map((item, index) => (
                <div key={index}>{item?.name}</div>
              ))}
            </div>

            <div className="infoKl">
              Количество:
              {item?.kl === 0 && "не указано"}
              {item?.kl !== 0 &&
                item?.kl_text === "партия" &&
                ` ${item?.kl} шт.`}
              {item?.kl !== 0 &&
                item?.kl_text === "мес/шт" &&
                ` ${item?.kl} шт/мес`}
              {item?.kl !== 0 &&
                item?.kl_text === "год/шт" &&
                ` ${item?.kl} шт/год`}
              {item?.kl !== 0 && item?.kl_text === "шт." && ` ${item?.kl} шт.`}
            </div>

            <div className="infoMany">
              <strong>Бюджет:</strong>
              {item?.many !== null &&
              item?.many !== undefined &&
              item?.many !== "" &&
              item?.many !== "0"
                ? ` ${parseFloat(item?.many).toLocaleString()} ₽`
                : `договорной`}
            </div>

            <div className="infoCities">
              Город:
              {item?.cities ? ` ${item?.cities}` : ` информация уточняется`}
            </div>
            <Paper
              elevation={3}
              sx={{ mt: 2, p: 2, width: "75%", fontSize: 18 }}
            >
              <Box sx={{ mb: 1 }}>
                <strong>Звездный рейтинг АМП:</strong> <br />
                <span style={{ fontSize: 20 }}>{grafRaiting}</span>
              </Box>
              {!!isServiceOwner.legend && (
                <Box>
                  <strong>Статус:</strong> {isServiceOwner.legend}
                </Box>
              )}
            </Paper>

            <div className="infoDoc">
              <span>Документы для скачивания:</span>

              {item?.file_url?.map((item, index) => {
                const info = item?.filename.split(".").splice(-1, 1)[0];
                return (
                  <div className="docItem" key={index}>
                    <img
                      alt=""
                      src={info == "jpg" || info == "png" ? imgIco : docIco}
                    />
                    <a
                      href={
                        config?.baseUrlUpload + "/uploads/" + item?.filename
                      }
                      target="_blank"
                      noreferel="true"
                    >
                      {item?.filename}
                    </a>
                  </div>
                );
              })}
            </div>
            <button type="submit" onClick={handleClickOpen} className="amp-btn">
              Связь с АМП
            </button>
            {isServiceOwner.service ? (
              <Tooltip
                title="Заказчик предпочитает контактировать через АМП"
                followCursor
              >
                <button className="btn-disabled">Написать заказчику</button>
              </Tooltip>
            ) : (
              <button
                type="submit"
                onClick={handleClickOpenZ}
                className="amp-btn"
              >
                Написать заказчику
              </button>
            )}
          </Info>
        </Content>
      </Wrapper2>
    </Wrapper>
  );
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
  min-height: calc(100vh - 278.5px - 274px);
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 1) 70%,
    rgba(255, 255, 255, 0.9472163865546218) 80%,
    rgba(255, 255, 255, 0.9220063025210083) 90%,
    rgba(255, 255, 255, 0.7259278711484594) 100%
  );
`;

const FileUpload = styled.div`
  display: flex;
  flex-direction: column;

  .file-input {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  .file-label {
    padding: 10px;
    background-color: #00aeae;
    color: white;
    margin: 0 auto;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
  }

  button {
    padding: 5px 10px;
    border-radius: 5px;
    color: white;
    background-color: #4b525c;
    margin-top: 15px;
  }
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

	.image {
		width: 900px;
		height: 700px;

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
	.back-btn {
		background: #00aeae;
		border-radius: 5px;
		max-width: 220px;
		padding: 10px 25px;
		margin-bottom: 20px;
		color: #ffffff;
		// margin-left: 30px;

		@media screen and (max-width: 480px) {
			// margin: 50px auto 0;
			font-size: 20px;
		}
	}

	.amp-btn {
		background: #00aeae;
		border-radius: 5px;
		max-width: 220px;
		padding: 10px 25px;
		margin-top: 50px;
		color: #ffffff;
		margin-left: 30px;

		@media screen and (max-width: 480px) {
			margin: 50px auto 0;
			font-size: 20px;
		}
	}

	.btn-disabled{
		background: #ccc;;
		border-radius: 5px;
		max-width: 220px;
		padding: 10px 25px;
		margin-top: 50px;
		color: #ffffff;
		margin-left: 30px;

		@media screen and (max-width: 480px) {
			margin: 50px auto 0;
			font-size: 20px;
		}
	}

	// .btn-pulse::before {
	// 	content: '';
	// 	display: block;
	// 	position: absolute;
	// 	border-radius: 5px;
	// 	top: 0;
	// 	left: 0;
	// 	right: 0;
	// 	bottom: 0;
	// 	animation: pulse 1s ease infinite;
	// 	border: 1px #00aeae solid;

	// 	@keyframes pulse {
	// 		0% {
	// 			transform: scale(1, 2);
	// 			opacity: 1;
	// 		}
	// 		60% {
	// 			transform: scale(1.1);
	// 			opacity: 0.4;
	// 		}
	// 		100% {
	// 			transform: scale(1);
	// 			opacity: 0;
	// 		}
	// 	}
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
    display: flex;
    padding: 11px 30px;
    background: #333333;
    border-radius: 5px;
    width: 140px;
    font-weight: 500;
    font-size: 36px;
    color: #ffffff;

    @media screen and (max-width: 1200px) {
      margin-top: 10px;
    }

    @media screen and (max-width: 480px) {
      font-size: 24px;
      width: 102px;
      padding: 6px 15px;
    }
  }

  .infoTitle {
    margin-top: 47px;
    font-weight: 500;
    font-size: 24px;
    color: #00aeae;

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
    margin-top: 25px;
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
    font-weight: 400;
    font-size: 18px;
    text-decoration-line: underline;
    color: #7c7c7c;

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
