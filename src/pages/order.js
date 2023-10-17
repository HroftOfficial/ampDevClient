import React from 'react';
import {observer} from "mobx-react-lite";
import Layout from '../components/UI/layout/Layout';


const Order = () => {
    return(
<Layout>
           <div className="flex flex-col max-w-2xl md:max-w-3xl lg:px-0 
            lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl mx-auto">
            <div className="flex flex-col md:py-16 md:px-10 px-6">
                <span className="inline-block text-gray-850 text-base md:text-2xl xl:text-4xl font-bold py-6">
                    ЧАСТЫЕ ВОПРОСЫ
                </span>
                <p className="text-gray-550 inline-block text-base md:text-xl">
                    Кто может стать участником Ассоциации?
                </p>
            </div>
        </div>
            <div className="bg-gray-100 py-4">
                <div className="flex flex-col max-w-2xl md:max-w-3xl lg:px-0 
                lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl mx-auto">
                <span className="inline-block text-green-450 text-base md:text-xl font-bold py-4 md:px-10 px-6">
                    Мое предприятие лишь косвенным образом имеет отношение к металлообрабатывающей отрасли. Могу ли я стать вашим участником?
                </span>
                <p className="text-gray-550 inline-block text-base md:text-xl md:px-10 px-6">
                    Безусловно! Нам только нужно будет разобраться, 
                    насколько наше с вами сотрудничество будет взаимовыгодным. Для этого важно уточнить Ваши потребности.
                </p>
            </div>
        </div>

            <div className="flex flex-col max-w-2xl md:max-w-3xl lg:px-0 
            lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl mx-auto  md:py-16 md:px-10 px-6">
            <div className="flex flex-col py-10">
                <span className="inline-block text-gray-850 text-base md:text-xl">
                    Как стать членом Ассоциации?
                </span>
            </div>

            <div className="flex flex-col text-black">
                <span className="inline-block text-gray-850 text-base md:text-2xl xl:text-4xl font-bold md:py-16 uppercase">
                    ВАЖНЫЕ ДОКУМЕНТЫ
                </span>
            </div>
                <div className="grid grid-cols-1 lg:grid-rows-2 lg:grid-cols-2 gap-6 text-base md:text-xl text-gray-850 md:py-12 py-8">
                    <div className="flex items-center">
                        <span className="px-6"><img src="/img/doc.svg" alt=""/></span> 
                        Соглашение кандидата.pdf
                     </div>
                     <div className="flex items-center">
                        <span className="px-6"><img src="/img/doc.svg" alt=""/></span> 
                        Анкета участника.pdf
                    </div>
                    <div className="flex items-center">
                        <span className="px-6"><img src="/img/doc.svg" alt=""/></span> 
                        Соглашение о конфидециальности.pdf
                    </div>
                    <div className="flex items-center">
                        <span className="px-6"><img src="/img/doc.svg" alt=""/></span> 
                        Заявление о вступлении в Ассоциацию.doc
                    </div>
                </div>
      
  

            <div className="flex justify-between items-center text-green-450 md:py-10 flex-wrap space-y-4 px-6">
                <div className="font-bold text-base md:text-xl lg:text-2xl">Все вопросы по телефону:</div>
                <div className="font-bold text-lg lg:text-2xl md:text-base flex justify-center items-center">
                    <span className="inline-block pr-2">
                        <img src="/img/phone2.svg" alt="" className="w-5 lg:w-8"/>
                    </span>
                    +7 (863) 204-22-00
                </div>
                <div className="font-bold text-lg md:text-base lg:text-2xl flex justify-center items-center">
                    <span className="inline-block pr-2">
                        <img src="/img/phone2.svg" alt="" className="w-5 lg:w-8"/>
                    </span>
                    +7 (928) 966-08-48
                </div>
                </div>

            <div className="flex text-gray-850 text-base md:text-2xl xl:text-4xl font-bold py-16 self-end">Рады партнерству и сотрудничеству!</div>
            </div>
            </Layout>
    )
};

export default observer(Order);
