import React,{useEffect, useState} from 'react';
import InfoService from '../../services/InfoService';
import './about.css';
import photo from "../../img/photo_o_nas_1.jpg"

const About = () => {
    const [info, setInfo] = useState([])

    useEffect(() => {
        getInfo()
    }, [])
    

      async function getInfo() {
    try {
      const response = await InfoService.fetchInfo();
      setInfo(response?.data?.allUser);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
        <div className="bg__map text-green-450 md:py-16">
            <h1 className="text-base text-center text-black md:text-2xl xl:text-4xl font-bold pt-6">ЧЕМ МЫ ЗАНИМАЕМСЯ</h1>
                <div className="text-gray-850 flex justify-between items-center px-4 
                    max-w-2xl md:max-w-3xl lg:px-0 lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl
                    mx-auto">

                    <div className="flex flex-col max-w-md items-center justify-center space-y-4 md:mx-10 lg:mx-0 xl:max-w-5xl">
                        <h1 className="inline-block self-start text-xl 
                            text-center text-green-450
                            md:text-2xl xl:text-3xl font-bold">
                            МЫ
                        </h1>
                        <p className="block text-black text-base">
                            Некоммерческая организация «Ассоциация металлообрабатывающих предприятий» (АМП) 
                            официально зарегистрирована в Министерстве юстиции с 2018 года. На сегодняшний день, 
                            в ассоциацию входит {info} предприятий, занимающихся металлообработкой. АМП тесно работает 
                            с Торгово-промышленной палатой, министерствами, ведомствами, профильными объединениями, 
                            высшими и средними профессиональными учебными заведениями. Деятельность Ассоциации направлена 
                            на развитие металлообрабатывающей отрасли в Российской Федерации, разработке и внедрению 
                            новых технологий металлообработки, созданию условий для выпуска конкурентноспособной 
                            продукции и выходу предприятий участников на международные рынки.
                        </p>
                    </div>

                    <div className="flex"></div>
                    </div>
                </div>

    <main className="main">
    <div className="grid grid-cols-1 lg:grid-cols-2 bg-green-450">
        <div className="hidden md:flex md:justify-center md:pt-4 lg:pt-0 lg:justify-start">
            <img src={photo} alt="" className="object-cover " />
        </div>
        <div className="max-w-xs md:max-w-3xl mx-auto">
            <h1 className="text-white text-xl uppercase py-6 md:py-12 md:text-2xl xl:text-4xl 
            font-bold md:text-center">
                востребованные направления</h1>
            <p className="text-base text-white inline-block md:mx-10 pl-3">
            Среди востребованных направлений Ассоциации можно выделить работу по налаживанию 
            импортозамещения, диверсификации предприятий ОПК, оздоровлению экономического 
            состояния участников, созданию программ развития, спасение предприятий, оказавшихся 
            в кризисном положении (уже в этом 2021 году, силами АМП, участник ассоциации, 
            крупное металлообрабатывающее предприятие машиностроитель, спасено от банкротства, 
            получило финансирование, заказы и надежду на успешное развитие. Подобные истории, 
            неоднократно, имели место и раньше). В деятельности Ассоциации металлообрабатывающих 
            предприятий, особое место занимает работа по загрузке 
            производственных мощностей участников АМП, созданию возможностей 
            для возникновения промышленной кооперации.
            </p> 
        </div>
    </div>
    <section className="max-w-xs md:max-w-3xl xl:max-w-5xl mx-auto ">
        <h1 className="text-green-450 text-xl uppercase py-6 md:py-12 md:text-2xl xl:text-4xl font-bold md:text-center">
            НА НАШЕМ САЙТЕ
        </h1>
        <p className="text-black text-base pb-6 md:pb-12 md:mx-10">
        На площадке https://amp.copartner.ru созданной при поддержке АМП, участники 
        Ассоциации имеют доступ почти к 2000 актуальных чертежей заказов, 
        в том числе, серийных заказов крупных промышленных предприятий. По приблизительной оценке, 
        суммарно размещено заказов более, чем на 6 миллиардов рублей. Субконтрактация происходит 
        напрямую между заказчиком и исполнителем, без посредников. Из тех субконтрактов которые проходили 
        при сопровождении АМП, за последние пол года, известно о 84 взятых заказов, на общую сумму, порядка 
        210 000 000 руб. (не учитывая повторяемость этих же заказов, в случае, если контракт подписан на 
        серийное производство), вместе с тем, ещё больший объём сложившихся при нашем содействии коопераций 
        не фиксируется, поскольку проходит без сопровождения Ассоциации.
        </p>
    </section>
    <section className="max-w-xs md:max-w-3xl xl:max-w-5xl mx-auto">
        <h1 className="text-green-450 text-xl uppercase py-6 md:py-12 md:text-2xl xl:text-4xl font-bold md:text-center">
            ЕЩЕ РЕАЛИЗУЮТСЯ ПРОЕКТЫ
        </h1>
        <ul className="text-black text-base list-disc px-4 pb-6 md:pb-12 md:mx-10">
            <li>
            силами участников АМП, окончено  строительство 
            кислородного завода на предприятии участнике Ассоциации.
            </li>
            <li>
            подписан меморандум об организации производства металлорежущего оборудования для предприятия участника АМП
            </li>
            <li>
            для крупного оборонного предприятия участника Ассоциации, предложен и разработан проект по повышению энергоэффективности 
            (работы по строительству новых электростанций, в рамках проекта, планируется начать в ближайшее время)
            </li>
            <li>
            запущено импортозамещающее металлообрабатывающее производство ТНП, организованы каналы сбыта этой продукции, 
            через крупные федеральные торговые сети.
            </li>
        </ul>
    </section>
    <section className="max-w-xs md:max-w-3xl mx-auto py-6 md:py-12 xl:max-w-5xl">
        <p className="text-black text-base p-4 border border-green-450 inline-block rounded md:mx-10">
        Мы открыты для взаимодействия с новыми участниками, с госструктурами, с лицами заинтересованными 
        в развитии металлообрабатывающей отрасли нашей страны. Мы обращается к федеральным и региональным 
        властям за поддержкой и содействием в налаживании контактов с металлообрабатывающими предприятиями, 
        установлении взаимодействия с представителями власти и руководителями регионов ведомствами и 
        комитетами отвечающими за развитие металлообработки, промышленной кооперации, машиностроения и судостроения.
        </p>
    </section>

</main>
</>
  )
}

export default About