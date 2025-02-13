import styled from "styled-components";


const StyledText = styled.p`
    white-space: pre-line;
    background-color: transparent;
    line-height: ${p => p.type === "PageTitle" ? "1.4" : "1.3"};
    letter-spacing: ${p => p.type === "PageTitle" ? "1px" : "0.5px"};
    padding-bottom: 2px;

    font-size: ${(p) =>
            p.type === "BiggestTitle" ? p.theme.fontSizes.xl6 :
                    p.type === "BiggerTitle" ? p.theme.fontSizes.xl5 :
                            p.type === "BigTitle" ? p.theme.fontSizes.xl4 :
                                    p.type === "Title" ? p.theme.fontSizes.xl3 :
                                            p.type === "PageTitle" ? p.theme.fontSizes.xl4 :
                                                    p.type === "SectionTitle" ? p.theme.fontSizes.xl4 :

                                                            p.type === "FormTitle" ? p.theme.fontSizes.xl3 :

                                                                    p.type === "CardTitle" ? p.theme.fontSizes.lg :
                                                                            p.type === "IconBoxTitle" ? p.theme.fontSizes.md :

                                                                                    p.type === "large" ? p.theme.fontSizes.lg :
                                                                                            p.type === "Subtitle" ? p.theme.fontSizes.md :
                                                                                                    p.type === "small" ? p.theme.fontSizes.sm :
                                                                                                            p.type === "description" ? p.theme.fontSizes.base :
                                                                                                                    p.theme.fontSizes.base}; // Default font size

    color: ${(p) =>
            p.type === "description" ? p.theme.colors.gray :
                    p.type === "PageTitle" || p.type === "SectionTitle" ? p.theme.colors.blue :
                            p.theme.colors.black};


    font-weight: ${(p) =>
            p.type === "CardTitle" || p.type === "BiggerTitle" || p.type === "BigTitle" || p.type === "PageTitle" || p.type === "FormTitle" || p.type === "IconBoxTitle" || p.type === "SectionTitle" ? "bold" :
                    p.type === "Title" ? "400" :
                            "normal"};
`;

const Text = ({key, label, type, style}) => {
    return <StyledText key={key} type={type} style={style}>{label}</StyledText>;
};

export default Text;