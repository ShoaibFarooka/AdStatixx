import { createSlice } from '@reduxjs/toolkit';

const campaignSlice = createSlice({
    name: 'campaign',
    initialState: {
        selectedCampaign: null,
    },
    reducers: {
        setSelectedCampaign: (state, action) => {
            state.selectedCampaign = action.payload;
        },
        clearSelectedCampaign: (state) => {
            state.selectedCampaign = null;
        },
    },
});

export const { setSelectedCampaign, clearSelectedCampaign } = campaignSlice.actions;

export default campaignSlice.reducer;
