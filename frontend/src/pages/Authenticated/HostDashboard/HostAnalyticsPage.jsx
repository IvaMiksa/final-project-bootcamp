import HostDashboardLayout from "../../Layouts/HostDashboardLayout/HostDashboardLayout.jsx";

import React from 'react';
import styled from 'styled-components';

// import BookingsChart from "../../../components/BookingsChart.jsx";

import {
    Area,
    AreaChart,
    Bar,
    BarChart, CartesianGrid,
    Cell,
    Line,
    LineChart,
    Pie,
    PieChart, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart,
    ResponsiveContainer, Scatter, ScatterChart,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";


const DashboardContainer = styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  gap: 20px;

  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr); 

  @media (max-width: 768px) {
    grid-template-columns: 1fr; 
  }
`;

const Card = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 240px;
`;

const ChartCard = styled(Card)`
  width: 100%;
  max-width: 480px;
  height: 300px;
  display: flex;
  flex-direction: column; 
  overflow: hidden;
`;

const Title = styled.h3`
    font-size: 18px;
    margin-bottom: 10px;
    text-align: center;
`;

// Data
const sampleBookingsData = [
    {month: 'Jan', bookings: 30},
    {month: 'Feb', bookings: 50},
    {month: 'Mar', bookings: 45},
    {month: 'Apr', bookings: 60},
    {month: 'May', bookings: 70},
];


const events = [
    {title: 'Booking 1', start: new Date(2023, 10, 1), end: new Date(2023, 10, 2)},
    {title: 'Booking 2', start: new Date(2023, 10, 3), end: new Date(2023, 10, 4)},
];


const COLORS = ['#0088FE', '#FF8042', '#00C49F'];


const lineData = [
    {month: 'Jan', occupancy: 70},
    {month: 'Feb', occupancy: 78},
    {month: 'Mar', occupancy: 85},
    {month: 'Apr', occupancy: 90},
];


const areaData = [
    {month: 'Jan', revenue: 4000},
    {month: 'Feb', revenue: 3000},
    {month: 'Mar', revenue: 5000},
    {month: 'Apr', revenue: 7000},
];

const radarData = [
    {subject: 'Cleanliness', score: 120, fullMark: 150},
    {subject: 'Amenities', score: 98, fullMark: 150},
    {subject: 'Service', score: 86, fullMark: 150},
    {subject: 'Location', score: 99, fullMark: 150},
    {subject: 'Comfort', score: 85, fullMark: 150},
];

const scatterData = [
    {x: 30, y: 20},
    {x: 50, y: 60},
    {x: 70, y: 100},
    {x: 90, y: 80},
];

const guestDemographicsData = [
    {name: '25-34', value: 40},
    {name: '35-44', value: 30},
    {name: '45-54', value: 20},
    {name: '55+', value: 10},
];

const bookingTrendsData = [
    {month: 'Jan', bookings: 30},
    {month: 'Feb', bookings: 45},
    {month: 'Mar', bookings: 60},
    {month: 'Apr', bookings: 70},
    {month: 'May', bookings: 80},
];


const guestOriginData = [
    {name: 'USA', value: 40},
    {name: 'Canada', value: 20},
    {name: 'UK', value: 15},
    {name: 'Germany', value: 10},
    {name: 'Australia', value: 15},
];

const calendarEvents = [
    {title: 'Check-In: Alice Johnson', start: new Date(2023, 10, 1), end: new Date(2023, 10, 2)},
    {title: 'Check-Out: Alice Johnson', start: new Date(2023, 10, 2), end: new Date(2023, 10, 2)},
    {title: 'Check-In: Bob Brown', start: new Date(2023, 10, 3), end: new Date(2023, 10, 4)},
    {title: 'Check-Out: Bob Brown', start: new Date(2023, 10, 4), end: new Date(2023, 10, 4)},
];


const occupancyLevelsData = [
    {month: 'Jan', occupancy: 60},
    {month: 'Feb', occupancy: 70},
    {month: 'Mar', occupancy: 80},
    {month: 'Apr', occupancy: 90},
    {month: 'May', occupancy: 85},
];

const seasonalBookingData = [
    {season: 'Winter', bookings: 50},
    {season: 'Spring', bookings: 70},
    {season: 'Summer', bookings: 120},
    {season: 'Fall', bookings: 90},
];

