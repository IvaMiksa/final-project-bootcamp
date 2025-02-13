// FormComponent.jsx
import styled from "styled-components";
import InputField from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 10px;
`;

const FormComponent = ({
                           fields,
                           onChange,
                           onSubmit,
                           buttonText = "Submit",

                       }) => {
    return (
        <Form onSubmit={onSubmit}>
            {fields.map((field) => (
                <div key={field.name}>
                    <InputField
                        key={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        name={field.name}
                        value={field.value}
                        onChange={onChange}
                        iconPath={field.iconPath}
                    />
                </div>
            ))}
            <Button type="submit" label={buttonText}/>
        </Form>
    );
};

export default FormComponent;