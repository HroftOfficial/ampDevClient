import Slider from "react-slick";
import "./slick.css";
import styled from "styled-components";


const MSlider = ({ countGroup }) => {
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };
  return (
    <Container>
      <Slider {...settings}>
        {countGroup?.category?.map((p, index) => (
          <div key={index}>
              {p?._id?.name} ({p?.count})
          </div>
        ))}
      </Slider>
    </Container>
  );
};

export default MSlider;

const Container = styled.div`
  color: white;
  text-align: center;
  padding: 16px 0;
  width: 15rem; 
  font-size: 21px;
  font-weight: 500;
  margin: 0 auto;
  cursor:grab;

  @media screen and (max-width: 480px) {
    width: 11rem; 
    font-weight: 500;
    font-size: 13px;
    line-height: 15px;
  }
  @media screen and (max-width: 600px) {

    font-size: 16px;
  }
`;
