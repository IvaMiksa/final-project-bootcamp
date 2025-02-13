import React, { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Price from "../Cards/Price.jsx";
import Text from "../Text/Text.jsx";
import Button from "../Button/Button.jsx";
import styled from "styled-components";
import { format } from 'date-fns';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { DayPickerContainer } from "../../pages/Public/HomePage/HomeStyle.js";
import CustomDayPicker from "../DatePicker/DatePickerStyle.js";

const StyledCard = styled.div`
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 1em;
    border: ${p => p.theme.border.light};
    box-shadow: ${p => p.theme.boxShadow.dark};
    transition: transform ${p => p.theme.transition.normal};
    border-radius: ${p => p.theme.borderRadius.xl2};
    padding: ${p => p.theme.spaces.base};
`;

const StyledContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const MainContent = styled.div`
   display: flex;
    flex-direction: column;
    gap: 2rem;
`;

const ButtonContainer = styled.div`
    width: 50%
    
    `;

const PriceCalculator = ({amount, propertyname, startdate, enddate, propertyId, propertyBookings}) => {
    const navigate = useNavigate();
    const nomadlyFee = 59; // Fixed fee in CHF
    const [searchParams, setSearchParams] = useSearchParams();

    const [selectedRange, setSelectedRange] = useState({
        from: startdate || null,
        to: enddate || null,
    });

    // Create a disabled date range array from bookings
    const disabledDates = useMemo(() => {
        if (!propertyBookings) {
            return [];
        }

        const disabledList = [];

        propertyBookings.forEach(booking => {
            const startDate = new Date(booking.start_date);
            const endDate = new Date(booking.end_date);

            for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
                disabledList.push(new Date(date)); // Push a copy of the date object to avoid reference issues
            }
        });

        return disabledList;
    }, [propertyBookings]);


    const calculateTotalAmount = (startDate, endDate, pricePerDay) => {
        if (!startDate || !endDate) return 0;

        const start = new Date(startDate);
        const end = new Date(endDate);
        const lengthOfStay = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        const totalCost = (lengthOfStay * pricePerDay) + nomadlyFee;

        return new Intl.NumberFormat("de-CH", {
            style: "currency",
            currency: "CHF"
        }).format(totalCost);
    };

    const totalAmount = useMemo(() => calculateTotalAmount(selectedRange.from, selectedRange.to, amount), [selectedRange, amount]);

    const handleApplyNowClick = () => {
        if (selectedRange.from && selectedRange.to) {
            navigate(`/property/${propertyId}/application-summary`, {
                state: {
                    propertyname,
                    propertyId,
                    startdate: format(selectedRange.from, 'dd.MM.yyyy'),
                    enddate: format(selectedRange.to, 'dd.MM.yyyy'),
                    nomadlyFee,
                    totalAmount,
                    pricePerDay: amount
                }
            });
        } else {
            toast.error("Please select the dates before applying.");
        }
    };

    const handleDateChange = (range) => {
        setSelectedRange(range || { from: null, to: null });

        if (range?.from && range?.to) {
            setSearchParams({
                from: format(range.from, 'dd-MM-yyyy'),
                to: format(range.to, 'dd-MM-yyyy')
            });
        }
    };

    return (
        <StyledCard>
            <MainContent>
                <Price size="big" amount={amount} currency={"CHF"} label={" / day"} />
                <Text label={propertyname} type={"CardTitle"} />
                <StyledContent>
                    <Text
                        type="small"
                        label={
                            selectedRange.from && selectedRange.to
                                ? `Stay: ${format(selectedRange.from, 'd MMM yyyy')} - ${format(selectedRange.to, 'd MMM yyyy')}`
                                : "Please select a date range to calculate the total."
                        }
                    />
                    <Text type="small" label={`Nomadly Fee: CHF ${nomadlyFee}`} />
                    <Text type="CardTitle" label={`Total Amount: ${selectedRange.from && selectedRange.to ? totalAmount : "N/A"}`} />
                </StyledContent>
                <ButtonContainer>
                <Button label={"Apply Now"} onClick={handleApplyNowClick} />
                    </ButtonContainer>
            </MainContent>
            <DayPickerContainer>
                <CustomDayPicker
                    mode="range"
                    selected={selectedRange}
                    onSelect={handleDateChange}
                    disabled={disabledDates}
                    numberOfMonths={1}
                    footer={"**Minimum 28 days"}
                />
            </DayPickerContainer>
        </StyledCard>
    );
};

export default PriceCalculator;
