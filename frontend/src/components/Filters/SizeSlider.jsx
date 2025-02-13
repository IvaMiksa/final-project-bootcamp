import React, { useState } from "react";
import styled from "styled-components";
import ReactSlider from "react-slider";

const StyledSliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px; /* Set to your desired width */
  margin-bottom: ${(p) => p.theme.spaces.base};
`;

const StyledSlider = styled(ReactSlider)`
  width: 100%;
  height: 0.25rem;
  background-color: ${(p) => p.theme.colors.grayLight};
`;

const StyledThumb = styled.div`
  height: 1rem;
  width: 1rem;
  background-color: ${(p) => p.theme.colors.blue};
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  position: relative;
  top: 50%;
  transform: translateY(-50%);
`;

const StyledTrack = styled.div`
  background-color: ${(p) => p.theme.colors.blue};
  height: 0.25rem;
`;

const SizeRangeText = styled.div`
  margin-top: 16px; /* Adjusted space from slider to text */
`;

const SizeSlider = ({ minSize = 0, maxSize = 250, onChange }) => {
  const [values, setValues] = useState([minSize, maxSize]);

  const handleChange = (newValues) => {
    setValues(newValues);
    if (onChange) {
      onChange(newValues);
    }
  };

  return (
    <StyledSliderContainer>
      <StyledSlider
        min={minSize}
        max={maxSize}
        value={values}
        onChange={handleChange}
        renderTrack={(props, state) => <StyledTrack {...props} />}
        renderThumb={(props) => <StyledThumb {...props} />}
      />
      <SizeRangeText>
        Size Range: {values[0]} - {values[1]} sqm
      </SizeRangeText>
    </StyledSliderContainer>
  );
};

export default SizeSlider;
