import {useState} from 'react';
import {useSelector} from "react-redux";
import {useNavigate, useLocation, useParams} from 'react-router-dom';
import Text from "../../../../components/Text/Text.jsx";
import Button from '../../../../components/Button/Button.jsx';
import {AxiosInstance} from "../../../../utils/axios.js";
import {CheckboxContainer, CenteredContainer, ErrorMessage} from './ApplicationSummaryStyle';

const ApplicationSummary = () => {
    const navigate = useNavigate();  // Correct use of useNavigate
    const location = useLocation();  // Hook to access state passed from Property page
    const {propertyId} = useParams()
    const {propertyname, totalAmount, startdate, enddate} = location.state || {};  // Destructure state safely
    const accessToken = useSelector(store => store.user.accessToken)
    const [isLoading, setIsLoading] = useState(false)

    const [isChecked, setIsChecked] = useState(false);
    const [errorMessage] = useState('');

    const handleSubmit = () => {
        setIsLoading(true)
        AxiosInstance.post(`property/generate-pdf/${propertyId}/`, {
            start_date: startdate,
            end_date: enddate,
            access_token: "3AAABLblqZhCuJUWzh5jJdcYdy_fgvrrZ_yVbA3aI164NpyzNZuIpYaCNIw2vYcYjGKWsT3IMjzNRN9OxyvIIDWvdzqENeLju"
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    navigate('/application-confirmation');
                }
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                setIsLoading(false)
            })
    };

    return (
        <CenteredContainer>
            <Text label="Application Summary" type="PageTitle"/>
            <Text label={`Property name: ${propertyname || "N/A"}`} type="description"/>
            <Text label={`Dates: ${startdate} to ${enddate}`} type="description"/>
            <Text label={`Price: ${totalAmount || "N/A"}`} type="description"/>

            <CheckboxContainer>
                <Text label="I have read and agree to the terms and conditions " type="description"/>
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                />
            </CheckboxContainer>

            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

            <Button label={`${isLoading ? "Submitting..." : "Submit Application"}`} onClick={handleSubmit}
                    disabled={!isChecked || isLoading}/>
        </CenteredContainer>
    );
};

export default ApplicationSummary;
