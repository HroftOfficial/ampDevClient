import React from "react";
import styled from "styled-components";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { frb } from "../../utils/frb";

const Sidebar = ({
    stateMeh,
    data,
    value,
    setValue,
    handlerChange,
    isAutofind,
    ...props
}) => {
    const handleClose = () => {
        props.setIsOpenMenu(false);
    };

    let index = [];

    for (let key in stateMeh) {
        if (stateMeh[key] === true) index.push(key);
    }

    return (
        <Modal>
            <FormControl style={{ width: "100%" }}>
                <FormLabel
                    id="controlled-radio-buttons-group"
                    style={{
                        color: "black",
                        fontWeight: 700,
                        fontSize: "1.4rem",
                        paddingLeft: "10px",
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <span>Категории:</span>{" "}
                    <span className="close" onClick={handleClose}>
                        &times;
                    </span>
                </FormLabel>

                <RadioGroup
                    row
                    style={{
                        color: "black",
                        paddingLeft: "10px",
                        display: "flex",
                        flexDirection: "column",
                    }}
                    aria-labelledby="controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={value}
                    onChange={handlerChange}
                >
                    {frb?.map((item) => (
                        <div className="flex w-58 " key={item?.id}>
                            <FormControlLabel
                                disabled={
                                    index?.length > 0 && !isAutofind
                                        ? true
                                        : false
                                }
                                value={item?.value}
                                control={
                                    <Radio
                                        sx={{
                                            color: "#00AEAE",
                                            "&.Mui-checked": {
                                                color: "#00AEAE",
                                            },
                                        }}
                                    />
                                }
                                label={
                                    <div className="flex w-full items-center justify-end pl-1 text-xl ">
                                        <img
                                            className="pr-4 w-18"
                                            src={item?.icon}
                                            alt=""
                                        />{" "}
                                        {item?.name}
                                    </div>
                                }
                            />
                        </div>
                    ))}
                </RadioGroup>
            </FormControl>
        </Modal>
    );
};

export default Sidebar;

const Modal = styled.div`
    background-color: #fefefe;
    margin: auto;
    height: 440px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    z-index: 40;

    @media screen and (max-width: 710px) {
        display: flex;
        padding: 10px;
        box-shadow: none;
    }

    .close {
        color: black;
        float: right;
        font-size: 40px;
        font-weight: bold;
        margin-right: 40px;

        @media screen and (max-width: 710px) {
            margin-right: 0px;
            margin-top: 0px;
        }
        @media screen and (min-width: 710px) {
            display: none;
        }
    }

    .close:hover,
    .close:focus {
        color: #00aeae;
        text-decoration: none;
        cursor: pointer;
    }
`;
