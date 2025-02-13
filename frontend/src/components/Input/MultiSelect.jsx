import {useEffect, useState, useRef} from 'react';
import {
    StyledLabel,
    StyledIcon,
    StyledTextFieldWrapper,
    StyledTextFieldContainer
} from "./InputStyle.js";
import styled from "styled-components";
import {FaCheck, FaTimes} from 'react-icons/fa';

const DropdownContainer = styled.div`
    position: relative;
`;

const DropdownList = styled.ul`
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: white;
    border: 1px solid #ccc;
    border-top: none;
    max-height: 200px;
    overflow-y: auto;
    list-style-type: none;
    padding: 0;
    margin: 0;
    z-index: 1000;
`;

const DropdownItem = styled.li`
    padding: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;

    &:hover {
        background-color: #e0e0e0;
    }

    ${props => props.selected && `
    background-color: #f0f0f0;
  `}
`;

const CheckIcon = styled(FaCheck)`
    margin-right: 8px;
    color: #2196f3;
    background-color: transparent;
    visibility: ${({visible}) => (visible ? 'visible' : 'hidden')};
`;

const MultiSelectContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    min-height: 36px;
    padding: 8px;
    border-radius: 4px;
    overflow-y: auto;
    max-height: 100px;
    cursor: pointer;
`;

const SelectedOption = styled.span`
    display: flex;
    align-items: center;
    background-color: #e0e0e0;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.9em;
    color: #333;
    margin-right: 4px;
`;

const RemoveIcon = styled(FaTimes)`
    margin-left: 4px;
    cursor: pointer;
    color: #666;
    background-color: transparent;

    &:hover {
        color: #333;
    }
`;

const IconWrapper = styled.div`
    display: flex;
    align-items: flex-start;
`;

const FilterInput = styled.input`
    border: none;
    outline: none;
    padding: 8px;
    width: 100%;
    box-sizing: border-box;
    font-size: 1rem;
    border-bottom: 1px solid #ccc;
`;

const Placeholder = styled.span`
    color: #999;
`;

const MultiSelect = ({
                         label,
                         placeholder,
                         icon: Icon,
                         onChange,
                         options,
                         initiallySelectedOptions = [],
                         itemIcon: ItemIcon
                     }) => {
    const [selectedOptions, setSelectedOptions] = useState(initiallySelectedOptions);
    const [isOpen, setIsOpen] = useState(false);
    const [filterText, setFilterText] = useState('');
    const dropdownRef = useRef(null);
    const filterInputRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleOption = (option) => {
        const updatedSelection = selectedOptions.includes(option)
            ? selectedOptions.filter(item => item !== option)
            : [...selectedOptions, option];
        setSelectedOptions(updatedSelection);
        onChange(updatedSelection);
        setFilterText('');
    };

    const handleFilterChange = (event) => setFilterText(event.target.value);

    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(filterText.toLowerCase())
    );

    useEffect(() => {
        if (isOpen && filterInputRef.current) {
            filterInputRef.current.focus();
        }
    }, [isOpen]);

    return (
        <StyledTextFieldContainer>
            {label && <StyledLabel>{label}</StyledLabel>}
            <DropdownContainer ref={dropdownRef}>
                <StyledTextFieldWrapper onClick={() => setIsOpen(!isOpen)}>
                    {Icon && (
                        <IconWrapper>
                            <StyledIcon as={Icon}/>
                        </IconWrapper>
                    )}
                    <MultiSelectContainer>
                        {selectedOptions.map((option, index) => (
                            <SelectedOption key={index}>
                                {option}
                                <RemoveIcon onClick={() => toggleOption(option)}/>
                            </SelectedOption>
                        ))}
                        {selectedOptions.length === 0 && <Placeholder>{placeholder}</Placeholder>}
                    </MultiSelectContainer>
                </StyledTextFieldWrapper>
                {isOpen && (
                    <DropdownList>
                        <li>
                            <FilterInput
                                ref={filterInputRef}
                                type="text"
                                placeholder="Type to filter..."
                                value={filterText}
                                onChange={handleFilterChange}
                            />
                        </li>
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option, index) => (
                                <DropdownItem
                                    key={index}
                                    onClick={() => toggleOption(option)}
                                    selected={selectedOptions.includes(option)}
                                >
                                    <ItemIcon style={{marginRight: 8, backgroundColor: "transparent"}}/>
                                    {option}
                                </DropdownItem>
                            ))
                        ) : (
                            <li style={{padding: '8px', color: '#999'}}>No options found</li>
                        )}
                    </DropdownList>
                )}
            </DropdownContainer>
        </StyledTextFieldContainer>
    );
};

export default MultiSelect;
