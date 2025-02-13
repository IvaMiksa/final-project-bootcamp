import {useEffect, useState} from 'react';
import {FaGlobeAmericas} from 'react-icons/fa';
import MultiSelect from './MultiSelect';
import {AxiosInstance} from "../../utils/axios.js";
import {IoLocationOutline} from "react-icons/io5";


const CityCountryMultiSelect = ({initiallySelectedOptions, onChange}) => {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        AxiosInstance.get('/property/')
            .then(res => {
                const properties = res.data;

                // Map to unique "City, Country" strings
                const cityCountryOptions = [
                    ...new Set(
                        properties.map(property => `${property.city}, ${property.country}`)
                    )
                ].sort();

                setOptions(cityCountryOptions);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <MultiSelect
            placeholder="Select cities or countries"
            icon={FaGlobeAmericas}
            initiallySelectedOptions={initiallySelectedOptions}
            onChange={onChange}
            options={options}
            itemIcon={IoLocationOutline}
        />
    );
};

export default CityCountryMultiSelect;
