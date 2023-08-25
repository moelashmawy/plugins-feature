import { Link } from 'react-router-dom';
import './styles.scss';

export const Home = () => {
  return (
    <div className="home-page">
      <div className="title">Welcome to the Home Page!</div>
      <Link to={`/plugins/Marketing`} className="plugins-button">
        Plugins
      </Link>
    </div>
  );
};
