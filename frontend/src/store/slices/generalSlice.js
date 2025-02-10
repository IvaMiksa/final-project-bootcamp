import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    activeMenuItem: 'Bookings',
    nomadFormData: {
        email: "",
        username: "",
        code: "",
        password: "",
        passwordRepeat: "",
        first_name: "",
        last_name: "",
        gender: "",
        nationality: "",
        dateOfBirth: "",
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
        phone_number: "",
    },

    hostFormData: {
        // Fields required in the first form
        code: "",
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        passwordRepeat: "",

        // Additional fields specific to host data
        streetName: "",
        houseNumber: "",
        city: "",
        postcode: "",
        country: "",
    },


    properties: [],
    propertyFormData: {
        name: "",
        amenities_ids: [],
        price: "",
        city: "",
        post_code: "",
        country: "",
        size: "",
        street: "",
        floor_number: "",
        description: "",
        images: [],
    },
    amenities: [],
    bookings: [],
    reviews: [],
    todos: [],


};

export const generalSlice = createSlice({
    name: "general",
    initialState: initialState,
    reducers: {
        setActiveMenuItem: (state, action) => {
            state.activeMenuItem = action.payload;
        },
        setNomadForm: (state, action) => {
            const {field, value} = action.payload;
            state.nomadFormData[field] = value;
        },
        setHostForm: (state, action) => {
            const {field, value} = action.payload;
            state.hostFormData[field] = value;
        },

        resetNomadForm: () => initialState,
        setProperties: (state, action) => {
            state.properties = action.payload;
        },
        setPropertyForm: (state, action) => {
            if (action.payload && typeof action.payload === 'object' && !('field' in action.payload)) {
                // full form data
                state.propertyFormData = {...state.propertyFormData, ...action.payload};
            } else {
                //updating single field
                const {field, value} = action.payload;
                state.propertyFormData[field] = value;
            }

        },
        clearPropertyForm: (state) => {
            state.propertyFormData = initialState.propertyFormData; // reset to initial values
        },
        setAmenities: (state, action) => {
            state.amenities = action.payload;
        },
        setBookings: (state, action) => {
            state.bookings = action.payload;
        },
        setReviews: (state, action) => {
            state.reviews = action.payload;
        },
        addTodo: (state, action) => {
            state.todos.push(action.payload);
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
        },
        toggleTodoCompletion: (state, action) => {
            const todo = state.todos.find(todo => todo.id === action.payload);
            if (todo) todo.completed = !todo.completed;
        },
        clearCompleted: (state) => {
            state.todos = state.todos.filter(todo => !todo.completed);
        },


    },
});

export const {
    setActiveMenuItem,
    setNomadForm,
    setPropertyForm,
    resetNomadForm,
    setProperties,
    setAmenities,
    clearPropertyForm,
    setBookings,
    setReviews,
    setHostForm,
    addTodo,
    removeTodo,
    toggleTodoCompletion,
    clearCompleted
} = generalSlice.actions;

export default generalSlice.reducer;