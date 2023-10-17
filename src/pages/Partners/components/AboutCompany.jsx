import styled from 'styled-components';

const AboutCompany = (props) => {

  return (
    <Body> 
      <div className='info-block'>
        <h3 className='info__title'>Сведения о предприятии</h3>
        <div className='aqua-line'/>
        <div className='info-item'><b>Наименование предприятия:</b> {props.user?.org}</div>
        {/* <div className='info-item'><b>Сокращенное:</b> {props.org?.title}</div> */}
        {/* <div className='info-item'><b>Тип предприятия:</b> {props.org?.type}</div> */}
        <div className='info-item'><b>ОГРН:</b> {props.user?.ogrn || 'ogrn'}</div>
        <div className='info-item'><b>ИНН:</b> {props.user?.inn || 'inn'}</div>
        {/* <div className='info-item'><b>КПП:</b> {props.org?.kpp}</div> */}
        {/* <div className='info-item'><b>Рейтинг предприятия:</b> {props.org?.rating}</div> */}
        <div className='info-item'><b>Описание:</b> {props.user?.description}</div>
        <div className='info-item'><b>Информация:</b> {props.user?.information}</div>
      </div>

      <div className='gray-line'/>

      {/* <div className='info-block'> */}
        {/* <h3 className='info__title'>Отрасль</h3> */}
        {/* <div className='red-line'/> */}
        {/* <div className='info-item'><b>ОКВЭД 2:</b> {props.org?.okved}</div> */}
        {/* <div className='info-item'><b>Отрасль из справочника отраслей ГИПС:</b> {props.org?.otrasle}</div> */}
      {/* </div> */}
      
      {/* <div className='gray-line'/> */}

      <div className='info-block'>
        <h3 className='info__title'>Контактные данные</h3>
        <div className='aqua-line'/>
        {/* <div className='info-item'><b>Страна:</b> {props.org?.country}</div> */}
        <div className='info-item'><b>Регион:</b> {props.user?.region || 'регион'}</div>
        <div className='info-item'><b>Город:</b> {props.user?.cities}</div>
        {/* <div className='info-item'><b>Адрес:</b> {props.org?.address}</div> */}
        {/* <div className='info-item'><b>Индекс:</b> {props.org?.index}</div> */}
        {/* <div className='info-item'><b>Телефон организации:</b> {props.org?.org_phone}</div> */}
        <div className='info-item'><b>Email:</b> {props.user?.email}</div>
        <div className='info-item'><b>Сайт:</b> {props.user?.html__href}</div>
        <div className='info-item'><b>ФИО:</b> {props.user?.name}</div>
        {/* <div className='info-item'><b>Должность контактного лица:</b> {props.org?.position}</div> */}
        {/* <div className='info-item'><b>Телефон контактного лица:</b> {props.org?.fio_phone}</div> */}
      </div>
      
    </Body>
  )
}

export default AboutCompany;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  padding: 10px 20px 50px;

  .info-block {
    display: flex;
    flex-direction: column;

    .info__title {
      margin: 0;
      font-weight: 700;
      font-size: 24px;
      line-height: 54px;
      /* text-transform: uppercase; */
      color: #232526;
    }

    .aqua-line {
      display: flex;
      width: 113px;
      height: 6px;
      background-color: #00AEAE;
      margin-bottom: 24px;
    }

    .info-item {
      font-size: 18px;
      color: #3B3F44;
      margin-bottom: 12px;
    }
  }

  .gray-line {
    display: flex;
    height: 1px;
    width: 100%;
    background: #EAEEF1;
    margin: 20px 0 12px;
  }
`;
