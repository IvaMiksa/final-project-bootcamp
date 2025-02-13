import {FaCity} from 'react-icons/fa';
import MultiSelect from './MultiSelect';
import {cities} from '../../utils/propertiesData.js';

const CityMultiSelect = ({initiallySelectedOptions, onChange}) => {
    return (
        <MultiSelect
            placeholder="Select cities"
            icon={FaCity}
            initiallySelectedOptions={initiallySelectedOptions}
            onChange={onChange}
            options={cities.sort()}
        />
    );
};

export default CityMultiSelect;
