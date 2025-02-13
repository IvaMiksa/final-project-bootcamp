// Filter.jsx
import React, {useState} from 'react';
import styled from 'styled-components';

const FiltersWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    background-color: #f5f5f5;
    padding: 1rem;
    border-radius: 8px;
`;

const Label = styled.label`
    font-size: ${(p) => p.theme.fontSizes.base};
    font-weight: bold;
    color: ${(p) => p.theme.colors.gray};
`;

const Dropdown = styled.select`
    padding: 0.5rem;
    font-size: ${(p) => p.theme.fontSizes.base};
    border-radius: 5px;
    border: 1px solid ${(p) => p.theme.colors.gray};
    width: 100%;
`;

const CheckboxGroup = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
`;

const Checkbox = styled.input`
    margin-right: 0.5rem;
`;

const SliderWrapper = styled.div`
    width: 100%;
    margin-top: 1rem;
`;

const RangeLabel = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    font-size: ${(p) => p.theme.fontSizes.base};
    color: ${(p) => p.theme.colors.gray};
`;

const Slider = styled.input`
    width: 100%;
    appearance: none;
    height: 6px;
    background: #ddd;
    border-radius: 5px;
    outline: none;
    opacity: 0.7;
    transition: opacity 0.2s ease-in-out;

    &:focus {
        outline: none;
    }

    &::-webkit-slider-thumb {
        appearance: none;
        width: 20px;
        height: 20px;
        background: ${(p) => p.theme.colors.blue};
        border-radius: 50%;
        cursor: pointer;
    }

    &::-moz-range-thumb {
        width: 20px;
        height: 20px;
        background: ${(p) => p.theme.colors.blue};
        border-radius: 50%;
        cursor: pointer;
    }
`;

const PriceRangeSlider = ({value, onChange}) => {
    const [localValue, setLocalValue] = useState(value);

    const handleSliderChange = (e) => {
        const newValue = [parseInt(e.target.value[0]), parseInt(e.target.value[1])];
        setLocalValue(newValue);
        onChange(newValue);
    };

    return (
        <SliderWrapper>
            <RangeLabel>
                <span>Price: {localValue[0]} - {localValue[1]}</span>
            </RangeLabel>
            <Slider
                type="range"
                min="10"
                max="200"
                value={localValue}
                onChange={handleSliderChange}
                step="1"
                multiple
            />
        </SliderWrapper>
    );
};

const FilterDropdown = ({onApplyFilters, onResetFilters}) => {
    const [priceRange, setPriceRange] = useState([10, 200]);
    const [propertyType, setPropertyType] = useState('');
    const [amenities, setAmenities] = useState([]);

    const handlePriceChange = (newRange) => {
        setPriceRange(newRange);
    };

    const handlePropertyTypeChange = (e) => {
        setPropertyType(e.target.value);
    };

    const handleAmenitiesChange = (e) => {
        const {value, checked} = e.target;
        setAmenities((prevAmenities) =>
            checked ? [...prevAmenities, value] : prevAmenities.filter((amenity) => amenity !== value)
        );
    };

    const handleApply = () => {
        onApplyFilters(priceRange, propertyType, amenities);
    };

    const handleReset = () => {
        setPriceRange([10, 200]);
        setPropertyType('');
        setAmenities([]);
        onResetFilters();
    };

    return (
        <FiltersWrapper>
            {/* Price Range */}
            <div>
                <Label>Price Range</Label>
                <PriceRangeSlider value={priceRange} onChange={handlePriceChange}/>
            </div>

            {/* Property Type */}
            <div>
                <Label>Property Type</Label>
                <Dropdown value={propertyType} onChange={handlePropertyTypeChange}>
                    <option value="">Select Property Type</option>
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="studio">Studio</option>
                </Dropdown>
            </div>

            {/* Amenities */}
            <div>
                <Label>Amenities</Label>
                <CheckboxGroup>
                    <div>
                        <Checkbox
                            type="checkbox"
                            value="wifi"
                            onChange={handleAmenitiesChange}
                        />
                        <span>WiFi</span>
                    </div>
                    <div>
                        <Checkbox
                            type="checkbox"
                            value="pool"
                            onChange={handleAmenitiesChange}
                        />
                        <span>Pool</span>
                    </div>
                    {/* Add more amenities as needed */}
                </CheckboxGroup>
            </div>

            {/* Apply/Reset Buttons */}
            <div>
                <button onClick={handleApply}>Apply Filters</button>
                <button onClick={handleReset}>Reset Filters</button>
            </div>
        </FiltersWrapper>
    );
};

export default FilterDropdown;
