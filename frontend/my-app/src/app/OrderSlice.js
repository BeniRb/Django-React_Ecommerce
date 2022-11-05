import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { sendOrders } from './OrderAPI';

// State - data (init)
const initialState = {
    myOrders: []
    
};

export const sendordersAsync = createAsyncThunk(
    'order/sendOrders',
    async (payload) => {
        // console.log(payload)
        const response = await sendOrders(payload.myOrders,payload.token);
        return response.data;
    }
);

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        sendCart:(state,action)=>{

            console.log("before action payload",action.payload)
            state.myOrders=action.payload
            console.log("state.myorders",state.myOrders)
        },
        clearAr:(state,action)=>{
            state.myOrders=[]
            console.log("clear AR",state.myOrders)
        }
    },
    //  async  (3)
    //   happens when async done - callback
    extraReducers: (builder) => {
        builder
            .addCase(sendordersAsync.fulfilled, (state, action) => {
            });
    },
});

// export sync method
export const { sendCart ,clearAr} = orderSlice.actions;

// export any part of the state
export const selectorders = (state) => state.order.myOrders;
export const selectamount = (state) =>state.order.amount;
// export the reducer to the applicaion
export default orderSlice.reducer;
