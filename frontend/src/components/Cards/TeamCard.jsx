import Text from "../Text/Text.jsx";
import styled from "styled-components";
import {RiLinkedinFill} from "react-icons/ri";
import {SiMinutemailer} from "react-icons/si";


const Card = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2em;
    max-width: ${p => p.theme.spaces.biggest};
    border: ${p => p.theme.border.light};
    border-radius: ${p => p.theme.borderRadius.xl2};
    box-shadow: ${p => p.theme.boxShadow.dark}

    margin: ${p => p.theme.spaces.xl2};
    transition: transform ${p => p.theme.transition.normal};

    div {
        display: flex;
    }
    
    &:nth-child(4){
        img {
            object-position: center;
        }
    }

    &:hover,
    &:focus {
        transform: scale3d(1.006, 1.006, 1);

        &::after {
            opacity: 1;
        }
    }
`;

const Image = styled.img`
    width: 120px;
    height: 120px;
    border: 2px solid ${p => p.theme.colors.blue};
    border-radius: 50%;
    aspect-ratio: ${p => p.theme.aspectRatio.square};
    object-fit: cover;
    object-position: bottom;
    
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    padding: ${p => p.theme.spaces.xl4};
    height: ${p => p.theme.spaces.big};
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 1em;
    padding-top: 1em;
    padding-bottom: 1em;
    justify-content: space-between;
    align-items: center;
`;

const LinkedIn = styled(RiLinkedinFill)`
    font-size: ${p => p.theme.fontSizes.lg};
`;

const Email = styled(SiMinutemailer)`
    font-size: ${p => p.theme.fontSizes.lg};
`;


const TeamCard = ({image, name, role, description, id, social, email}) => {
    return (
        <Card title={name} key={id}>
            <div>
                <Image src={image} alt={name}/>
            </div>
            <Content>
                <Text type="CardTitle" label={name}/>
                <Text type="Subtitle" label={role}/>
                <Text type="description" label={description}/>
                <ButtonGroup>
                    <a href={social} target="_blank">
                        <LinkedIn/>
                    </a>
                    <a href={`mailto:${email}`} target="_blank">
                        <Email/>
                    </a>

                </ButtonGroup>
            </Content>
        </Card>
    );
};

export default TeamCard
