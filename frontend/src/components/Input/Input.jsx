import styled from "styled-components";

const StyledTextFieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: ${p => p.theme.spaces.base};
    width: ${p => p.theme.spaces.bigger};
`;

const StyledLabel = styled.label`
    font-size: ${p => p.theme.colors.base};
    color: ${(p) => p.theme.colors.gray};
    margin-bottom: ${(p) => p.theme.spaces.xs};
`;

const StyledTextFieldWrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 0.5rem ${(p) => p.theme.spaces.base};
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
    width: 100%;
    border-bottom: 1px solid #000;
    border-radius: 0;
    cursor: ${(props) => (props.type === "file" ? "pointer" : "text")};

    &:focus-within {
        border-color: ${p => p.theme.colors.blue};
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }
`;

const StyledTextField = styled.input`
    border: none;
    outline: none;
    padding: 8px;
    width: 100%;
    background-color: transparent;
    font-size: ${(p) => p.theme.fontSizes.base};
    display: ${(props) => (props.type === "file" ? "none" : "block")}; /* Hide for file inputs */
`;

const StyledIcon = styled.img`
    display: inline-block;
    margin-right: ${(p) => p.theme.spaces.sm};
    color: ${(p) => p.theme.colors.globalTextBlack};
    width: ${(p) => p.theme.spaces.xl2};
    height: ${(p) => p.theme.spaces.xl2};
`;

const ButtonUpload = styled.button`
    border: ${p => p.theme.border.dark};
    border-radius: ${p => p.theme.borderRadius.xl3};
    padding: 7px;
    background: none;
    cursor: pointer;
`;

const InputField = ({
                        label,
                        placeholder,
                        iconPath,
                        icon: Icon,
                        onChange,
                        onClick,
                        value,
                        type,
                        name,
                        fileRef,
                        readOnly,
                        maxLength
                    }) => {
    return (
        <StyledTextFieldContainer>
            {label && <StyledLabel>{label}</StyledLabel>}
            <StyledTextFieldWrapper type={type}>
                {/*{iconPath && <StyledIcon src={iconPath} alt="icon" />}*/}
                {iconPath ? (
                    <StyledIcon src={iconPath} alt="icon"/>
                ) : Icon ? (
                    <Icon style={{marginRight: '8px', width: '24px', height: '24px'}}/>
                ) : null}

                {type === "file" ? (
                    <>
                        <ButtonUpload onClick={(e) => fileRef.current.click()}>{placeholder}</ButtonUpload>
                        <StyledTextField
                            type="file"
                            name={name}
                            ref={fileRef}
                            onChange={onChange}
                            hidden
                        />
                    </>
                ) : (
                    <StyledTextField
                        type={type || "text"}
                        placeholder={placeholder}
                        onChange={onChange}
                        value={value}
                        name={name}
                        readOnly={readOnly}
                        onClick={onClick}
                        maxLength={maxLength}
                    />
                )}
            </StyledTextFieldWrapper>
        </StyledTextFieldContainer>
    );
};

export default InputField;