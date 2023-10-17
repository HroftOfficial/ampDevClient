import styled from 'styled-components';
import CustomLink from '../../components/CustomLink/CustomLink';


const MenuListMobile = ({ data, setMenu }) => {

    return (
        <>
            {data.map(p =>
                <Container key={p.id}>
                    <CustomLink 
                        className="inline-block no-underline hover:text-green-200" 
                        to={p.url}
                        onClick={()=> setMenu(s => !s)}
                        >
                        {p.title}

                    </CustomLink>
                </Container>
            )}
        </>

    )
};

export default MenuListMobile;

const Container = styled.div`

`;