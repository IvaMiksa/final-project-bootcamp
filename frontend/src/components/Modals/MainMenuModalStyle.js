import styled from 'styled-components';
import {NavLink} from 'react-router-dom';


export const ModalWrapper = styled.div`
    position: absolute;
    top: 80px; /* Adjust based on header height */
    right: 100px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 16px;
    width: 200px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 1em;
    opacity: ${props => (props.isOpen ? '1' : '0')};
    visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
    transition: opacity 0.3s ease, visibility 0.3s ease;
`;

export const StyledNavLink = styled(NavLink)`
    text-decoration: none;
    color: #333;
    font-size: 1rem;
    padding: 8px;
    border-radius: 4px;
    transition: background 0.2s ease;

    &:hover {
        background-color: #f0f4f8;
        color: #0F5D82;
    }
`;
