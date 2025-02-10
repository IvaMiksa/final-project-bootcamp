import {useNavigate} from 'react-router-dom';
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

const RegistrationNomadSuccessPage = () => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/login');
    };


    return (
        <Container>
            <Text type={"BigTitle"} label={"CONGRATULATIONS, YOU HAVE NOW REGISTERED WITH NOMADLY!"}/>
            <br/>
            <Button label="GO TO THE LOGIN PAGE" onClick={handleRedirect}/>
        </Container>
    );
};

export default RegistrationNomadSuccessPage;
