import { Link } from "react-router-dom";
import styled from "styled-components";

const NewsMain = ({id,img, title}) => {
    return(
        <Link to={id}>
        {/* <NewsCard className="max-w-sm rounded overflow-hidden shadow-lg mx-auto py-4 px-6 h-full"> */}
        <NewsCard >
            <img src={img} alt="news" className="object-contain h-56 w-auto"/>
            <div className="px-6 pb-4">
                <div className="font-bold text-xl mb-2"></div>
                <p className="text-gray-850 text-base truncate">
                    {title}
                </p>
            </div>
                {/* <div className="px-6 pt-4 pb-2 flex justify-between">
                    <span className="inline-block px-3 py-1 text-base text-gray-550 mr-2 mb-2">#наши_партнеры</span>
                    <span className="inline-block px-3 py-1 text-base text-gray-550 mr-2 mb-2">22.02.2021</span>
                </div> */}
            </NewsCard>
        </Link>
    )
};

export default NewsMain;

const NewsCard = styled.div`
    display: flex;
    flex-direction: column;
    width: 400px;
    box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);

    @media screen and (max-width: 460px) {
        width: 290px;
    }
`;
