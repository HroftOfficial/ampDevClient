import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NeedsCompany = (props) => {

  return (
    <Body> 

      <div className='header'>
        <div className='title'>Название изделия</div>
        <div className='min'>Потребность</div>
        <div className='max'>Облать применения</div>
      </div>
      
       {/* {initOrders.map((item) => {
        if (item.owner !== props.org?.id) return;
        return ( */}
          <div className='content' key={2}>
            <Link className='title' to={`/orders/1/2`}>title</Link>
            <div className='min'>10 min</div>
            <div className='max'>20 min</div>
          </div>
        {/* ) */}
      {/* })} */}
      
    </Body>
  )
}

export default NeedsCompany;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  padding: 10px 20px 50px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
  font-size: 20px;
  color: #232526;

  .title {
    text-transform: none;
    position: relative;
    margin: 0;
  }

  .red-line {
    display: flex;
    width: 113px;
    height: 6px;
    background-color: #F02938;
    margin-bottom: 24px;
  }

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
    

    :nth-child(even) {
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
