import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./features/user-slice"
import productReducer from '@/redux/features/product-slice'
import { useSelector, TypedUseSelectorHook } from 'react-redux';

export const store = configureStore({
  reducer: {
    userReducer,
    productReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;