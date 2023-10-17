import React from "react";
import doc from '../../img/doc.svg';
import config from "../../settings/settings";

const OrdersBlock = () => {
  return (
    <div
      className="flex flex-col max-w-2xl md:max-w-3xl lg:px-0 
      lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl mx-auto  md:py-16 md:px-10 px-6"
    >
      <div className="flex flex-col text-black">
        <span className="inline-block text-gray-850 text-base md:text-2xl xl:text-4xl font-bold md:py-16 uppercase text-center">
          Как стать членом Ассоциации?
        </span>
      </div>
      <div className="grid grid-cols-1 lg:grid-rows-2 lg:grid-cols-2 gap-6 text-base md:text-xl text-gray-850 md:py-12 py-8">
        <a
          href={`${config?.baseUrlUpload}/uploads/doc/sog.doc`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="flex items-center">
            <span className="px-6">
              <img src={doc} alt="" />
            </span>
            Соглашение кандидата
          </div>
        </a>
        <a
          href={`${config?.baseUrlUpload}/uploads/doc/anketa.docx`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="flex items-center">
            <span className="px-6">
              <img src={doc} alt="" />
            </span>
            Анкета участника
          </div>
        </a>
        <a
          href={`${config?.baseUrlUpload}/uploads/doc/konf.doc`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="flex items-center">
            <span className="px-6">
              <img src={doc} alt="" />
            </span>
            Соглашение о конфидециальности
          </div>
        </a>
        <a
          href={`${config?.baseUrlUpload}/uploads/doc/za.docx`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="flex items-center">
            <span className="px-6">
              <img src={doc} alt="" />
            </span>
            Заявление о вступлении в Ассоциацию
          </div>
        </a>
      </div>
    </div>
  );
};

export default OrdersBlock;
