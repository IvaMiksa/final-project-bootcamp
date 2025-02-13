import React from 'react';
// import NomadDashboardLayout from "./NomadDashboardLayout.jsx";
import NomadAnalyticsPage from "./NomadAnalyticsPage.jsx";
import NomadBookingsPage from "./NomadBookingsPage.jsx";
import NomadInfoPage from "./NomadInfoPage.jsx";
import NomadProfilePage from "./NomadProfilePage.jsx";


const NomadDashboard = () => {


    return (
        <>
            <NomadAnalyticsPage/>
            <NomadBookingsPage/>
            <NomadInfoPage/>
            <NomadProfilePage/>
        </>

    );
};


export default NomadDashboard;