import styled from "styled-components";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { setActiveMenuItem } from "../../../store/slices/generalSlice.js";

const Container = styled.div`
  display: flex;
  flex-direction: column; 
  font-family: 'Arial', sans-serif;
  background-color: #f7f7f7;
    padding: 10px;
`;


const TopMenu = styled.div`
    display: flex;
    justify-content: center;
    background-color: #fff;
    padding: 15px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    margin: 20px;
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

const MainContent = styled.div`
  flex-grow: 1;
  padding: 20px;
`;

const HostDashboardLayout = ({children}) => {
    //const navigate = useNavigate();
    // const dispatch = useDispatch();
    // const activeMenuItem = useSelector((state) => state.general.activeMenuItem);

    /*
    const handleMenuClick = (menuItem, path) => {
      dispatch(setActiveMenuItem(menuItem));
      navigate(path);
    };*/

    return (
        <Container>
            {/*}
      <TopMenu>
        <MenuItem
          active={activeMenuItem === "Bookings"}
          onClick={() => handleMenuClick("Bookings", "/host-bookings")}
        >
          Bookings
        </MenuItem>
        <MenuItem
          active={activeMenuItem === "Analytics"}
          onClick={() => handleMenuClick("Analytics", "/host-analytics")}
        >
          Analytics
        </MenuItem>
        <MenuItem
          active={activeMenuItem === "Properties"}
          onClick={() => handleMenuClick("Properties", "/host-properties")}
        >
          Properties
        </MenuItem>
        <MenuItem
          active={activeMenuItem === "Profile"}
          onClick={() => handleMenuClick("Profile", "/host-profile")}
        >
          Profile
        </MenuItem>
      </TopMenu>*/}
            <MainContent>
                {children}
            </MainContent>
        </Container>
    );
};

export default HostDashboardLayout;
