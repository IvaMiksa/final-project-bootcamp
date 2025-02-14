import {Routes, Route} from "react-router-dom";
import MainLayout from "../pages/Layouts/MainLayout.jsx";
import NotFound from "../pages/Public/NotFound.jsx";
import HomePage from "../pages/Public/HomePage/HomePage.jsx";
import Protector from "../pages/Authenticated/Protector.jsx";
import LoginPage from "../pages/RegistrationLogin/LoginPage.jsx";
import RegistrationNomadEmailPage from "../pages/RegistrationLogin/RegistrationNomad/RegistrationNomadEmailPage.jsx";
import RegistrationNomadCodeSentPage
    from "../pages/RegistrationLogin/RegistrationNomad/RegistrationNomadCodeSentPage.jsx";
import RegistrationNomadFormFirstPage
    from "../pages/RegistrationLogin/RegistrationNomad/RegistrationNomadFormFirstPage.jsx";
import RegistrationNomadSuccessPage
    from "../pages/RegistrationLogin/RegistrationNomad/RegistrationNomadSuccessPage.jsx";
import RegistrationNomadFormSecondPage
    from "../pages/RegistrationLogin/RegistrationNomad/RegistrationNomadFormSecondPage.jsx";
import PasswordResetEmailPage from "../pages/RegistrationLogin/PasswordReset/PasswordResetEmailPage.jsx";
import PasswordResetFormPage from "../pages/RegistrationLogin/PasswordReset/PasswordResetFormPage.jsx";
import HostDashboard from "../pages/Authenticated/HostDashboard.jsx";
import useTokenVerification from "../hooks/useTokenVerification.js";
import SearchResultsPage from "../pages/Public/SearchResultsPage/SearchResultsPage.jsx";
import AdminDashboard from "../pages/Authenticated/AdminDashboard.jsx";
import NomadBookingsPage from "../pages/Authenticated/NomadDashboard/NomadBookingsPage.jsx";
import NomadProfilePage from "../pages/Authenticated/NomadDashboard/NomadProfilePage.jsx";
import NomadAnalyticsPage from "../pages/Authenticated/NomadDashboard/NomadAnalyticsPage.jsx";
import NomadDashboard from "../pages/Authenticated/NomadDashboard/NomadDashboard.jsx";
import Property from "../pages/Public/Property/Property.jsx";
import HostProfilePage from "../pages/Authenticated/HostDashboard/HostProfilePage.jsx";
import HostPropertiesPage from "../pages/Authenticated/HostDashboard/HostPropertiesPage.jsx";
import HostBookingsPage from "../pages/Authenticated/HostDashboard/HostBookingsPage.jsx";
import HostAnalyticsPage from "../pages/Authenticated/HostDashboard/HostAnalyticsPage.jsx";
import HostAddNewPropertyPage from "../pages/Authenticated/HostDashboard/HostAddNewPropertyPage.jsx";
import HostEditPropertyPage from "../pages/Authenticated/HostDashboard/HostEditPropertyPage.jsx";
import ApplicationConfirmation
    from "../pages/Authenticated/Booking/ApplicationConfirmation/ApplicationConfirmation.jsx";
import ApplicationSummary from "../pages/Authenticated/Booking/BookingSummary/ApplicationSummary.jsx";
import RegistrationHostCodeSentPage from "../pages/RegistrationLogin/RegistrationHost/RegistrationHostCodeSentPage.jsx";
import RegistrationHostEmailPage from "../pages/RegistrationLogin/RegistrationHost/RegistrationHostEmailPage.jsx";
import RegistrationHostFormSecondPage
    from "../pages/RegistrationLogin/RegistrationHost/RegistrationHostFormSecondPage.jsx";
import RegistrationHostSuccessPage from "../pages/RegistrationLogin/RegistrationHost/RegistrationHostSuccessPage.jsx";
import RegistrationHostFormFirstPage
    from "../pages/RegistrationLogin/RegistrationHost/RegistrationHostFormFirstPage.jsx";
import NomadFavouritesPage from "../pages/Authenticated/NomadDashboard/NomadFavouritesPage.jsx";


const Router = () => {
    // Custom hook to verify token
    useTokenVerification();

    return (
        <>
            <Routes>
                <Route element={<MainLayout/>}>
                    {/* Authentication and Registration Routes */}
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/nomad-register" element={<RegistrationNomadEmailPage/>}/>
                    <Route path="/nomad-code-sent" element={<RegistrationNomadCodeSentPage/>}/>
                    <Route path="/nomad-register-form-first" element={<RegistrationNomadFormFirstPage/>}/>
                    <Route path="/nomad-register-form-second" element={<RegistrationNomadFormSecondPage/>}/>
                    <Route path="/nomad-register-success" element={<RegistrationNomadSuccessPage/>}/>
                    <Route path="/password-reset-email" element={<PasswordResetEmailPage/>}/>
                    <Route path="/password-reset-form" element={<PasswordResetFormPage/>}/>
                    <Route path="/host-register" element={<RegistrationHostEmailPage/>}/>
                    <Route path="/host-code-sent" element={<RegistrationHostCodeSentPage/>}/>
                    <Route path="/host-register-form-first" element={<RegistrationHostFormFirstPage/>}/>
                    <Route path="/host-register-form-second" element={<RegistrationHostFormSecondPage/>}/>
                    <Route path="/host-register-success" element={<RegistrationHostSuccessPage/>}/>


                    {/* Public routes */}
                    <Route path="/" element={<HomePage/>}/>
                    {/*<Route path="/about-us" element={<AboutUs/>}/>*/}
                    <Route path="/search-results" element={<SearchResultsPage/>}/>
                    <Route path="/find-a-property" element={<div>Find a Property</div>}/>
                    <Route path="/property/:id" element={<Property/>}/>

                    <Route path="*" element={<NotFound/>}/>

                    {/* Protected routes */}
                    <Route element={<Protector/>}>
                        <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
                        <Route path="/nomad-dashboard" element={<NomadDashboard/>}/>
                        <Route path="/nomad-bookings" element={<NomadBookingsPage/>}/>
                        {/*<Route path="/nomad-info" element={<NomadInfoPage/>}/>*/}
                        <Route path="/nomad-profile" element={<NomadProfilePage/>}/>
                        <Route path="/nomad-analytics" element={<NomadAnalyticsPage/>}/>
                        <Route path="/nomad-favourites" element={<NomadFavouritesPage/>}/>
                        <Route path="/host-dashboard" element={<HostDashboard/>}/>
                        <Route path="/host-profile" element={<HostProfilePage/>}/>
                        <Route path="/host-analytics" element={<HostAnalyticsPage/>}/>
                        <Route path="/host-properties" element={<HostPropertiesPage/>}/>
                        <Route path="/host-bookings" element={<HostBookingsPage/>}/>
                        <Route path="/host-add-new-property" element={<HostAddNewPropertyPage/>}/>
                        <Route path="/host-edit-property/:propertyId" element={<HostEditPropertyPage/>}/>

                        <Route path="/property/:propertyId/application-summary" element={<ApplicationSummary/>}/>
                        <Route path="/application-confirmation" element={<ApplicationConfirmation/>}/>

                    </Route>
                </Route>
            </Routes>
        </>
    );
};

export default Router;
