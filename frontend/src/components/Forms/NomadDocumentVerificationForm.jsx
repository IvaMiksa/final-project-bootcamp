import styled from "styled-components";
import InputField from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: ${p => p.theme.spaces.base};
    height: 100%;
    padding: ${p => p.theme.spaces.xl5};
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 10px;
`;

const ContainerUpload = styled.div`
  display: flex;
  gap: 10px;
  height: 300px;
`;

const NomadDocumentVerificationForm = ({
                                           fields,
                                           fileUploads,
                                           termsAccepted,
                                           onTermsToggle,
                                           onChange,
                                           onFileChange,
                                           onSubmit,
                                           submitLabel = "Submit"
                                       }) => {
    return (
        <FormContainer>
            <Form onSubmit={onSubmit}>
                {/* Render Text Input Fields */}
                {fields.map((field) => (
                    <InputField
                        key={field.name}
                        placeholder={field.placeholder}
                        type={field.type}
                        name={field.name}
                        value={field.value}
                        onChange={onChange}
                    />
                ))}

                {/* Render File Upload Buttons */}
                <ContainerUpload>
                    {fileUploads.map((file) => (
                        <div key={file.name}>
                            <button onClick={(e) => {
                                e.preventDefault();
                                file.ref.current.click();
                            }}>
                                {file.label}
                            </button>
                            <input
                                type="file"
                                name={file.name}
                                ref={file.ref}
                                hidden
                                onChange={onFileChange}
                            />
                        </div>
                    ))}
                </ContainerUpload>

                {/* Terms and Conditions Checkbox */}
                <label>
                    <input
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={onTermsToggle}
                    />
                    I HAVE READ AND ACCEPT THE TERMS AND CONDITIONS
                </label>

                <Button type="submit" label={submitLabel}/>
            </Form>
        </FormContainer>
    );
};

export default NomadDocumentVerificationForm;
