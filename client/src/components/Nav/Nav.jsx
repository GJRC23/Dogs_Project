import './Nav.css';
import SearchBar from '../SearchBar/SearchBar.jsx';
import { Link } from 'react-router-dom';

const Nav = ({ onSearch }) => {
  return (
    <nav>
        <Link to='/' className='agregarBtn'>Back</Link>
        <Link to='/about'className='agregarBtn'>About</Link>
        <SearchBar onSearch={onSearch} />
    </nav>
  );
};

export default Nav;