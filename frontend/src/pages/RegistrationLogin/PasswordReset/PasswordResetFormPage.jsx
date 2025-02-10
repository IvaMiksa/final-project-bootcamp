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

const PasswordResetFormPage = () => {
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:8000/backend/api/users/auth/password-reset/validate/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    password_reset_code: code,
                    new_password: password,
                    email: email,
                    passwordRepeat: passwordRepeat
                }),
            });

            const data = await response.json();
            console.log(data);

            // navigate to login
            if (data.message === "Password has been reset successfully.") { // if (response.ok)
                navigate('/login');
            } else {
                console.error("Failed to reset password:", data.message);
            }

        } catch (error) {
            console.error("Password reset error:", error);
        }
    };


    return (

        <Container>

            <Form action="#" method="post" onSubmit={handleSubmit}>
                <InputField
                    type="text"
                    placeholder="Reset code"
                    value={code}
                    onChange={(event) => setCode(event.target.value)}
                />
                <InputField
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <InputField
                    type="password"
                    placeholder="New password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <InputField
                    type="password"
                    placeholder="Re-enter password"
                    value={passwordRepeat}
                    onChange={(event) => setPasswordRepeat(event.target.value)}
                />
                <Button type="submit" label="Update"/>
            </Form>


        </Container>

    )
}

export default PasswordResetFormPage