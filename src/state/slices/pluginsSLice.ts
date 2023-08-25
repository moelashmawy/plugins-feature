import { createSlice } from '@reduxjs/toolkit';
import { ReduxStateType } from '../../types/data';

export const pluginsSlice = createSlice({
  name: 'plugins',
  initialState: {
    tabs: [],
    tabData: {},
    plugins: {},
    activeTab: ''
  } as ReduxStateType,
  reducers: {
    setTabs: (state, action) => {
      state.tabs = action.payload
    },
    setTabData: (state, action) => {
      state.tabData = action.payload
    },
    setPlugins: (state, action) => {
      state.plugins = action.payload
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload
    }
  }
})

export const { setTabs, setTabData, setPlugins, setActiveTab } = pluginsSlice.actions

export default pluginsSlice.reducer