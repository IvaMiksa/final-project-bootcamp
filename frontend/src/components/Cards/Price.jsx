import styled from "styled-components";

const StyledPrice = styled.h6`
    font-weight: bold;
    color: ${p => p.theme.colors.blue};
    font-size: ${p => p.size === 'big' ? p.theme.fontSizes.xl3 : p.theme.fontSizes.lg};
`;

const Price = ({currency, amount, label, size}) => {
    return <StyledPrice size={size}>{currency} {amount} {label}</StyledPrice>
}

export default Price;