const cancellationRatesData = [
    {month: 'Jan', cancellations: 5},
    {month: 'Feb', cancellations: 7},
    {month: 'Mar', cancellations: 4},
];

const feedbackTrendsData = [
    {month: 'Jan', averageRating: 4.5},
    {month: 'Feb', averageRating: 4.2},
    {month: 'Mar', averageRating: 4.7},
];


const HostAnalyticsPage = () => {


    return (
        <HostDashboardLayout>
            <DashboardContainer>

                <ChartCard>
                    <Title>Guest Demographics by Age Group</Title>
                    <ResponsiveContainer>
                        <BarChart data={guestDemographicsData}>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip/>
                            <Bar dataKey="value" fill="#8884d8"/>
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>


                <ChartCard>
                    <Title>Booking Trends Over Time</Title>
                    <ResponsiveContainer>
                        <LineChart data={bookingTrendsData}>
                            <XAxis dataKey="month"/>
                            <YAxis/>
                            <Tooltip/>
                            <Line type="monotone" dataKey="bookings" stroke="#82ca9d"/>
                        </LineChart>
                    </ResponsiveContainer>
                </ChartCard>


                <ChartCard>
                    <Title>Guest Origin by Country</Title>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie data={guestOriginData} dataKey="value" outerRadius={80} label>
                                {guestOriginData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                                ))}
                            </Pie>
                            <Tooltip/>
                        </PieChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard>
                    <Title>Occupancy Trend</Title>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={lineData}>
                            <XAxis dataKey="month"/>
                            <YAxis/>
                            <Tooltip/>
                            <Line type="monotone" dataKey="occupancy" stroke="#82ca9d"/>
                        </LineChart>
                    </ResponsiveContainer>
                </ChartCard>


                <ChartCard>
                    <Title>Revenue by Month</Title>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={areaData}>
                            <XAxis dataKey="month"/>
                            <YAxis/>
                            <Tooltip/>
                            <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8"/>
                        </AreaChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard>
                    <Title>Guest Ratings</Title>
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart outerRadius={90} data={radarData}>
                            <PolarGrid/>
                            <PolarAngleAxis dataKey="subject"/>
                            <PolarRadiusAxis/>
                            <Radar name="Rating" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
                            <Tooltip/>
                        </RadarChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard>
                    <Title>Guest Stay Scatter</Title>
                    <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart>
                            <CartesianGrid/>
                            <XAxis dataKey="x" name="Stay Length" unit="days"/>
                            <YAxis dataKey="y" name="Occupancy" unit="%"/>
                            <Tooltip cursor={{strokeDasharray: '3 3'}}/>
                            <Scatter name="Guests" data={scatterData} fill="#82ca9d"/>
                        </ScatterChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard>
                    <Title>Occupancy Levels Over Time</Title>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={occupancyLevelsData}>
                            <XAxis dataKey="month"/>
                            <YAxis/>
                            <Tooltip/>
                            <Bar dataKey="occupancy" fill="#82ca9d"/>
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard>
                    <Title>Seasonality Analysis of Bookings</Title>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={seasonalBookingData} dataKey="bookings" outerRadius={80} label>
                                {seasonalBookingData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                                ))}
                            </Pie>
                            <Tooltip/>
                        </PieChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard>
                    <Title>Cancellation Rates Over Time</Title>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={cancellationRatesData}>
                            <XAxis dataKey="month"/>
                            <YAxis/>
                            <Tooltip/>
                            <Line type="monotone" dataKey="cancellations" stroke="#ff7300"/>
                        </LineChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard>
                    <Title>Customer Feedback Trends</Title>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={feedbackTrendsData}>
                            <XAxis dataKey="month"/>
                            <YAxis/>
                            <Tooltip/>
                            <Line type="monotone" dataKey="averageRating" stroke="#82ca9d"/>
                        </LineChart>
                    </ResponsiveContainer>
                </ChartCard>


                {/*<BookingsChart data={sampleBookingsData} />*/}

            </DashboardContainer>
        </HostDashboardLayout>


    );
};

export default HostAnalyticsPage;