import React from 'react';
// import NomadDashboardLayout from "./NomadDashboardLayout.jsx";
import NomadAnalyticsPage from "./NomadAnalyticsPage.jsx";
import NomadBookingsPage from "./NomadBookingsPage.jsx";
import NomadProfilePage from "./NomadProfilePage.jsx";


const NomadDashboard = () => {


    return (
        <>
            <NomadAnalyticsPage/>
            <NomadBookingsPage/>
            <NomadProfilePage/>
        </>

    );
};


export default NomadDashboard;