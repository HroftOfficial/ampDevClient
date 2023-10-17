import React from 'react'

const OfferCard = ({icon, title, text}) => {
  return (
    <div className="flex ">
    <div className="w-1/6 px-2">
      <img src={icon} alt="" />
    </div>
    <div className=" w-5/6 ">
      <p className="font-bold text-2xl pb-4">
        {title}
      </p>
      <p>
        {text}
      </p>
    </div>
  </div>
  )
}

export default OfferCard