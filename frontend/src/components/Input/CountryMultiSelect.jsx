import {FaGlobeAmericas} from 'react-icons/fa';
import MultiSelect from './MultiSelect';
import {countries} from '../../utils/propertiesData.js';

const CountryMultiSelect = ({initiallySelectedOptions, onChange}) => {
    return (
        <MultiSelect
            placeholder="Select cities and countries"
            icon={FaGlobeAmericas}
            initiallySelectedOptions={initiallySelectedOptions}
            onChange={onChange}
            options={countries.sort()}
        />
    );
};

export default CountryMultiSelect;