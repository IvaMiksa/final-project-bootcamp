import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {login_user} from "../../store/slices/userSlice.js";
import styled from "styled-components";
import Button from "../../components/Button/Button.jsx";
import InputField from "../../components/Input/Input.jsx";
import {AxiosInstance} from "../../utils/axios.js";
import {toast} from "react-toastify";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 20px;
    height: 75vh;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 20px;

`;

const PasswordContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 15px;
`;

const ForgotPasswordText = styled.h6`
    cursor: pointer;
    align-self: flex-end;
    margin-left: 5px;
`;

const Input = styled.input`
    outline: none;
    border: none;
    border-bottom: 1px solid black;
`;

const Error = styled.p`
    color: red;
    font-size: 12px;
`;


const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user.userData);

    // Errors
    const [errorEmail, setErrorEmail] = useState(null);
    const [errorPassword, setErrorPassword] = useState(null);


    const handleRegisterNomad = () => {
        navigate('/nomad-register');
    };


    const handleRegisterOwner = () => {
        navigate('/host-register');
    };


    const handleForgottenPassword = () => {
        navigate('/password-reset-email');
    };


    // Inputs
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    // Sending credentials to BE to get access token
    const handleSubmit = async (e) => {
        e.preventDefault();
        clearErrors();

        try {
            const response = await AxiosInstance.post("auth/token/", {
                email: email,
                password: password,
            });

            const accessToken = response.data.access;
            //console.log(accessToken);
            dispatch(login_user(accessToken));
            localStorage.setItem("accessToken", accessToken); // saving token in LS after successful login

        } catch (error) {
            console.log(error);
            handleErrors(error);

        }
    };

    useEffect(() => {
        if (userData.user_type) {
            // Redirect to the appropriate dashboard based on userType
            //console.log("User type before navigation:", userData.user_type);
            switch (userData.user_type) {
                case 'admin':
                    navigate('/admin-dashboard');
                    break;
                case 'nomad':
                    navigate('/');
                    break;
                case 'host':
                    navigate('/host-properties');
                    break;
                default:
                    navigate('/');
            }
        }
    }, [userData, navigate]);

    // Handle errors
    const handleErrors = (error) => {
        if (error.response && error.response.data) {
            const data = error.response.data;

            // Check if specific errors exist
            if (data.email) {
                //setErrorEmail(`Email Error: ${data.email}`);
                toast.error(`Email Error: ${data.email}`);
            } else if (data.detail) {
                //setErrorEmail(`Error: ${data.detail}`);
                toast.error(`Error: ${data.detail}`);
            }

            if (data.password) {
                //setErrorPassword(`Password Error: ${data.password}`);
                toast.error(`Password Error: ${data.password}`);
            } else if (data.detail) {
                //setErrorPassword(`Error: ${data.detail}`);
                //toast.error(`Error: ${data.detail}`);
            }
        } else {
            //setErrorEmail("An unexpected error occurred. Please try again.");
            setErrorPassword(null);  
            toast.error("An unexpected error occurred. Please try again.");
        }
    };

    // Clear errors
    const clearErrors = () => {
        setErrorEmail(null);
        setErrorPassword(null);
    };


    return (

        <Container>

            <Form action="#" method="post" onSubmit={handleSubmit}>
                <div>
                    <InputField
                        type="email"
                        placeholder="EMAIL"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        iconPath="/svgs/user_icon.svg"
                    />
                    {errorEmail && <Error>{errorEmail}</Error>}
                </div>
                <PasswordContainer>
                    <InputField
                        type="password"
                        placeholder="PASSWORD"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        iconPath="/svgs/password.svg"
                    />
                    {errorPassword && <Error>{errorPassword}</Error>}
                    <ForgotPasswordText onClick={handleForgottenPassword}>
                        FORGOTTEN PASSWORD?
                    </ForgotPasswordText>
                </PasswordContainer>

                <Button type="submit" label="SIGN IN"/>
            </Form>

            <h4>NEW TO NOMADLY?</h4>


            <Button type="button" label="REGISTER AS DIGITAL NOMAD"
                    onClick={handleRegisterNomad}/>
            <Button type="button" label="REGISTER AS PROPERTY OWNER" onClick={handleRegisterOwner}/>


        </Container>
    )
}

export default LoginPage