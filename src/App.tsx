import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './app.global.scss';
import { Home } from './pages/Home';
import { Plugins } from './pages/Plugins';

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plugins/*" element={<Plugins />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
