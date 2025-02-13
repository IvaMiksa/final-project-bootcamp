import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {logout_user} from '../../store/slices/userSlice.js';
import MainMenuModal from "../Modals/MainMenuModal.jsx";
import styled from "styled-components";
import {setActiveMenuItem} from "../../store/slices/generalSlice.js";
import Button from "../Button/Button.jsx";


export const StyledHeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    background-color: ${(props) => props.theme.colors.globalBgOffWhite};
    padding-inline: 24px;
    box-shadow: ${(props) => props.theme.boxShadow.darker};
    z-index: 1;

    * {
        background-color: ${(props) => props.theme.colors.globalBgOffWhite};
    }

    h1 {
        text-transform: uppercase;
    }

    p, a {
        text-transform: uppercase;
        text-decoration: none;
    }
`;

const StyledLinksAuthButtonsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

const StyledNavLinkList = styled.nav`
    display: flex;
    gap: 2rem;

    a {
        text-decoration: none;
        color: rgba(0, 0, 0, 0.90);
        position: relative;

        &:hover {
            color: rgba(0, 0, 0);
        }
    }

    a.active {
        font-weight: bold;

        &::after {
            content: '';
            position: absolute;
            bottom: -25px;
            left: 0;
            width: 100%;
            height: 3px;
            background-color: ${(props) => props.theme.colors.blue};
        }
    }
`;

const StyledAuthButtonsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 1em;

    .btn {
        margin-left: 2px;
        background-color: ${(props) => props.theme.colors.blue};
        border: none;
        color: #fff;
        text-decoration: none;
        cursor: pointer;
        padding: 10px 20px;
        transition: background-color 0.3s ease-in;
        border-radius: 20px;

        &:hover {
            background-color: ${(props) => props.theme.colors.blueLight};
        }

    }
`;

const StyledLogo = styled.img`
    height: 25px;
    width: 100%;
`;

const StyledUserIcon = styled.img`
    height: 30px;
    width: 30px;
    margin-right: 20px;
`;

const StyledTagline = styled.p`
    line-height: 1;
    padding-top: 3px;
    font-size: ${(props) => props.theme.fontSizes.xs2};
`;

const Avatar = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid #ccc;
`;

const MenuItem = styled.a`
    display: block;
    margin: 0 25px;
    color: ${props => (props.active ? '#0074B7' : '#666')};
    font-weight: bold;
    text-decoration: none;
    cursor: pointer;
    padding: 10px 15px;
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
        background-color: #e5f1fa;
        color: #005f8a;
    }

    &.active {
        background-color: #e1f3ff;
        color: #005f8a;
        border-bottom: 2px solid #0074B7;
    }
`;

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector(store => store.user.accessToken);
    const [isMenuOpen, setMenuOpen] = useState(false);
    const userData = useSelector((state) => state.user.userData);
    const activeMenuItem = useSelector((state) => state.general.activeMenuItem);

    const handleMenuClick = (menuItem, path) => {
        dispatch(setActiveMenuItem(menuItem));
        navigate(path);
    };


    const logoutHandler = () => {
        dispatch(logout_user());
        localStorage.removeItem("accessToken");
        navigate("/");
    };

    return (
        <StyledHeaderContainer>
            <Link to="/">
                <StyledLogo src="/svgs/logo-cropped-blue.svg"/>
                <StyledTagline>Your gateway to global living.</StyledTagline>
            </Link>
            <StyledLinksAuthButtonsContainer>

                {isAuthenticated && userData.user_type !== 'admin' && (
                    <MenuItem
                        active={activeMenuItem === "Home"}
                        onClick={() => handleMenuClick("Home", "/")}
                    >
                        Home
                    </MenuItem>)}


                {isAuthenticated && userData.user_type !== 'admin' && (<MenuItem
                    active={activeMenuItem === "Bookings"}
                    onClick={() => handleMenuClick("Bookings", userData.user_type === 'host' ? "/host-bookings" : userData.user_type === 'nomad' ? "/nomad-bookings" : "/")}
                >
                    Bookings
                </MenuItem>)}
                {isAuthenticated && (<MenuItem
                    active={activeMenuItem === "Analytics"}
                    onClick={() => handleMenuClick("Analytics", userData.user_type === 'host' ? "/host-analytics" : userData.user_type === 'nomad' ? "/nomad-analytics" : "/")}
                >
                    {userData.user_type === 'host' ? "Analytics" : userData.user_type === 'nomad' ? "Map" : ""}
                </MenuItem>)}
                {isAuthenticated && userData.user_type === 'host' && (<MenuItem
                    active={activeMenuItem === "Properties"}
                    onClick={() => handleMenuClick("Properties", "/host-properties")}
                >
                    Properties
                </MenuItem>)}

                {isAuthenticated && userData.user_type === 'nomad' && (<MenuItem
                    active={activeMenuItem === "Favourites"}
                    onClick={() => handleMenuClick("Favourites", "nomad-favourites")}
                >
                    Favourites
                </MenuItem>)}
                {isAuthenticated && (<MenuItem
                    active={activeMenuItem === "Profile"}
                    onClick={() => handleMenuClick("Profile", userData.user_type === 'host' ? "/host-profile" : userData.user_type === 'nomad' ? "nomad-profile" : "/")}
                >
                    Profile
                </MenuItem>)}
                {/*isAuthenticated && <p> Welcome, {userData.first_name}</p>*/}
                {/*isAuthenticated && <Avatar src={userData.avatar ? `https://nomadly.propulsion-learn.ch${userData.avatar}` : '/svgs/user_icon.svg'} />*/}

                {/* Burger Menu Icon
                <img
                    src="/svgs/burger_icon.svg"
                    alt="Menu"
                    onClick={() => setMenuOpen(!isMenuOpen)}
                    style={{cursor: 'pointer', width: '40px', height: '40px'}}
                />*/}

                {/* Main Menu Modal */}
                <MainMenuModal isOpen={isMenuOpen} onClose={() => setMenuOpen(false)}/>

                {/* Login / Logout and Property Owner Button */}
                <StyledAuthButtonsContainer>
                    {isAuthenticated ? (
                        <StyledUserIcon
                            src="/svgs/logout_icon.svg"
                            alt="Logout"
                            onClick={logoutHandler}
                            style={{cursor: 'pointer'}}
                        />
                    ) : (
                        <Button label="Sign in" onClick={() => navigate("/login")}/>
                    )}
                </StyledAuthButtonsContainer>
            </StyledLinksAuthButtonsContainer>
        </StyledHeaderContainer>
    );
};


{/*<Link to="/login"><StyledUserIcon src="/svgs/user_icon.svg" alt="Login"/></Link>*/
}
export default Header;
