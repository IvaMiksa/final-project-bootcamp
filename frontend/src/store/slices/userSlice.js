import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    accessToken: localStorage.getItem("accessToken") || undefined,
    userData: {
        user_type: "",
        email: "",
        username: "",
        password: "",
        passwordRepeat: "",
        first_name: "",
        last_name: "",
        gender: "",
        nationality: "",
        date_of_birth: "",
        streetName: "",
        houseNumber: "",
        city: "",
        postcode: "",
        country: "",
        employmentType: "",
        jobTitle: "",
        linkedinProfile: "",
        uploadContract: null,
        uploadVisa: null,
        uploadPassport: null,
        uploadIncome: null,
        avatar: null,
        verification_status: "",
    },
    userFavouriteProperties: []
};

export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        login_user: (state, action) => {
            state.accessToken = action.payload;
        },
        logout_user: (state) => {
            state.accessToken = null;
            state.userData = {};
        },
        setUserData: (state, action) => {
            //state.userData = action.payload;
            state.userData[action.payload.field] = action.payload.value;
        },
        setUserFavouriteProperties: (state, action) => {
            state.userFavouriteProperties = action.payload.favourite_properties
        },
        toggleFavouriteProperty: (state, action) => {
            const property = state.userFavouriteProperties.find((property) => property.id === action.payload.propertyId)
            if (property) {
                state.userFavouriteProperties = state.userFavouriteProperties.filter(existingProperty => existingProperty.id !== property.id)
            }
        }

    },
});

export const {login_user,
    logout_user,
    setUserData,
    toggleFavouriteProperty,
    setUserFavouriteProperties} = userSlice.actions;

export default userSlice.reducer;
