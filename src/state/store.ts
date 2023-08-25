import { configureStore } from '@reduxjs/toolkit'
import pluginsSLice from './slices/pluginsSLice';

export default configureStore({
  reducer: {
    plugins: pluginsSLice
  }
})