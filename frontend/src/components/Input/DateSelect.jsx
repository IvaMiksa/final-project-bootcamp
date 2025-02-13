import React, {useEffect, useRef, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import {DayPicker} from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import styled from "styled-components";
import InputField from "./Input.jsx";
import {FaRegCalendarAlt} from "react-icons/fa";
import {parse, format} from 'date-fns';
import Button from "../Button/Button.jsx";
import CustomDayPicker from "../DatePicker/DatePickerStyle.js";

const StyledPopup = styled.div`
    position: absolute;
    z-index: 10;
    background: white;
    border: 1px solid #ddd;
    padding: 1rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const StyledButtonGroup = styled.div`
    display: flex;
    justify-content: space-between;
`;

const DateSelect = ({disabledDates, onRangeSelect, onSearch}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedRange, setSelectedRange] = useState({from: null, to: null}); // Initialize with default values
    const [showPicker, setShowPicker] = useState(false);
    const popupRef = useRef(null);

    // Initialize range from URL search params if available
    useEffect(() => {
        const from = searchParams.get('from');
        const to = searchParams.get('to');

        if (from && to) {
            const fromDate = parse(from, 'dd-MM-yyyy', new Date());
            const toDate = parse(to, 'dd-MM-yyyy', new Date());

            setSelectedRange({
                from: isNaN(fromDate) ? null : fromDate,
                to: isNaN(toDate) ? null : toDate,
            });
        }
    }, [searchParams]);

    // Close the calendar when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setShowPicker(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Handle date selection changes
    const handleRangeChange = (range) => {
        setSelectedRange(range || {from: null, to: null}); // Ensure range has default values
        onRangeSelect && onRangeSelect(range || {from: null, to: null});
    };

    const handleSearchClick = () => {
        // Format dates as DD-MM-YYYY and update URL search params
        if (selectedRange.from && selectedRange.to) {
            setSearchParams({
                from: format(selectedRange.from, 'dd-MM-yyyy'),
                to: format(selectedRange.to, 'dd-MM-yyyy'),
            });
        }
        onSearch && onSearch(selectedRange);
        setShowPicker(false); // Hide picker on search
    };

    const handleInputClick = () => {
        setShowPicker(true);
    };

    const handleResetClick = () => {
        // Clear the selected range and URL search params
        setSelectedRange({from: null, to: null});
        onRangeSelect && onRangeSelect({from: null, to: null});
        setSearchParams({from: '', to: ''});
        setShowPicker(false); // Hide picker on reset
    };

    return (
        <div>
            <InputField
                type="text"
                readOnly
                value={
                    selectedRange.from && selectedRange.to
                        ? `${format(selectedRange.from, 'dd MMM yyyy')} - ${format(selectedRange.to, 'dd MMM yyyy')}`
                        : ''
                }
                onClick={handleInputClick}
                style={{cursor: 'pointer'}}
                icon={FaRegCalendarAlt}
                placeholder="Select date range"
            />

            {showPicker && (
                <StyledPopup ref={popupRef}>
                    <CustomDayPicker
                        mode="range"
                        selected={selectedRange}
                        onSelect={handleRangeChange}
                        min={28}
                        footer={"**Bookings require a stay of at least 28 days."}
                        numberOfMonths={2}
                        disabled={(date) =>
                            date < new Date() ||
                            (disabledDates && disabledDates.includes(date.toDateString()))
                        }
                    />

                    <StyledButtonGroup>
                        <Button onClick={handleResetClick} label={"Reset"}/>
                        <Button onClick={handleSearchClick} label={"Search"}/>
                    </StyledButtonGroup>
                </StyledPopup>
            )}
        </div>
    );
};

export default DateSelect;
