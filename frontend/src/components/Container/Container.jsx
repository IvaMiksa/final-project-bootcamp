import styled from "styled-components";

const RoundEdgeContainer = styled.div`
    border-radius: ${p => p.theme.borderRadius.xl5};
    height: 100%;
`


const Container = () => {
    return (
        <RoundEdgeContainer/>
    );
};

export default Container;
