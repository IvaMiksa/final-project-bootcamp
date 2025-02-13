import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';

// Styled Components
const SlideshowCard = styled.div`
  background: linear-gradient(135deg, #4e54c8, #8f94fb);
  color: #fff;
  border-radius: 12px;
  padding: 20px;
  width: 100%;
  max-width: 480px;
  height: 320px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const Title = styled.h2`
  font-size: 20px;
  margin-bottom: 15px;
  color: #ffef82;
`;

const Photo = styled.img`
  width: 100%;
  height: 200px;
  border-radius: 8px;
  object-fit: cover;
`;

const Caption = styled.p`
  font-size: 14px;
  color: #ffef82;
  margin-top: 10px;
`;

// Slideshow Component
const PhotoSlideshow = ({ photos }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <SlideshowCard>
      <Title>Recent Travels</Title>
      <Slider {...settings}>
        {photos.map((photo, index) => (
          <div key={index}>
            <Photo src={photo.url} alt={`Travel photo ${index + 1}`} />
            <Caption>{photo.caption}</Caption>
          </div>
        ))}
      </Slider>
    </SlideshowCard>
  );
};

export default PhotoSlideshow;
