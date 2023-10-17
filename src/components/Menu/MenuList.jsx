import { NavLink } from "react-router-dom";
import styled from "styled-components";
import CustomLink from "../CustomLink/CustomLink";


const MenuList = ({data}) => {
    return(
      <List>
      {data.map(p=>
        <div key={p.id}>
            <CustomLink className="link" to={p.url}>
            {p.title}
            </CustomLink>
        </div>
        )}
    </List>
    )
};

export default MenuList;

const List = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;

    .link {
        display: flex;
    }

    @media screen and (max-width: 1300px) {
        flex-wrap: wrap;
        gap: 20px;
    }

    @media screen and (max-width: 550px) {
        flex-wrap: wrap;
        gap: 10px;
        font-size: 14px;

    }
`;

