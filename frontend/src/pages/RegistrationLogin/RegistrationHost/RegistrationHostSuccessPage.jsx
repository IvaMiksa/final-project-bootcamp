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

const RegistrationHostSuccessPage = () => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/login');
    };


    return (
        <Container>
            <Text type={"BigTitle"} label={"Congratulations, you have now registered with Nomadly!"}/>
            <br/>
            <Button label="Go to the login page" onClick={handleRedirect}/>
        </Container>
    );
};

export default RegistrationHostSuccessPage;
