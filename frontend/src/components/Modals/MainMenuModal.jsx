import {ModalWrapper, StyledNavLink} from "./MainMenuModalStyle.js";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";


const MainMenuModal = ({isOpen, onClose}) => {
    const userData = useSelector((state) => state.user.userData);
    const navigate = useNavigate();
    const isAuthenticated = useSelector((store) => store.user.accessToken);


    // Close modal on click outside
    const handleClickOutside = (e) => {
        if (e.target.id === 'modal-overlay') onClose();
    };

    const handleProfileClick = () => {
        onClose();

        setTimeout(() => {

            //console.log("User data when Profile is clicked:", userData);

            // Redirect based on user type on profile click
            //console.log("User type before navigation:", userData.user_type);
            switch (userData.user_type) {
                case 'admin':
                    navigate('/admin-dashboard');
                    break;
                case 'nomad':
                    navigate('/nomad-bookings');
                    break;
                case 'host':
                    navigate('/host-properties');
                    break;
                default:
                    navigate('/');
            }


        }, 100); // Important! giving modal time to close before navigating
    }

    return (
        <div id="modal-overlay" onClick={handleClickOutside}>
            <ModalWrapper isOpen={isOpen}>
                <StyledNavLink to="/" onClick={onClose}>Home</StyledNavLink>
                <StyledNavLink to="/about-us" onClick={onClose}>About Us</StyledNavLink>
                {isAuthenticated && (
                    <StyledNavLink onClick={handleProfileClick}>
                        Profile
                    </StyledNavLink>
                )}
            </ModalWrapper>
        </div>
    );
};

export default MainMenuModal;
