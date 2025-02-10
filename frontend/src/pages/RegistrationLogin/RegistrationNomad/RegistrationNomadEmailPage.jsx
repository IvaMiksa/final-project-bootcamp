import {useState} from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import Button from "../../../components/Button/Button.jsx";
import InputField from "../../../components/Input/Input.jsx";
import {AxiosInstance} from "../../../utils/axios.js";
import {toast} from "react-toastify";


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 20px;
    height: 60vh;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 20px;

`;


const RegistrationNomadEmailPage = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const [errorEmail, setErrorEmail] = useState(null);

    const handleRegisterNext = async (event) => {
        event.preventDefault();

        try {
            const response = await AxiosInstance.post("/users/auth/registration/", { email });
            const data = response.data;
            console.log(data);

            // Navigate if email sent successfully
            if (data.message === "Validation code sent.") {
                navigate('/nomad-code-sent');
            } else {
                toast.error("Failed to send email. Please try again.");
            }
        } catch (error) {
            if (error.response && error.response.data) {
                const data = error.response.data;

                if (data.email) {
                    setErrorEmail(`Email Error: ${data.email}`);
                    toast.error(`Email Error: ${data.email}`);
                } else if (data.detail) {
                    setErrorEmail(`Error: ${data.detail}`);
                    toast.error(`Error: ${data.detail}`);
                }
            } else {
                setErrorEmail("An unexpected error occurred. Please try again.");
                toast.error("An unexpected error occurred. Please try again.");
            }
            console.error("Registration error:", error);
        }
    };


    return (
        <Container>
            <Form action="#" method="post" onSubmit={handleRegisterNext}>
                <div>
                    <InputField
                        iconPath="/svgs/user_icon.svg"
                        type="email"
                        placeholder="EMAIL"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    {errorEmail && <p>{errorEmail}</p>}
                </div>
                <Button type="submit" label="Next"/>
            </Form>
        </Container>
    );
}

export default RegistrationNomadEmailPage;

