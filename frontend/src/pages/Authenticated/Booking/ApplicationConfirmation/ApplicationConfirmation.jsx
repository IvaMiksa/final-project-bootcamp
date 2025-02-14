import React from 'react';
import Button from "../../../../components/Button/Button.jsx";
import {useNavigate} from 'react-router-dom';
import {Container} from './ApplicationConfirmationStyle';
import Text from "../../../../components/Text/Text.jsx";

const ApplicationConfirmation = () => {
    const navigate = useNavigate();


    const handleNavigateToSummary = () => {
        navigate('/nomad-dashboard');
    };

    return (
        <Container>
            <Text label="Application Completed" type="PageTitle"/>
            <Text
                label="        You will receive a contract and an invoice by email. You must return the signed contract within 48 hours or your reservation will be cancelled."
                type="description"/>
            <Text label="You must return the signed contract within 48 hours or your reservation will be cancelled."
                  type="description"/>


            <Button label="See Bookings" onClick={handleNavigateToSummary}/>
        </Container>
    );
};

export default ApplicationConfirmation;
