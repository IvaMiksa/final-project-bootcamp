import React from 'react';
import styled from 'styled-components';

// Styled Components
const WelcomeContainer = styled.div`
  background-color: #ffffff;
  color: #333;
  border-radius: 12px;
  padding: 20px;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease-in-out;
  font-family: 'Arial', sans-serif;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }
`;

const Greeting = styled.p`
  font-size: 24px;
  margin: 0 0 8px;
  font-weight: 600;
  color: #115191;
  background: -webkit-linear-gradient(45deg, #115191, #a2c1d8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: fadeIn 1s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const NextDestinationTitle = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin: 8px 0;
  color: #333;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

const Destination = styled.p`
  font-size: 20px;
  color: #115191;
  margin: 5px 0 15px;
  font-weight: 700;
  animation: slideIn 1.2s ease-in-out;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const PropertyImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 200px;
  border-radius: 12px;
  object-fit: cover;
  margin-top: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }
`;

const WelcomeCard = ({ currentUser, currentDestination, nextDestination, propertyImage }) => {
  return (
    <WelcomeContainer>
      <Greeting>Welcome, {currentUser} 🖐</Greeting>
      <NextDestinationTitle>6 days left until your next adventure</NextDestinationTitle>
      <Destination>{nextDestination}</Destination>
      {propertyImage && <PropertyImage src={propertyImage} alt="Next destination property" />}
    </WelcomeContainer>
  );
};

export default WelcomeCard;
