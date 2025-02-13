import styled from "styled-components";
import {useState} from "react";

const StyledSortContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: ${(p) => p.theme.spaces.base};
    width: ${(p) => p.theme.spaces.bigger};
`;

const StyledLabel = styled.label`
    font-size: ${(p) => p.theme.fontSizes.base};
    color: ${(p) => p.theme.colors.gray};
    margin-bottom: ${(p) => p.theme.spaces.xs};
`;

const StyledSelectWrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 1.05rem ${(p) => p.theme.spaces.base};
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
    width: 100%;
    border-bottom: 1px solid #000;
    border-radius: 0;
    cursor: pointer;
    position: relative;

    &:focus-within {
        border-color: ${(p) => p.theme.colors.blue};
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }

    
    &::after {
        content: "▼";
        position: absolute;
        right: ${(p) => p.theme.spaces.base};
        font-size: ${(p) => p.theme.fontSizes.xs};
        color: ${(p) => p.theme.colors.gray};
        pointer-events: none;
    }
`;

const StyledSelectedOption = styled.div`
    width: 100%;
    background-color: transparent;
    font-size: ${(p) => p.theme.fontSizes.base};
`;

const StyledDropdownMenu = styled.ul`
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    max-height: 150px;
    overflow-y: auto;
    background-color: ${(p) => p.theme.colors.white};
    border: 1px solid ${(p) => p.theme.colors.gray};
    border-radius: ${(p) => p.theme.borderRadius.sm};
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
    z-index: 10;
    margin: 0;
    padding: 0;
    list-style: none;
`;

const StyledDropdownOption = styled.li`
    padding: 0.5rem ${(p) => p.theme.spaces.base};
    cursor: pointer;
    font-size: ${(p) => p.theme.fontSizes.base};
    color: ${(p) => p.theme.colors.gray};
    &:hover {
        background-color: ${(p) => p.theme.colors.lightGray};
    }
`;

const SortDropdown = ({value, onChange, label}) => {
    const [isOpen, setIsOpen] = useState(false);
    const options = [
        {value: "priceHighToLow", label: "Price: High to Low"},
        {value: "priceLowToHigh", label: "Price: Low to High"},
        {value: "ratingHighToLow", label: "Rating: High to Low"},
        {value: "ratingLowToHigh", label: "Rating: Low to High"},
    ];

    const handleOptionClick = (optionValue) => {
        onChange({target: {value: optionValue}});
        setIsOpen(false);
    };

    const selectedOption = options.find((option) => option.value === value)?.label;

    return (
        <StyledSortContainer>
            {label && <StyledLabel>{label}</StyledLabel>}
            <StyledSelectWrapper onClick={() => setIsOpen(!isOpen)} tabIndex={0}>
                <StyledSelectedOption>{selectedOption || "Select an option"}</StyledSelectedOption>
                {isOpen && (
                    <StyledDropdownMenu>
                        {options.map((option) => (
                            <StyledDropdownOption
                                key={option.value}
                                onClick={() => handleOptionClick(option.value)}
                            >
                                {option.label}
                            </StyledDropdownOption>
                        ))}
                    </StyledDropdownMenu>
                )}
            </StyledSelectWrapper>
        </StyledSortContainer>
    );
};

export default SortDropdown;
