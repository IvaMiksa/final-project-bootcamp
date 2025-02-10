import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {setHostForm} from "../../../store/slices/generalSlice.js";
import FormComponent from "../../../components/Forms/FormComponent.jsx";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 10px;
    height: 100%;

`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 10px;
`;

const Input = styled.input`
  outline: none;
  border: none;
  border-bottom: 1px solid black;
`;

const RegistrationHostFormFirstPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const hostFormData = useSelector((state) => state.general.hostFormData);

    const handleChange = (e) => {
        const {name, value} = e.target;
        dispatch(setHostForm({field: name, value}));
    };

    const handleNext = (e) => {
        e.preventDefault();
        navigate('/host-register-form-second');
    };

    const fields = [
        {type: "text", placeholder: "Verification code", name: "code", value: hostFormData.code},
        {type: "text", placeholder: "First name", name: "first_name", value: hostFormData.first_name},
        {type: "text", placeholder: "Last name", name: "last_name", value: hostFormData.last_name},
        {type: "text", placeholder: "Username", name: "username", value: hostFormData.username},
        {type: "email", placeholder: "Email", name: "email", value: hostFormData.email},
        {type: "password", placeholder: "Password", name: "password", value: hostFormData.password},
        {type: "password", placeholder: "Re-enter password", name: "passwordRepeat", value: hostFormData.passwordRepeat}
    ];

    return (
        <Container>
            <FormComponent
                fields={fields}
                onChange={handleChange}
                onSubmit={handleNext}
                buttonText="NEXT"
            />
        </Container>
    );
};

export default RegistrationHostFormFirstPage;
