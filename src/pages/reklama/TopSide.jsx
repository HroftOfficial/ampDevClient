import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material";
import { skeletonCost } from "../../utils/skeletonArr";
import config from "../../settings/settings";

const TopAd = ({ reklama, isLoading }) => {
    const navigate = useNavigate();

    const handleAdv = (e) => {
        e.preventDefault();
        const id = e.target.id;
        navigate(`/advertising/${id}`);
    };
    reklama.sort((a, b) => (a.top_place > b.top_place ? 1 : -1));

    return (
        <Body>
            {isLoading ? (
                <>
                    {skeletonCost(3).map((el) => {
                        return (
                            <Skeleton
                                variant="rounded"
                                width={210}
                                height={140}
                                key={el}
                            />
                        );
                    })}
                </>
            ) : (
                <>
                    {reklama?.map((item, index) => {
                        if (item?.enabled === true && item?.top_place !== 0) {
                            return (
                                <div key={index} className="adv">
                                    <img
                                        src={`${config?.baseUrlUpload}/uploads/ad/${item?.preview_url[0]?.filename}`}
                                        alt=""
                                    />
                                    <div
                                        id={item?._id}
                                        className="adv-overlay"
                                        onClick={handleAdv}
                                    >
                                        {item?.overlay}
                                    </div>
                                </div>
                            );
                        }
                    })}
                </>
            )}
        </Body>
    );
};

export default TopAd;

const Body = styled.div`
    display: flex;
    padding: 0 26px;
    gap: 20px;
    justify-content: center;
    margin-top: 20px;

    @media screen and (max-width: 710px) {
        display: none;
    }

    .adv {
        display: flex;
        height: 140px;
        margin-top: 15px;
        position: relative;

        img {
            height: 100%;
            width: 100%;
        }

        .adv-overlay {
            display: flex;
            position: absolute;
            color: white;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #00000028;
            align-items: center;
            justify-content: center;
            text-align: center;
            opacity: 0;
            cursor: pointer;
            font-size: 18px;

            :hover {
                opacity: 1;
            }
        }
    }
`;
