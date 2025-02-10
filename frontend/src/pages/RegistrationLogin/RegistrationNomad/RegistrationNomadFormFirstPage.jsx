import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {setNomadForm} from "../../../store/slices/generalSlice.js";
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

const RegistrationNomadFormFirstPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const nomadFormData = useSelector((state) => state.general.nomadFormData);

    const handleChange = (e) => {
        const {name, value} = e.target;
        dispatch(setNomadForm({field: name, value}));
    };

    const handleNext = (e) => {
        e.preventDefault();
        navigate('/nomad-register-form-second');
    };

    const fields = [
        {type: "text", placeholder: "Verification code", name: "code", value: nomadFormData.code},
        {type: "text", placeholder: "First name", name: "first_name", value: nomadFormData.first_name},
        {type: "text", placeholder: "Last name", name: "last_name", value: nomadFormData.last_name},
        {type: "text", placeholder: "Username", name: "username", value: nomadFormData.username},
        {type: "email", placeholder: "Email", name: "email", value: nomadFormData.email},
        {type: "password", placeholder: "Password", name: "password", value: nomadFormData.password},
        {
            type: "password",
            placeholder: "Re-enter password",
            name: "passwordRepeat",
            value: nomadFormData.passwordRepeat
        }
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

export default RegistrationNomadFormFirstPage;
