import React, {useState} from "react";
import styled from "styled-components";
import FormLabel from "@mui/material/FormLabel";
import { Checkbox } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';

const SidebarMech = ({ data, selected, setSelected, setIsOpenMenu }) => {
  const [insideArray, setInsideArray] = useState(selected)

  const handleClose = () => {
    setIsOpenMenu(false)
  }

  const handleCheck = (e) => {
    e.stopPropagation()
    const id = e.target.id;

    if (!insideArray.includes(id)) {
      setInsideArray(insideArray => ([...insideArray, id]))
    } else {
    
      const temp = insideArray.slice()
      const index = temp.indexOf(id)
      temp.splice(index, 1)
      // props.setSelected(temp)
      setInsideArray(temp)
      // console.log('setSelected >> - ', id)
    }

  }

  const handleSubmite = async (e) => {
    e.preventDefault();

    if (setSelected) setSelected(selected)

    setSelected(insideArray)
    setIsOpenMenu(false)
  }
  

  return (
    <ModalContent>

      <FormLabel
        id="  controlled-radio-buttons-group"
        style={{ color: "black", fontWeight: 700, fontSize: "1.4rem", padding:'30px 0px 5px 0px' }}
      >Поиск предприятий по видам механической обработки:
        <span className="close" onClick={handleClose}>&times;</span>
      </FormLabel>

        <ModalBody>
          {data?.map((item) => item && item?._id?.id && item?._id?.name && item?.count && (
              <FormControlLabel
              className="width100"
              key={item?._id?.id}
              control={
                <Checkbox onChange={handleCheck} id={item?._id?.id} defaultChecked={selected.includes(item?._id?.id) ?  true : false} />
              }
              label={<div className="font-semibold">{item?._id.name} ({item?.count})</div>}
              />
          ))}

        </ModalBody>
        <button onClick={handleSubmite}>Применить</button>
    </ModalContent>
  );
};

export default SidebarMech;


const ModalContent = styled.div`
  position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 55px 79px;
  width: 85%;
  height: auto;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
  animation-name: animatetop;
  animation-duration: 0.4s;
  z-index: 51;

  @media screen and (max-width: 1024px) {
    padding: 35px 59px;
  }

  @media screen and (max-width: 768px) {
    padding: 25px 20px;
  }

  @-webkit-keyframes animatetop {
    from {left:-300px; opacity:0} 
    to {left:0; opacity:1}
  }

  @keyframes animatetop {
    from {left:-300px; opacity:0}
    to {left:0; opacity:1}
  }

  .close {
    color: black;
    float: right;
    font-size: 40px;
    font-weight: bold;
    margin-right: 40px;
    @media screen and (max-width: 768px) {
      margin-right: -4px;
      margin-top: -10px;
    }
  }

  .close:hover,
  .close:focus {
    color: #00AEAE;
    text-decoration: none;
    cursor: pointer;
  }

  button {
    display: flex;
    padding: 15px 35px;
    margin: 0 auto;
    background: #00AEAE;
    border-radius: 5px;
    margin-top: 25px;
    cursor: pointer;

    font-family: 'Ubuntu', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 28px;
    text-align: center;
    color: #FFFFFF;
  }
`;

const ModalBody = styled.div`
  margin-top: 30px;
  column-count: 3;
  text-align: left;
  color: black;
  /* z-index: 50; */

  .width100 {
    width: 100%;

  }

  @media screen and (max-width: 1024px) {
    column-count: 2;
  }

  @media screen and (max-width: 768px) {
    column-count: 1;
  }
`;
