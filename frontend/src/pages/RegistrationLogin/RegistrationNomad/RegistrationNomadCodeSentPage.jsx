import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import Text from "../../../components/Text/Text.jsx";
import Button from "../../../components/Button/Button.jsx";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 20px;
    height: 60vh;
`;


const RegistrationNomadCodeSentPage = () => {
    const navigate = useNavigate();

    const handleNext = () => {
        navigate('/nomad-register-form-first');
    };

    return (

        <Container>

            <Text type={"FormTitle"} label={`A VERIFICATION CODE HAS BEEN SENT TO YOUR EMAIL.`}/>
            <Button onClick={handleNext} label="NEXT"/>

        </Container>
    )
}

export default RegistrationNomadCodeSentPage