import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginSlice'
import OrderSlice from './OrderSlice';
import productReducer from './productSlice'



export const store = configureStore({
  reducer: {
    login:loginReducer,
    product:productReducer,
    order:OrderSlice,
  },
});
