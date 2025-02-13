import {Outlet} from "react-router-dom";

import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import {StyledContent, StyledLayoutContainer} from "./MainLayoutStyle.js";


const MainLayout = () => {
    return (
        <>
            <StyledLayoutContainer>
                <Header/>
                <StyledContent>
                    <Outlet/>
                </StyledContent>
                <Footer/>
            </StyledLayoutContainer>
        </>
    )
}

export default MainLayout
