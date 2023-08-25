import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './app.global.scss';
import Sidebar from './containers/SideBar/Sidebar';
import Content from './containers/TabContent/Content';

const App = () => {
  return (
    <div className="app"> 
      <BrowserRouter>
        <Sidebar /> 
        <Routes>
          <Route path="/plugins/:tabId" element={<Content />} />
        </Routes>
      </BrowserRouter>
    </div>  
  );
};

export default App;
