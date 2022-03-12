import { createSlice } from '@reduxjs/toolkit';

const rootSlice = createSlice({
    name: "root",
    initialState: {
        ticker: 'AAPL',
        transacted_price : 125.01,
        transacted_shares : 20,
        transacted_investment : 2500.2,
        dates : '2022-01-08'
    },
    reducers: {
        chooseTicker: (state, action) => { state.ticker = action.payload},
        chooseTransactedPrice: (state, action) => { state.transacted_price = action.payload},
        chooseTransactedShares: (state, action) => { state.transacted_shares = action.payload},
        chooseTransactedInvestment: (state, action) => { state.transacted_investment = action.payload},
        chooseDates: (state, action) => {state.dates = action.payload}
    }
})

// Export Reducer
export const reducer = rootSlice.reducer;
export const { chooseTicker, chooseTransactedPrice, chooseTransactedShares, chooseTransactedInvestment, chooseDates } = rootSlice.actions;

