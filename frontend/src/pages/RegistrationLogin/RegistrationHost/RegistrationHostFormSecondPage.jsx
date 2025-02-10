import {useNavigate} from 'react-router-dom';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {setHostForm} from "../../../store/slices/generalSlice.js";
import InputField from "../../../components/Input/Input.jsx";
import Button from "../../../components/Button/Button.jsx";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-top: 30px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    text-align: center;
    width: 100%;
    max-width: 400px;
`;

const RegistrationHostFormSecondPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const hostFormData = useSelector((state) => state.general.hostFormData);

    const handleChange = (e) => {
        const {name, value} = e.target;
        dispatch(setHostForm({field: name, value}));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const combinedData = {...hostFormData};

        try {
            const response = await fetch("http://127.0.0.1:8000/backend/api/users/auth/registration/validate/host/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(combinedData),
            });

            const data = await response.json();
            console.log("Submission Success:", data);


            navigate('/host-register-success');
        } catch (error) {
            console.error("Registration error:", error);
        }
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <InputField
                    placeholder="Street Name"
                    type="text"
                    name="streetName"
                    value={hostFormData.streetName}
                    onChange={handleChange}
                />
                <InputField
                    placeholder="House Number"
                    type="text"
                    name="houseNumber"
                    value={hostFormData.houseNumber}
                    onChange={handleChange}
                />
                <InputField
                    placeholder="City"
                    type="text"
                    name="city"
                    value={hostFormData.city}
                    onChange={handleChange}
                />
                <InputField
                    placeholder="Postcode / ZIP"
                    type="text"
                    name="postcode"
                    value={hostFormData.postcode}
                    onChange={handleChange}
                />
                <InputField
                    placeholder="Country"
                    type="text"
                    name="country"
                    value={hostFormData.country}
                    onChange={handleChange}
                />
                <Button type="submit" label="Submit"/>
            </Form>
        </Container>
    );
};

export default RegistrationHostFormSecondPage;
