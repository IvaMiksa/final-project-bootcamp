import styled from 'styled-components';
import {DayPicker} from 'react-day-picker';


const CustomDayPicker = styled(DayPicker)`
    --rdp-background-color: #ffffff; /* General background color */
    --rdp-accent-color: #0F5D82; /* Primary accent color */
    --rdp-accent-color-dark: #1a8a2b; /* Darker accent for hover and focus */
    --rdp-background-color-selected: #0F5D82; /* Background for selected days */
    --rdp-color-selected: #0F5D82; /* Text color for selected days */
    --rdp-background-color-hover: #f0f0f0; /* Background on hover */
    --rdp-outline-color: #1DB233; /* Outline color for focused days */

    /* Additional customization for specific parts of the DayPicker */

    .rdp-day {
        border-radius: 50%; /* Make days circular */
    }

    .rdp-day_selected:not([disabled]) {
        background-color: var(--rdp-background-color-selected);
        color: var(--rdp-color-selected);
    }

    .rdp-day:hover:not(.rdp-day_selected):not([disabled]) {
        background-color: var(--rdp-background-color-hover);
    }

    .rdp-day_outside {
        color: #d3d3d3; /* Greyed out color for days outside the current month */
    }

    .rdp-caption_label {
        color: #333333; /* Custom color for the month label */
    }
`;

export default CustomDayPicker;
