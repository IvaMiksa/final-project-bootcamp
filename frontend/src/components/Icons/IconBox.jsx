import styled from "styled-components";
import Text from "../Text/Text.jsx";

const Box = styled.div`
    text-align: center;
    max-width: 300px;
    height: 150px;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: .60rem;
`;

const StyledIconContainer = styled.div`
    background-color: ${p => p.theme.colors.blue};
    padding: 1rem;
    border-radius: 50%;
`;


const IconBox = ({icon: IconComponent, title, description, iconColor}) => {
    return (
        <Box>
            <StyledIconContainer>
                <IconComponent size={50} fill={iconColor} stroke={iconColor}/>
            </StyledIconContainer>
            {title && <Text type="IconBoxTitle" label={title}/>}
            {description && <Text type="description" label={description}/>}
        </Box>
    );
};

export default IconBox;
