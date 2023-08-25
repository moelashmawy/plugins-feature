import { Route, Routes } from 'react-router-dom';
import Sidebar from '../containers/SideBar/Sidebar';
import Content from '../containers/TabContent/Content';

export const Plugins = () => {
  return (
    <div className="plugins-page">
      <Sidebar />
      <Routes>
        <Route path=":tabId" element={<Content />} />
      </Routes>
    </div>
  );
};
