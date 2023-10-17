import { Link } from 'react-router-dom';
import styled from 'styled-components';


const CatalogCompany = (props) => {

  return (
    <Body> 
      <div className='header'>
        <div className='title'>Название изделия</div>
        <div className='min'>Минимальный объем поставки</div>
        <div className='max'>Максимальный объем поставки</div>
      </div>
      
      {/* {initProducts.map((item) => {
        if (item.owner !== props.org?.id) return;
        return ( */}
          <div className='content' key={1}>
            <Link className='title' to={`/products/1/2`}>title</Link>
            <div className='min'>10 min</div>
            <div className='max'>20 max</div>
          </div>
        {/* ) */}
      {/* })} */}
      
    </Body>
  )
}

export default CatalogCompany;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  padding: 10px 20px 50px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
  font-size: 20px;
  color: #232526;

  .header {
    display: flex;
    justify-content: space-around;
    width: 100%;
    font-weight: 600;
    border-bottom: 1px #EAEEF1 solid;

    .title {
      text-align: center;
      width: 50%;
    }

    .min {
      text-align: center;
      width: 25%;
    }

    .max {
      text-align: center;
      width: 25%;
    }
  }

  .content {
    display: flex;
    justify-content: space-around;
    width: 100%;
    /* height: 35px; */
    font-size: 18px;
    align-items: center;
    /* margin-top: 15px; */
    padding: 6px;
    

    :nth-child(odd) {
      background: #EAEEF1;
    }

    .title {
      text-align: start;
      width: 50%;
      color: #232526;
    }

    .min {
      text-align: center;
      width: 25%;
    }

    .max {
      text-align: center;
      width: 25%;
    }
  }

`;
