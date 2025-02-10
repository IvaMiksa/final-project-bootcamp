import {useState} from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import InputField from "../../../components/Input/Input.jsx";
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

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 20px;

`;

const Input = styled.input`
 outline: none;
    border: none;
    border-bottom: 1px solid black;
`;


const PasswordResetEmailPage = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:8000/backend/api/users/auth/password-reset/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email: email}),
            });

            const data = await response.json();
            console.log(data);

            // navigate if email sent successfully
            if (data.message === "Password reset code sent.") {
                navigate('/password-reset-form');
            } else {
                console.error("Failed to send email:", data.message);
            }
        } catch (error) {
            console.error("Registration error:", error);
        }
    };
    return (

        <Container>

            {/*<h2>PASSWORD RESET</h2>*/}
            <Form action="#" method="post" onSubmit={handleSubmit}>
                <InputField
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <Button type="submit" label="Submit"/>
            </Form>

        </Container>

    )
}

export default PasswordResetEmailPage