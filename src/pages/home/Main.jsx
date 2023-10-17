import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

// img
import help from "../../img/help.svg";
import gvard from "../../img/gvard.svg";
import hours from "../../img/hours.svg";
import graph from "../../img/graph.svg";

import OfferCard from "../../components/OfferCard/OfferCard";
import NewsTeaser from "../../components/NewsTeaser/NewsTeaser";
import OrdersBlock from "../../components/OrdersBlock/OrdersBlock";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";


//UI components
import { dataChart } from "../../utils/chart";
// bar
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import TextUser from "../../components/TextUser/TextUser";

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
      position: "top",
    },
    title: {
      display: false,
      text: "text",
    },
  },
};
//bar

const Main = () => {

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  
  const [open, setOpen] = useState(false);
  
  
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }  
    setOpen(false);
  };
  
  return (
    <>
      <main className="main">
      {/* <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Заявка отправлена
        </Alert>
      </Snackbar> */}
        {/* <!-- graf block  --> */}
        <section className="container max-w-5xl mx-auto flex flex-col py-16">
          <div>
            <TextUser />
          </div>
          <div className="py-10">
            <Bar options={options} data={dataChart} />
          </div>
        </section>
        {/* <!-- graf block  -->
    <!-- work block  --> */}
        <section className="py-10 text-white bg-green-450">
          <div
            className="mx-auto px-2 pb-12 text-white
            max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl
            "
          >
            <h1
              className="
                w-full
                text-3xl
                xl:text-4xl
                font-bold
                leading-tight
                text-center 
                pb-6
            "
            >
              ПОЧЕМУ С НАМИ РАБОТАЮТ
            </h1>
            <div className="w-full mb-4">
              <div className="flex flex-wrap">
                <div className="xl:w-1/2 py-4 w-full">
                  <OfferCard
                    icon={help}
                    title={`Помощь в работе с крупными компаниями`}
                    text={`Помощь в составлении запроса, утверждении заказа,
                      подписании важных бумаг. Доведение сделки до обоюдной
                      удовлетворенности.`}
                  />
                </div>
                <div className="xl:w-1/2 py-4 xl:px-8 w-full">
                  <OfferCard
                    icon={gvard}
                    title={`Подбор исполнителя`}
                    text={`Подбор правильного исполнителя Вашего заказа со
                    стопроцентной гарантией качества и надежности.`}
                  />
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="xl:w-1/2 py-4 w-full">
                  <OfferCard
                    icon={hours}
                    title={`Долгосрочное сотрудничество`}
                    text={`Гарантия надежности сотрудничества, взаимовыгодной
                    помощи и поддержки на всех этапах заключения сделки с
                    нашими партнерами.`}
                  />
                </div>
                <div className="xl:w-1/2 py-4 xl:px-8 w-full">
                  <OfferCard
                    icon={graph}
                    title={`Постоянно пополняемая база участников`}
                    text={`Беспрерывный поток новых участников Ассоциации с
                    предварительной проверкой на качество и надежность.`}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- work block -->
    <!-- news block  --> */}
        <NewsTeaser />
        {/* <!-- news block --> */}
        {/* order */}
        <OrdersBlock />
        {/* end orders */}

        {/*<!-- registration block  --> */}
        <RegistrationForm />
        {/* <!-- registration block  --> */}
      </main>
    </>
  );
};

export default observer(Main);
