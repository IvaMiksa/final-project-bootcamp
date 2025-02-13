import styled from "styled-components";

const BaseButton = styled.button`
    line-height: 1;
    max-width: 400px;
    
    text-decoration: none;
    border: none;
    cursor: pointer;
    transition: background-color 0.1s ease-in;
    margin-left: ${(p) => p.theme.spaces.xs2};
    background-color: ${(p) =>
            p.type === "cancel" ? p.theme.colors.red :
                    p.type === "accept" ? p.theme.colors.green :
                            p.type === "details" ? p.theme.colors.black :
                                    p.theme.colors.blue}; // default blue
    color: ${(p) => p.theme.colors.white};
    padding: ${(p) => p.theme.buttonPadding.base};
    border-radius: ${(p) => p.theme.borderRadius.xl2};
    box-shadow: ${(p) => p.theme.boxShadow.lighter};
    font-size: ${(p) => p.theme.fontSizes.sm};

    &:hover {
        background-color: ${(p) =>
                p.type === "cancel" ? p.theme.colors.redDark :
                        p.type === "accept" ? p.theme.colors.greenDark :
                                p.type === "details" ? p.theme.colors.gray :
                                        p.theme.colors.blueDark}; // default blue hover
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const Button = ({label, type, onClick, style, disabled}) => {
    const buttonLabel = type === "details" ? "View" : label;

    return (
        <BaseButton type={type} onClick={onClick} style={style} disabled={disabled}>
            {buttonLabel}
        </BaseButton>
    );
};

export default Button;

// How to use the Button component
// <Button type="accept" label="Accept" onClick={() => console.log("Accept clicked!")} />
// <Button type="cancel" label="Cancel" onClick={() => console.log("Cancel clicked!")} />
// <Button type="black" label="Black" onClick={() => console.log("Black clicked!")} />

