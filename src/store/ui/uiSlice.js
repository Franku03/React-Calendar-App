import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isDateModalOpen: false,
        isMyModal: false,
    },
    reducers: {
        onOpenDateModal: ( state, { payload } ) => {
            state.isDateModalOpen = true;
            state.isMyModal = payload;
        },
        onCloseDateModal: ( state ) => {
            state.isDateModalOpen = false;
            state.isMyModal = false;
        },
    }
});


// Action creators are generated for each case reducer function
export const { 
    onOpenDateModal, 
    onCloseDateModal,

} = uiSlice.actions;