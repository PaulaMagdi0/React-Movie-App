import { configureStore } from '@reduxjs/toolkit';
import wishlistReducer from '../wishlist';

const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
  },
});

export default store;
