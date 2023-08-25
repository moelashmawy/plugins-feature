interface Plugin {
    title: string;
    description: string;
  }
  
  interface TabData {
    title: string;
    icon: string;
    active: string[];
    disabled: string[];
    inactive: string[];
  }
  
  export interface TabDataMap {
    [tabName: string]: TabData;
  }
  
  export interface PluginsMap {
    [pluginName: string]: Plugin;
  }
  
  export interface Data {
    tabs: string[];
    tabdata: TabDataMap;
    plugins: PluginsMap;
  }

  export interface DefaultData {
    data: Data;
    errors: string | null;
  }

  export interface ReduxStateType {
    tabs: string[];
    tabData: TabDataMap;
    plugins: PluginsMap;
    activeTab: string;
  }
  
  export interface PluginsStateType {
    plugins: ReduxStateType;
  }