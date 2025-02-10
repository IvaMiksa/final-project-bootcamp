import {useState} from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import Button from "../../../components/Button/Button.jsx";
import InputField from "../../../components/Input/Input.jsx";


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


const RegistrationHostEmailPage = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleRegisterNext = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("http://127.0.0.1:8000/backend/api/users/auth/registration/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email: email}),
            });

            const data = await response.json();
            console.log(data);

            if (data.message === "Validation code sent.") {
                navigate('/host-code-sent');
                console.error("Failed to send email:", data.message);
            }
        } catch (error) {
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
                </div>
                <Button type="submit" label="Next"/>
            </Form>
        </Container>
    );
}

export default RegistrationHostEmailPage;

