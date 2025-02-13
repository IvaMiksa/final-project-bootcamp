import styled from "styled-components";


export const StyledTextFieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: ${p => p.theme.spaces.base};
    width: ${p => p.theme.spaces.bigger};
`;

export const StyledLabel = styled.label`
    font-size: ${p => p.theme.colors.base};
    color: ${p => p.theme.colors.blackLight};
    margin-bottom: ${p => p.theme.spaces.xs};
`;

export const StyledTextFieldWrapper = styled.div`
    display: flex;
    align-items: center;
    border-radius: 0;
    width: 100%;
    padding: ${p => p.theme.spaces.sm};
    transition: border-color ${p => p.theme.transition.short} ease, box-shadow ${p => p.theme.transition.short} ease;
    border-bottom: ${p => p.theme.border.dark};

    &:focus-within {
        border-color: ${p => p.theme.colors.blue};
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }
`;

export const StyledTextField = styled.input`
    padding: ${p => p.theme.spaces.sm};;
    font-size: ${p => p.theme.fontSizes.base};
    border: none;
    outline: none;
`;

export const StyledIcon = styled.img`
    display: inline-block;
    margin-right: ${p => p.theme.spaces.sm};
    color: ${p => p.theme.colors.black};
    width: ${p => p.theme.spaces.xl2};
    height: ${p => p.theme.spaces.xl2};
`;

export const StyledList = styled.ul`
    list-style-type: none;
`;
